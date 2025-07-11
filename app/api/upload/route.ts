// app/api/upload/route.ts (Next 13+)
import { put } from "@vercel/blob";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return new Response("Missing file", { status: 400 });
    }

    const blob = await put(file.name, file, {
        access: "public", // ou "private"
    });

    return Response.json(blob); // Retorna a URL do arquivo
}
