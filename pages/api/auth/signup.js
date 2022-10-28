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

export default async function handler(req, res) {
  const { body, method } = req;
  const data = JSON.parse(body);

  if (method !== "POST")
    return res.status(404).json("This route only accept a POST method");

  try {
    const isvalidateUser = await signupSchema.validate(data);
    if (!isvalidateUser) throw new Error(signupSchema.validateSync());

    data.password = await bcrypt.hash(data.password, 10);

    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (findUser) res.status(400).json({ message: "This email already exist" });

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    });

    return res.status(201).json(data);
  } catch (err) {
    if (databaseError(err)) return dataBaseErrorResponse(err, res);
    if (validationError(err)) return validationErrorResponse(err, res);
    return unknownError(err, res);
  }
}
