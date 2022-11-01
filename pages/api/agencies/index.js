import prisma from "../../../util/prisma";
import {
  extractCookie,
  verifyToken,
} from "../../../util/Middleware/middleWare";
import {
  createAgency,
  sendToDashboard,
  getUserDb,
} from "../../../util/CRUD/crudFunctions";

export default async function handler(req, res) {
  const { method, body, headers } = req;
  console.log("trigger");

  try {
    const userFromToken = verifyToken(extractCookie(headers));
    if (!userFromToken)
      res.status(401).json({ message: "User not authenticated." });

    if (method === "POST" && userFromToken) {
      const data = JSON.parse(body);
      const userDb = await getUserDb(userFromToken);

      if (!userDb.admin) {
        await sendToDashboard(userDb, data, "create");
        return res.status(201).json("sucess sent to dashboard db");
      } else {
        const savedAgency = createAgency(data);
        return res
          .status(201)
          .json({ message: "sucess sent to agency db", payload: savedAgency });
      }
    }
    if (method === "GET") {
      const renderAgency = await prisma.agency.findMany();
      res.status(200).json(renderAgency);
    }
  } catch (e) {
    console.log(e);
  }
}
