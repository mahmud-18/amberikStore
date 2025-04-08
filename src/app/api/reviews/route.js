import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    const reviews = await prisma.review.findMany({
      where: productId ? { productId } : undefined,
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data review" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { productId, name, rating, comment, imageUrl } = body;

    const review = await prisma.review.create({
      data: {
        productId,
        name,
        rating,
        comment,
        imageUrl,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Gagal membuat review" },
      { status: 500 }
    );
  }
}
