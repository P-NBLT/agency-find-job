import cookie from "cookie";
import { extractCookie } from "../../../util/Middleware/middleWare";

export default async function logout(req, res) {
  const token = extractCookie(req.headers);

  res
    .setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, { maxAge: -1, path: "/" })
    )
    .json({ success: true });
}
