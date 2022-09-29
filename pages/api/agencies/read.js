import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getAgency(req, res) {
  const { method } = req;
  console.log("good route");

  if (method === "GET") {
    const agency = await prisma.agency.findMany();
    const newAgency = agency[agency.length - 1];

    res.status(200).json(newAgency);
  }
}
