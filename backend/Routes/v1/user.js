import { Router } from "express";
import { metadata } from "../../types/index.js";
import { PrismaClient } from "@prisma/client";
import { adminMiddleware } from "../../middleware/admin.js";

const client  = new PrismaClient()

const userrouter = Router()

userrouter.post("/metadata", adminMiddleware,async(req, res) =>{
 const parseData = metadata.safeParse(req.body)
 if(!parseData.success) {
    return res.status(400).json({ message: "Invalid metadata" })
 }

 const newuser = await client.user.update({
    where :{
        id : req.userId
    },
    data : {
        avatarId : parseData.data.avatarId,
    }
    
 })

  res.json({message : "meta data updated"})
})

userrouter.get("/metadata/bulk", (req, res) => {
    res.send("bulk metadata")
})

export default userrouter