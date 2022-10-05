import cookie from "cookie";

export default async function logout(req, res) {
  res
    .setHeader(
      "Set-Cookie",
      cookie.serialize("token", { maxAge: -1, path: "/" })
    )
    .status(200)
    .json({ success: true });
}
