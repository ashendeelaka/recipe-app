import dbConnect from "@/lib/db";
import UserDBModel from "@/models/db/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const POST = async (req: Request) => {
    await dbConnect()
    const { email, password } = await req.json();

    if (!email || !password) {
        return new Response(JSON.stringify({ message: "Required fields missing" }), {
            status: 400,
        });
    }

    try {
        const user = await UserDBModel.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: "Invalid credentials" }), {
                status: 401,
            });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );
       
        return new Response(JSON.stringify({ message: "Login successful", token: token, userId: user._id }), {
            status: 200,
        });

    }
    catch (error: any) {
        console.log("Err in api/auth/login: ", error)
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });

    }
}