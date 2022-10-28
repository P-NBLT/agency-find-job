import prisma from "../../../../util/prisma";
import {
  extractCookie,
  verifyToken,
} from "../../../../util/Middleware/middleWare";
import { getUserDb } from "../../../../util/CRUD/crudFunctions";
import {
  updateAgency,
  sendToDashboard,
} from "../../../../util/CRUD/crudFunctions";

export default async function handleEdit(req, res) {
  const { method, body, headers } = req;

  const userFromToken = verifyToken(extractCookie(headers));
  const userDb = await getUserDb(userFromToken);
  if (!userFromToken)
    res.status(401).json({ message: "User not authenticated." });

  if (method === "PATCH" && userFromToken) {
    const data = JSON.parse(body);
    const { id } = req.query;
    if (data) {
      if (userDb.admin) {
        const updatedAgency = await updateAgency(id, data);
        res.status(200).json(updatedAgency);
      } else {
        console.log(getUserDb);

        await sendToDashboard(userDb, data, "update");
        res.status(200).json({ success: true });
      }
    } else {
      res.status(400).json("Wrong request");
    }
  }
}
