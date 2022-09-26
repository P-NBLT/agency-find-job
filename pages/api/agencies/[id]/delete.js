import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const { method, body } = req;
  // const data = JSON.parse(body);
  const { id } = req.query;
  console.log("the delete auery id = ", id);
  if (method === "DELETE") {
    const deleteAgency = await prisma.agency.delete({
      where: {
        id: Number(id),
      },
    });
    const updatedAgenciesListing = await prisma.agency.findMany();
    console.log(updatedAgenciesListing);
    res.json(updatedAgenciesListing);
  }
};
