import signupSchema from "../../validation/signup";



export default function handler(req, res) {
   const valid = await signupSchema.isValid(req.body)
    console.log('valid',valid);
  res.status(200).json({ name: "John Dagmar" });
}
