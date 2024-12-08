import UserDBModel from "@/models/db/user-model";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";

export const POST = async (req: Request) => {
    await dbConnect()
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const { recipeId } = await req.json();

    if (!recipeId) {
        return new Response(JSON.stringify({ message: "Recipe ID is required" }), {
            status: 400,
        });
    }

    try {
        const user = await UserDBModel.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
            });

        }

        if (!user.favourite!.includes(recipeId)) {
            user.favourite!.push(recipeId);
            await user.save();
            return new Response(JSON.stringify({ message: "Recipe added to favorites", recipeIds:user.favourite  }), {
                status: 201,
            });

        } else {
            return new Response(JSON.stringify({ message: "Recipe already in favorites" }), {
                status: 400,
            });

        }
    } catch (error) {
        console.error("Error adding to favorites", error);
        return new Response(JSON.stringify({ message: "Error adding to favorites" }), {
            status: 500,
        });

    }
};

export const DELETE = async (req: Request) => {
    await dbConnect()
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const { recipeId } = await req.json();

    if (!recipeId) {
        return new Response(JSON.stringify({ message: "Recipe ID is required." }), {
            status: 400,
        });

    }

    try {
        const user = await UserDBModel.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found." }), {
                status: 404,
            });

        }

        if (user.favourite!.includes(recipeId)) {
            user.favourite = user.favourite!.filter((id: string) => id !== recipeId);
            await user.save();
            return new Response(JSON.stringify({ message: "Recipe removed from favorites", favourite: user.favourite }), {
                status: 200,
            });

        } else {
            return new Response(JSON.stringify({ message: "Recipe not in favorites" }), {
                status: 400,
            });

        }
    } catch (error) {
        console.error("Error removing from favorites", error);
        return new Response(JSON.stringify({ message: "Error removing from favorites" }), {
            status: 500,
        });
    }
};

export const GET = async (req: Request) => {
    await dbConnect()
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new Response(JSON.stringify({ message: "User ID is required" }), {
                status: 400,
            });

        }

        const user = await UserDBModel.findById(userId).select("favourite");
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
            });

        }

        // Fetch recipe details using the IDs from the 'favorites' array
        const recipeDetailsPromises = user.favourite!.map(async (recipeId: any) => {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
            );
            const data = await response.json();
            return data.meals ? data.meals[0] : null;
        });

        const recipeDetails = await Promise.all(recipeDetailsPromises);
        return new Response(JSON.stringify(recipeDetails), {
            status: 200,
        });

    } catch (error) {
        console.error("Error fetching favorite recipes:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error." }), {
            status: 500,
        });

    }
};