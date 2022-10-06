import prisma from "../../../util/prisma";
import {
  extractCookie,
  verifyToken,
} from "../../../util/Middleware/middleWare";

export default async function handler(req, res) {
  const { method, body, headers } = req;

  const isVerified = verifyToken(extractCookie(headers));
  if (!isVerified) res.status(401).json({ message: "User not authenticated." });

  if (method === "POST" && isVerified) {
    const data = JSON.parse(body);
    const savedAgency = await prisma.agency.create({
      data: data,
    });
    res.status(201).json(savedAgency);
  }

  if (method === "GET") {
    const renderAgency = await prisma.agency.findMany();
    res.status(200).json(renderAgency);
  }
}
