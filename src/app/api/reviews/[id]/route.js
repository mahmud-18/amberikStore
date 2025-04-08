import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Review tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data review" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, rating, comment, imageUrl } = body;

    const review = await prisma.review.update({
      where: { id },
      data: {
        name,
        rating,
        comment,
        imageUrl,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui review" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Review berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Gagal menghapus review" },
      { status: 500 }
    );
  }
}
