// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IWorkout } from "../../interface/interface";

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(await prisma.workout.findMany());
  }
  if(req.method ==="POST"){
    res.status(200).json(await prisma.workout.create({data: req.body}))
  }
}
