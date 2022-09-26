import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async (req, res) => {
  const { method, body } = req;
  const data = JSON.parse(body);
  const { id } = req.query;

  if (method === "PATCH") {
    if (data) {
      console.log("PATCH", data);
      //   const findAgency = await prisma.agencies.findUnique({
      //     where: {
      //       id: id
      //     },
      //   });
      const updatedAgency = await prisma.agency.update({
        where: {
          id: Number(id),
        },
        data: {
          name: data.name,
          city: data.city,
          region: data.region,
          size: data.size,
          website: data.website,
          logo: data.logo,
        },
      });
      res.status(200).json(updatedAgency);
    } else {
      res.status(400).json("Wrong request");
    }
  }
};
