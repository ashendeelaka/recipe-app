import dbConnect from "@/lib/db";
import UserDBModel from "@/models/db/user-model";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
    await dbConnect();
    const { firstName, lastName, email, password, phone } = await req.json();

    if (!firstName || !email || !password || !phone) {
        return new Response(JSON.stringify({ message: "Required fields missing" }), {
            status: 400,
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserDBModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: hashedPassword
        })
        await newUser.save()
        return new Response(JSON.stringify({ message: "User registered successfully", user: newUser }), {
            status: 201,
        });
    } catch (error: any) {
        console.log("auth/register err : ", error)
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}