
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 曜日のマッピング
const dayMap = {
  '月曜': 'MONDAY',
  '火曜': 'TUESDAY',
  '水曜': 'WEDNESDAY',
  '木曜': 'THURSDAY',
  '金曜': 'FRIDAY',
  '土曜': 'SATURDAY',
  '日曜': 'SUNDAY',
};

// 授業時間のデータ
const timeScheduleData = [
  { period: 1, startTime: '09:00', endTime: '10:30' },
  { period: 2, startTime: '10:40', endTime: '12:10' },
  { period: 3, startTime: '13:00', endTime: '14:30' },
  { period: 4, startTime: '14:40', endTime: '16:10' },
  { period: 5, startTime: '16:20', endTime: '17:50' },
  { period: 6, startTime: '18:00', endTime: '19:30' },
];

// 講義のデータ
const lectureData = [
    {
        id: 1,
        name: "プログラミング基礎",
        teacher: "山田太郎",
        day: "月曜",
        period: 1,
        room: "A101",
        credits: 2,
    },
    {
        id: 2,
        name: "線形代数",
        teacher: "佐藤花子",
        day: "火曜",
        period: 2,
        room: "B202",
        credits: 2,
    },
    {
        id: 3,
        name: "英語コミュニケーション",
        teacher: "鈴木一郎",
        day: "水曜",
        period: 3,
        room: "C303",
        credits: 1,
    },
    {
        id: 4,
        name: "情報倫理",
        teacher: "田中美咲",
        day: "木曜",
        period: 4,
        room: "D404",
        credits: 1,
    },
    {
        id: 5,
        name: "微分積分学",
        teacher: "高橋健",
        day: "金曜",
        period: 2,
        room: "E505",
        credits: 2,
    },
    {
        id: 6,
        name: "物理学入門",
        teacher: "中村優子",
        day: "月曜",
        period: 3,
        room: "F606",
        credits: 2,
    },
    {
        id: 7,
        name: "日本史",
        teacher: "小林誠",
        day: "火曜",
        period: 4,
        room: "G707",
        credits: 1,
    },
    {
        id: 8,
        name: "心理学概論",
        teacher: "松本彩",
        day: "水曜",
        period: 1,
        room: "H808",
        credits: 2,
    },
    {
        id: 9,
        name: "経済学入門",
        teacher: "伊藤淳",
        day: "木曜",
        period: 2,
        room: "I909",
        credits: 2,
    },
    {
        id: 10,
        name: "芸術論",
        teacher: "渡辺美穂",
        day: "金曜",
        period: 5,
        room: "J1010",
        credits: 1,
    },
];

async function main() {
  console.log(`Start seeding ...`);

  // TimeScheduleデータを登録
  for (const ts of timeScheduleData) {
    const timeSchedule = await prisma.timeSchedule.create({
      data: ts,
    });
    console.log(`Created timeSchedule with id: ${timeSchedule.period}`);
  }

  // Lectureデータを登録
  for (const lec of lectureData) {
    const lecture = await prisma.lecture.create({
      data: {
        name: lec.name,
        teacher: lec.teacher,
        room: lec.room,
        credits: lec.credits,
        day: dayMap[lec.day], // Enumに変換
        period: lec.period,
      },
    });
    console.log(`Created lecture with id: ${lecture.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
