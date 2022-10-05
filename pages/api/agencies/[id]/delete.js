import prisma from "../../../../util/prisma";
import {
  extractCookie,
  verifyToken,
} from "../../../../util/Middleware/middleWare";

export default async (req, res) => {
  const { method, headers } = req;

  const { id } = req.query;
  const isVerified = verifyToken(extractCookie(headers));
  if (!isVerified) res.status(401).json({ message: "User not authenticated." });

  if (method === "DELETE") {
    const deleteAgency = await prisma.agency.delete({
      where: {
        id: Number(id),
      },
    });
    const updatedAgenciesListing = await prisma.agency.findMany();

    res.json(updatedAgenciesListing);
  }
};
