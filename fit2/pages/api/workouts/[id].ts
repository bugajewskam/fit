// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const idInt = Number(id);
  if (!idInt) {
    res.status(400).end();
    return;
  }
  const workout = await prisma.workout.findFirst({ where: { id: idInt } });
  if (!workout) {
    res.status(404).end();
    return;
  }
  if (req.method === "DELETE") {
    await prisma.workout.delete({ where: { id: idInt } });
    res.status(200).json({});
  }
  if (req.method === "PATCH") {
    res
      .status(200)
      .json(
        await prisma.workout.update({ where: { id: idInt }, data: req.body })
      );
  }
}
