import {
  authenticateError,
  authenticateErrorResponse,
} from "../../../util/errorFunction/errorFunction";
import {
  extractCookie,
  verifyToken,
} from "../../../util/Middleware/middleWare";

export default async function checkAuthentication(req, res, next) {
  try {
    const { headers } = req;
    if (!headers.cookie) {
      throw new Error("A001");
    }

    const isVerified = verifyToken(extractCookie(headers), res);
    console.log(isVerified);
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
