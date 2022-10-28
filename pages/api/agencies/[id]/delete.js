import prisma from "../../../../util/prisma";
import {
  extractCookie,
  verifyToken,
} from "../../../../util/Middleware/middleWare";
import {
  findUniqueAgency,
  getUserDb,
  sendToDashboard,
} from "../../../../util/CRUD/crudFunctions";

export default async function handleDelete(req, res) {
  const { method, headers } = req;

  const { id } = req.query;
  const userFromToken = verifyToken(extractCookie(headers));
  const userDb = await getUserDb(userFromToken);
  console.log(userFromToken);
  try {
    if (!userFromToken)
      res.status(401).json({ message: "User not authenticated." });

    if (method === "DELETE") {
      if (userDb.admin) {
        const deleteAgency = await prisma.agency.delete({
          where: {
            id: Number(id),
          },
        });
        console.log("deleted Agency", deleteAgency);
        res.status(200).json({
          message: "Succesfuly deleted",
          success: true,
          authorisation: true,
        });
      } else {
        console.log("í am trigger");
        const data = await findUniqueAgency(Number(id));
        await sendToDashboard(userDb, data, "delete");
        res.status(200).json({
          message: "delete request sent",
          success: true,
          authorisation: false,
        });
      }
      // const updatedAgenciesListing = await prisma.agency.findMany();
      // res.json(updatedAgenciesListing);
    }
  } catch (e) {
    console.log(e);
  }
}
