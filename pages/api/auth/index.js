import prisma from "../../../util/prisma";
import signupSchema from "../../../validation/signup";
import bcrypt from "bcrypt";
import {
  unknownError,
  validationError,
  validationErrorResponse,
  databaseError,
  dataBaseErrorResponse,
} from "../../../util/errorFunction/errorFunction";
import { verifyToken } from "../../../util/Middleware/middleWare";

export default async function handler(req, res) {
  const { body, method } = req;
  try {
    const token = req.headers.cookie.slice("6");
    if (!token) res.status(404).json({ message: "not authenticated" });
    // console.log(token);

    const userFromToken = verifyToken(token, res);
    // console.log(user);

    const userDb = await prisma.user.findUnique({
      where: {
        id: userFromToken.id,
      },
    });

    return res.status(200).json("success");
  } catch (err) {
    if (databaseError(err)) return dataBaseErrorResponse(err, res);
    if (validationError(err)) return validationErrorResponse(err, res);
    return unknownError(err, res);
  }
}
