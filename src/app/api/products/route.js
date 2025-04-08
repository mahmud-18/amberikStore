import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const topBuy = searchParams.get("topBuy") === "true";

    const products = await prisma.product.findMany({
      where: {
        ...(featured && { isFeatured: true }),
        ...(topBuy && { isTopBuy: true }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      stock,
      category,
      sku,
      imageUrl,
      isFeatured,
      isTopBuy,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        category,
        sku,
        imageUrl,
        isFeatured,
        isTopBuy,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Gagal membuat produk" },
      { status: 500 }
    );
  }
}
