import { Router } from "express";

const adminRouter = Router()

adminRouter.get("/map", (req, res) =>{
    res.send("mao")
})

adminRouter.get("/avatar",(req, res) =>{
    res.send("avatar")
})

adminRouter.put("/element/:elementid", (req, res) =>{
    res.send("elemetmg ")
})

adminRouter.post("/element", (req, res) =>{{
    res.send("element")
}})
 export default adminRouter