
import z from "zod"
export const signUpSchema = z.object({

    username: z.string(),
    password :z.string().min(8),
    type : z.enum(["admin", "user" ])
})

export const signInSchema = z.object({

    username : z.string(),
    password :z.string().min(8)
})

export const metadata = z.object({
    avatarId : z.string(),
})

export const spaceValidation  = z.object({
    name : z.string(),
    dimension: z.string(),
    mapId : z.string()
})

export const addElementSchema = z.object({
    elementId : z.string(),  
    spaceId: z.string(),
    x : z.number(),
    y : z.number(),
})

export const createElementforAdmin = z.object({
    imageUrl : z.string(),
    width : z.number(),
    height : z.number(),
    static : z.boolean(),
})

export const updateUrl = z.object({
    imageUrl : z.string(),
})

export const updateAvatar  = z.object({
    imageUrl : z.string(),
    name : z.string()
})

export const mapSchema = z.object({
    thumbnail :z.string(),
    dimension :z.string(),
    defaultElememts : z.array(z.object({
        elementId :  z.string(),
        x : z.number(),
        y :z.number()

      }

    ))

})