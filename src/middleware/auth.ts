import jwt from "jsonwebtoken";

export async function authenticateToken(req: Request): Promise<{ userId: string } | null> {

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return null
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
        return decoded
    }
    catch {
        return null;
    }
}