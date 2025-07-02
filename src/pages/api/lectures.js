import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const lectures = await prisma.lecture.findMany({
      include: {
        timeSchedule: true,
      },
    });
    res.status(200).json(lectures);
  } else {
    res.status(405).end();
  }
}
