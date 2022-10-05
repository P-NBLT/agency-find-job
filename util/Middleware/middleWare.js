import { verify } from "jsonwebtoken";
import {
  authenticateError,
  authenticateErrorResponse,
} from "../../util/errorFunction/errorFunction";
import cookie from "cookie";
import { prisma } from "../prisma";

export default function authenticate(req, res, next) {
  try {
    const { headers } = req;
    console.log("headerssss", headers.authorization);
    if (headers.authorization)
      console.log(headers.authorization, headers.cookie);
    if (!headers.authorization) throw new Error("A001");
    const authHeader = headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) throw new Error("A002");
    let user;
    verify(token, process.env.ACCESS_TOKEN_SECRET, function (error, result) {
      if (error) {
        res.status(400).json({
          name: error.name,
          message: error.message,
          expiredAt: error.expiredAt,
        });
        throw new Error(error);
      }
      user = result;
    });
    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          path: "/",
        })
      )
      .json({ success: true });
  } catch (err) {
    console.log("irror", Object.entries(err), err);
    if (authenticateError(err)) return authenticateErrorResponse(err, res);
  }
}

export function verifyToken(token, req, res) {
  console.log("in the verify");
  let user;
  verify(token, process.env.ACCESS_TOKEN_SECRET, function (error, result) {
    if (error) {
      return res.status(401).json({
        name: error.name,
        message: error.message,
        expiredAt: error.expiredAt,
        token: token,
      });
    }
    console.log("not in error");
    user = result;

    console.log("no error, and should have user", user);
  });

  if (!user) return false;
  return user;
}

export function extractCookie(headers) {
  console.log("in the extract");
  const cookieHeaders = headers.cookie && headers.cookie;
  if (!cookieHeaders) throw new Error("Missing token in the cookie");
  const cookieToken = cookieHeaders.split("=")[1];
  return cookieToken;
}
