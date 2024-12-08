import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {

        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();

        if (!data || !data.categories) {
            return new NextResponse(JSON.stringify({ message: "Categories not found." }), {
                status: 404,
            });
        }

        return new NextResponse(JSON.stringify(data.categories), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error." }), {
            status: 500,
        });

    }
}