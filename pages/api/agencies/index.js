import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const { method, body } = req;

  if (method === "POST") {
    // const agencyData = JSON.parse(body);
    const data = JSON.parse(body);
    delete data.oldName;
    delete data.oldCity;
    console.log(data);
    const savedAgency = await prisma.agency.create({
      data: data,
    });

    res.status(201).json(savedAgency);
  }

  if (method === "GET") {
    const renderAgency = await prisma.agency.findMany();
    res.status(200).json(renderAgency);
  }
};
