import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const { method, body } = req;
  const data = JSON.parse(body);

  if (method === "POST") {
    // const agencyData = JSON.parse(body);
    delete data.oldName;
    delete data.oldCity;
    console.log(data);
    const savedAgency = await prisma.agency.create({
      data: data,
    });

    res.status(200).json(savedAgency);
  }

  if (method === "PUT") {
    if (data.oldCity && data.oldName) {
      console.log("PUT", data);
      const findAgency = await prisma.agencies.findMany({
        where: {
          name: data.oldName,
          city: data.oldCity,
        },
      });
      const updatedAgency = await prisma.agencies.update({
        where: {
          id: findAgency[0].id,
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

  if (method === "DELETE") {
    const findAgency = await prisma.agencies.findMany({
      where: {
        name: data.name,
        city: data.city,
      },
    });

    if (findAgency.length === 0) {
      res.status(400).json("the agency you want to delete seems to not exist.");
    } else {
      const deleteAgency = await prisma.agencies.delete({
        where: {
          id: findAgency[0].id,
        },
      });

      res.json(deleteAgency);
    }
  }
};
