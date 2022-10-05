import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import loginSchema from "../../../validation/login";
import {
  unknownError,
  validationError,
  validationErrorResponse,
  databaseError,
  dataBaseErrorResponse,
  passwordError,
  passwordErrorResponse,
} from "../../../util/errorFunction/errorFunction";
import { sign } from "jsonwebtoken";
import authenticate from "../../../util/Middleware/middleWare";

const prisma = new PrismaClient();

export default async function login(req, res, next) {
  try {
    const { body } = req;
    const data = JSON.parse(body);
    const isLoginValid = loginSchema.validate(data);

    if (!isLoginValid) throw new Error(loginSchema.isValidSync());

    const findUser = await prisma.user.findUniqueOrThrow({
      where: {
        email: data.email,
      },
    });

    const validLogin = await bcrypt.compare(data.password, findUser.password);

    if (!validLogin) throw new Error("The password is incorrect");

    const user = { id: findUser.id, name: findUser.firstName };

    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    // localStorage.setItem("refreshToken", refreshToken);
    req.headers.authorization = `Bearer ${accessToken}`;
    authenticate(req, res, next);
  } catch (err) {
    console.log(
      "arror",
      Object.keys(err),
      databaseError(err),
      dataBaseErrorResponse(err, res)
    );
    if (databaseError(err)) return dataBaseErrorResponse(err, res);
    if (validationError(err)) return validationErrorResponse(err, res);
    if (passwordError(err)) return passwordErrorResponse(res);
    return unknownError(err, res);
  }
}

function generateToken(user) {
  return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}

function generateRefreshToken(user) {
  return sign(user, process.env.REFRESH_ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
}
