import { Router } from "express";

const spaceRouter = Router()

spaceRouter.post("/", (req, res) =>{
    res.send("name ")
})

spaceRouter.delete("/:spaceId", (req, res) =>{
    res.send("spaceId ")
})

spaceRouter.get("/all", (req, res) =>{
    res.send("all ")
})

spaceRouter.post("/element", (req , res) =>{
    res.send("element ")
})

spaceRouter.delete("/element", (req, res) =>{
    res.send("element ")
})




spaceRouter.get("/:spaceId", (req, res) =>{
    res.send("spaceId ")
})



 export default spaceRouter