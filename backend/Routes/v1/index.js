import { Router } from "express";
import userrouter from "./user.js";
import spaceRouter from "./space.js";
import adminRouter from "./admin.js";
import { signInSchema, signUpSchema } from "../../types/index.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = Router()
const client = new PrismaClient()



router.post("/signup", async (req, res) => {
    // Validate the input data using signUpSchema
    const parseData = signUpSchema.safeParse(req.body);
    if (!parseData.success) {
        return res.status(400).json({ message: "Data validation failed", errors: parseData.error.errors });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the user in the database
        const user = await client.user.create({
            data: {
                username: req.body.username,
                password: hashedPassword,
                role: parseData.data.type === "admin" ? "Admin" : "User",
            },
        });

        res.status(201).json({ message: "Signup successful", user: { id: user.id, } });
    } catch (error) {
       
    }
});


router.post("/signin", async (req, res) => {
  // Validate input data using Zod schema
  const parseData = signInSchema.safeParse(req.body);

  if (!parseData.success) {
    return res.status(400).json({
      message: "Data validation failed",
      errors: parseData.error.format(),
    });
  }

  try {
    // Find the user by username
    const users = await client.user.findUnique({
      where: { username: parseData.data.username },
    });

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(parseData.data.password, users.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: users.id },
      process.env.JWT_SECRET,
      
    );

    // Respond with the token
    res.status(200).json({
      message: "Sign-in successful",
      token,
    });
  } catch (error) {
    console.error("Sign-in error:", error.message);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
})
  

router.get("/elements", (req, res) =>{
    res.send("elements")
})


router.get("/avatars", (req, res) =>{
    res.send("avatars")
})

router.use("/user", userrouter)
router.use("/space", spaceRouter)
router.use("/admin", adminRouter)
export default router;