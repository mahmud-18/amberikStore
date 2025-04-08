import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tutorials = await prisma.tutorial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(tutorials);
  } catch (error) {
    console.error("Error fetching tutorials:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data tutorial" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, thumbnail, videoUrl, duration, difficulty } =
      body;

    const tutorial = await prisma.tutorial.create({
      data: {
        title,
        description,
        thumbnail,
        videoUrl,
        duration,
        difficulty,
      },
    });

    return NextResponse.json(tutorial);
  } catch (error) {
    console.error("Error creating tutorial:", error);
    return NextResponse.json(
      { error: "Gagal membuat tutorial" },
      { status: 500 }
    );
  }
}
