import { connectToMongoDB } from "@/lib/mongodb";
import product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectToMongoDB();
        // Find all products in the collection with only 'products.title' and 'products.price' fields
        const result = await product.find({}, 'products.title products.price');

        // Extract titles and prices from the result
        const data = result.map((product) => product.products.map((p) => ({ title: p.title, price: p.price }))).flat();

        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}
