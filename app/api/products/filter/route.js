import { connectToMongoDB } from "@/lib/mongodb";
import product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    try {
        await connectToMongoDB();

        // Find products with a price that matches the query
        const result = await product.find({ 'products.price': parseInt(query) }, 'products.title products.price');

        // Extract titles and prices from the result
        const data = result.map((doc) => {
            return doc.products.filter((p) => p.price === parseInt(query)).map((p) => ({ title: p.title, price: p.price }));
        }).flat();
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}
