"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// GET /api/supplementary-lectures/:id - 私的補講の詳細情報を取得
router.get('/:id', async (req, res) => {
    const lectureId = parseInt(req.params.id, 10);
    if (isNaN(lectureId)) {
        return res.status(400).json({ error: 'Invalid lecture ID' });
    }
    try {
        const lecture = await prisma.supplementaryLecture.findUnique({
            where: { id: lectureId },
            include: {
                officialLecture: true, // 関連する公式講義情報も取得
                creator: true, // 開催者情報も取得
                attendees: true, // 出席者数カウントのために取得
            },
        });
        if (!lecture) {
            return res.status(404).json({ error: 'Supplementary lecture not found' });
        }
        // レスポンス形式をissuse.mdに合わせて整形
        const response = {
            id: lecture.id,
            officialLectureName: lecture.officialLecture.name,
            location: lecture.location,
            startTime: lecture.startTime.toISOString(),
            endTime: lecture.endTime.toISOString(),
            description: lecture.description,
            creator: {
                id: lecture.creator.id,
                name: lecture.creator.name || lecture.creator.university_email.split('@')[0],
            },
            attendeeCount: lecture.attendees.length,
            isAttending: lecture.attendees.some((attendee) => attendee.userId === req.user?.id), // この行を追加
        };
        res.json(response);
    }
    catch (error) {
        console.error('Failed to fetch supplementary lecture:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// POST /api/supplementary-lectures - 私的補講を登録
router.post('/', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { officialLectureId, location, startTime, endTime, description } = req.body;
    // 入力値のバリデーション
    if (!officialLectureId || !location || !startTime || !endTime) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (new Date(startTime) >= new Date(endTime)) {
        return res.status(400).json({ error: 'End time must be after start time' });
    }
    try {
        const newLecture = await prisma.supplementaryLecture.create({
            data: {
                officialLectureId: parseInt(officialLectureId, 10),
                location,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                description,
                creatorId: req.user.id, // ログインユーザーをcreatorIdとして設定
            },
        });
        res.status(201).json(newLecture); // 201 Createdを返す
    }
    catch (error) {
        console.error('Failed to create supplementary lecture:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// POST /api/supplementary-lectures/:id/attendees - 私的補講への出席登録
router.post('/:id/attendees', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const lectureId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    if (isNaN(lectureId)) {
        return res.status(400).json({ error: 'Invalid lecture ID' });
    }
    try {
        // 既に出席済みでないか、自分の補講でないかなどをチェック
        const existingAttendance = await prisma.supplementaryLectureAttendance.findUnique({
            where: {
                userId_supplementaryLectureId: { userId, supplementaryLectureId: lectureId },
            },
        });
        if (existingAttendance) {
            return res.status(409).json({ error: 'Already attending' }); // 409 Conflict
        }
        const lecture = await prisma.supplementaryLecture.findUnique({ where: { id: lectureId } });
        if (lecture?.creatorId === userId) {
            return res.status(400).json({ error: 'Cannot attend your own lecture' });
        }
        // 出席情報を登録
        await prisma.supplementaryLectureAttendance.create({
            data: {
                userId,
                supplementaryLectureId: lectureId,
            },
        });
        res.status(201).send(); // 201 Created
    }
    catch (error) {
        console.error('Failed to attend supplementary lecture:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// DELETE /api/supplementary-lectures/:id/attendees - 私的補講への出席キャンセル
router.delete('/:id/attendees', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const lectureId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    if (isNaN(lectureId)) {
        return res.status(400).json({ error: 'Invalid lecture ID' });
    }
    try {
        // 削除対象のレコードが存在するか確認
        const existingAttendance = await prisma.supplementaryLectureAttendance.findUnique({
            where: {
                userId_supplementaryLectureId: { userId, supplementaryLectureId: lectureId },
            },
        });
        if (!existingAttendance) {
            return res.status(404).json({ error: 'Not attending this lecture' });
        }
        // 出席情報を削除
        await prisma.supplementaryLectureAttendance.delete({
            where: {
                userId_supplementaryLectureId: { userId, supplementaryLectureId: lectureId },
            },
        });
        res.status(204).send(); // 204 No Content
    }
    catch (error) {
        console.error('Failed to cancel attendance:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
