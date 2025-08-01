"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../lib/db");
const router = (0, express_1.Router)();
// POST /api/personal-events - 新しい個人予定を作成
router.post('/', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { title, startTime, endTime, description } = req.body;
    // バリデーション
    if (!title || !startTime || !endTime) {
        return res.status(400).json({ error: 'Title, startTime, and endTime are required.' });
    }
    if (new Date(startTime) >= new Date(endTime)) {
        return res.status(400).json({ error: 'End time must be after start time.' });
    }
    try {
        const newEvent = await db_1.prisma.personalEvent.create({
            data: {
                title,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                description,
                userId: req.user.id, // ログインユーザーのIDを紐付ける
            },
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error('Failed to create personal event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// PUT /api/personal-events/:id - 個人予定を更新
router.put('/:id', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const eventId = parseInt(req.params.id, 10);
    if (isNaN(eventId)) {
        return res.status(400).json({ error: 'Invalid event ID.' });
    }
    const { title, startTime, endTime, description } = req.body;
    // バリデーション
    if (!title || !startTime || !endTime) {
        return res.status(400).json({ error: 'Title, startTime, and endTime are required.' });
    }
    if (new Date(startTime) >= new Date(endTime)) {
        return res.status(400).json({ error: 'End time must be after start time.' });
    }
    try {
        // 認可: 操作対象のイベントが本当にログインユーザーのものか確認
        const existingEvent = await db_1.prisma.personalEvent.findUnique({
            where: { id: eventId },
        });
        if (!existingEvent) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        if (existingEvent.userId !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden: You do not have permission to edit this event.' });
        }
        const updatedEvent = await db_1.prisma.personalEvent.update({
            where: { id: eventId },
            data: {
                title,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                description,
            },
        });
        res.json(updatedEvent);
    }
    catch (error) {
        console.error('Failed to update personal event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// DELETE /api/personal-events/:id - 個人予定を削除
router.delete('/:id', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const eventId = parseInt(req.params.id, 10);
    if (isNaN(eventId)) {
        return res.status(400).json({ error: 'Invalid event ID.' });
    }
    try {
        // 認可: 操作対象のイベントが本当にログインユーザーのものか確認
        const existingEvent = await db_1.prisma.personalEvent.findUnique({
            where: { id: eventId },
        });
        if (!existingEvent) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        if (existingEvent.userId !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden: You do not have permission to delete this event.' });
        }
        await db_1.prisma.personalEvent.delete({
            where: { id: eventId },
        });
        res.status(204).send(); // No Content
    }
    catch (error) {
        console.error('Failed to delete personal event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
