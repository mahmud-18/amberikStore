import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const tutorial = await prisma.tutorial.findUnique({
      where: { id },
    });

    if (!tutorial) {
      return NextResponse.json(
        { error: "Tutorial tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(tutorial);
  } catch (error) {
    console.error("Error fetching tutorial:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data tutorial" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, thumbnail, videoUrl, duration, difficulty } =
      body;

    const tutorial = await prisma.tutorial.update({
      where: { id },
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
    console.error("Error updating tutorial:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui tutorial" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.tutorial.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Tutorial berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting tutorial:", error);
    return NextResponse.json(
      { error: "Gagal menghapus tutorial" },
      { status: 500 }
    );
  }
}
