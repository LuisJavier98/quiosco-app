import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  console.log(req)
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    const orden = await prisma.orden.update({
      where: {
        id: parseInt(req.query.id)
      }, data: {
        estado: true
      }
    })
    res.status(200).json({ orden })
  }

}