import { Router } from 'express';
import { PrismaClient, SupplementaryLecture, PersonalEvent, OfficialLecture, LectureException, Term, PeriodSetting } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// FullCalendarのイベント形式のインターフェース
interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  className: string;
  extendedProps?: Record<string, any>;
  display?: string;
}

// --- ヘルパー関数: 私的補講の取得 ---
const getSupplementaryLectures = async (startDate: Date, endDate: Date): Promise<CalendarEvent[]> => {
  const lectures = await prisma.supplementaryLecture.findMany({
    where: {
      startTime: {
        lt: endDate,
      },
      endTime: {
        gte: startDate,
      },
    },
    include: {
      officialLecture: true,
      creator: true,
    },
  });

  return lectures.map(lecture => ({
    id: `sup-${lecture.id}`,
    title: `${lecture.officialLecture.name} 補講`,
    start: lecture.startTime.toISOString(),
    end: lecture.endTime.toISOString(),
    className: 'event-supplementary',
    extendedProps: {
      type: 'supplementary',
      location: lecture.location,
      description: lecture.description,
      creatorName: lecture.creator.name || lecture.creator.university_email.split('@')[0],
    },
  }));
};

// --- ヘルパー関数: 個人予定の取得 ---
const getPersonalEvents = async (userId: string, startDate: Date, endDate: Date): Promise<CalendarEvent[]> => {
  const events = await prisma.personalEvent.findMany({
    where: {
      userId: userId,
      startTime: {
        lt: endDate,
      },
      endTime: {
        gte: startDate,
      },
    },
  });

  return events.map(event => ({
    id: `per-${event.id}`,
    title: event.title,
    start: event.startTime.toISOString(),
    end: event.endTime.toISOString(),
    className: 'event-personal',
    extendedProps: {
      type: 'personal',
      description: event.description,
    },
  }));
};

// --- ヘルパー関数: 大学公式の講義の動的生成 ---
const getOfficialLectures = async (startDate: Date, endDate: Date): Promise<CalendarEvent[]> => {
  const terms = await prisma.term.findMany({
    where: {
      startDate: { lt: endDate },
      endDate: { gte: startDate },
    },
  });

  if (terms.length === 0) return [];

  const termIds = terms.map(term => term.id);

  const [lectures, exceptions, periodSettings] = await Promise.all([
    prisma.officialLecture.findMany({ where: { termId: { in: termIds } } }),
    prisma.lectureException.findMany({ where: { officialLecture: { termId: { in: termIds } }, originalDate: { gte: startDate, lt: endDate } } }),
    prisma.periodSetting.findMany(),
  ]);

  const periodMap = new Map(periodSettings.map(p => [p.period, { startTime: p.startTime, endTime: p.endTime }]));
  const exceptionMap = new Map(exceptions.map(e => [`${e.officialLectureId}-${e.originalDate.toISOString().split('T')[0]}`, e]));

  const events: CalendarEvent[] = [];
  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    const dayOfWeek = currentDate.getDay(); // 0=日, 1=月, ..., 6=土
    const lecturesOnDay = lectures.filter(l => l.dayOfWeek === (dayOfWeek === 0 ? 7 : dayOfWeek)); // DBは月=1..日=7

    for (const lecture of lecturesOnDay) {
      const dateString = currentDate.toISOString().split('T')[0];
      const exception = exceptionMap.get(`${lecture.id}-${dateString}`);

      if (exception && exception.type === 'CANCELLED') {
        continue; // 休講なのでスキップ
      }

      const period = periodMap.get(lecture.period);
      if (!period) continue;

      const eventDate = exception && exception.newDate ? new Date(exception.newDate) : new Date(currentDate);
      const [startHour, startMinute] = period.startTime.split(':').map(Number);
      const [endHour, endMinute] = period.endTime.split(':').map(Number);

      const startDateTime = new Date(eventDate.setHours(startHour, startMinute, 0, 0));
      const endDateTime = new Date(eventDate.setHours(endHour, endMinute, 0, 0));

      events.push({
        id: `off-${lecture.id}-${dateString}`,
        title: lecture.name,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        className: 'event-official',
        display: 'background',
        extendedProps: {
          type: 'official',
          professor: lecture.professor,
        },
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return events;
};


// GET /api/events - カレンダーに表示する全てのイベントを取得
router.get('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { start, end } = req.query;
  if (typeof start !== 'string' || typeof end !== 'string') {
    return res.status(400).json({ error: 'start and end query parameters are required' });
  }

  try {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const userId = req.user.id;

    // 3種類のイベント取得を並列で実行
    const [supplementaryEvents, personalEvents, officialEvents] = await Promise.all([
      getSupplementaryLectures(startDate, endDate),
      getPersonalEvents(userId, startDate, endDate),
      getOfficialLectures(startDate, endDate),
    ]);

    // 全てのイベントを結合して返す
    const allEvents = [...supplementaryEvents, ...personalEvents, ...officialEvents];
    res.json(allEvents);

  } catch (error) {
    console.error('Failed to fetch events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
