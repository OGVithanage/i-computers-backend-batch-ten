import jwt, { decode } from "jsonwebtoken"

export function authenticateUser(req, res, next) {
    const header = req.header("Authorization")
    if (header != null) {
        const token = header.replace("Bearer ", "")
        jwt.verify(token, "tmp",
            (error, decoded) => {
                if (!decoded) {
                    res.json(
                        {
                            message: "Inavalid token please login again."
                        }
                    )
                } else {
                    req.user = decoded
                    next()
                }
            }
        )
    } else {
        next()
    }
}