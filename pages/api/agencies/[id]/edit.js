import { PrismaClient } from "@prisma/client";
import {
  extractCookie,
  verifyToken,
} from "../../../../util/Middleware/middleWare";

const prisma = new PrismaClient();
export default async (req, res) => {
  const { method, body, headers } = req;
  const data = JSON.parse(body);
  const { id } = req.query;
  console.log("data", data);
  const isVerified = verifyToken(extractCookie(headers));
  if (!isVerified) res.status(401).json({ message: "User not authenticated." });

  if (method === "PATCH" && isVerified) {
    if (data) {
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
