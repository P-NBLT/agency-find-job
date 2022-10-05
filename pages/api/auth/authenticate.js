import {
  authenticateError,
  authenticateErrorResponse,
} from "../../../util/errorFunction/errorFunction";
import {
  extractCookie,
  verifyToken,
} from "../../../util/Middleware/middleWare";
import prisma from "../../../util/prisma";

export default async function checkAuthentication(req, res, next) {
  try {
    const { headers } = req;
    console.log("egrgterrw");
    // console.log("cookie", headers.cookie);
    console.log("something more");
    if (!headers.cookie) {
      throw new Error("A001");
    }

    const isVerified = verifyToken(extractCookie(headers), req, res);

    console.log("is verified", isVerified);

    if (!isVerified)
      return res.status(401).json({ message: "User not auhtenticated" });
    return res.status(200).json({
      success: true,
      headers: {
        authorization: headers.authorization,
        cookie: headers.cookie,
      },
    });
  } catch (err) {
    if (authenticateError(err)) return authenticateErrorResponse(err, res);
  }
}
