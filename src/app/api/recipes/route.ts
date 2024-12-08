
export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url!);
    const category = searchParams.get("category");

    if (!category) {

        return new Response(JSON.stringify({ message: "Category is required." }), {
            status: 400,
        });
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();

        if (!data.meals) {
            return new Response(JSON.stringify({ message: "No meals found for the selected category." }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(data.meals), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching meals:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error." }), {
            status: 500,
        });
    }
}