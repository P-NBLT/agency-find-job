function unknownError(error, res) {
  return res.status(400).json(error);
}

function validationError(error) {
  return error.hasOwnProperty("name");
}

function validationErrorResponse(error, res) {
  return res.status(400).json({ error: error.errors });
}

function databaseError(error) {
  return (
    error.hasOwnProperty("code") || error == "NotFoundError: No User found"
  );
}

function dataBaseErrorResponse(err, res) {
  if (err == "NotFoundError: No User found") {
    return res
      .status(400)
      .json({ message: "The email and/or the password is incorrect" });
  }
  if (err.code == "P2002") {
    return res.status(400).json({
      error: "P2002",
      link: "https://www.prisma.io/docs/reference/api-reference/error-reference",
      message: `unique constraint failed on the field: ${err.meta.target}`,
      success: false,
    });
  }
  if (err.code && err.meta)
    return res.status(400).json({
      error: err.code,
      link: "https://www.prisma.io/docs/reference/api-reference/error-reference",
      where: err.meta.target,
      success: false,
    });
  return res.status(400).json(err);
}

function passwordError(error) {
  return error == "Error: The password is incorrect";
}

function passwordErrorResponse(res) {
  return res.status(400).json("The password is incorrect");
}

function authenticateError(err) {
  if (err == "Error: A001") return true;
  if (err == "Error: A002") return true;
}

function authenticateErrorResponse(error, res) {
  if (error == "Error: A001") {
    console.log("I am being logged");
    return res.status(401).json({
      name: "Bad request",
      path: "headers: {authorization}",
      message:
        "Missing authorization headers in your request. You must set an authorization header to use this route! header pattern must be: 'Bearer {{accessTokeen}}'. where accessToken is a jwt",
      success: false,
    });
  }
  if (error == "Error: A002")
    return res.status(401).json({
      name: "Bad request",
      path: "headers: {authorization}",
      message:
        "Authorization headers must follow the pattern: 'Bearer {{accessToken}}'. where accessToken is a jwt",
      success: false,
    });
}

export {
  unknownError,
  validationError,
  validationErrorResponse,
  databaseError,
  dataBaseErrorResponse,
  passwordError,
  passwordErrorResponse,
  authenticateError,
  authenticateErrorResponse,
};
