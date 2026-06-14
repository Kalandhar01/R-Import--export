import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAuth } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const work = await prisma.work.findUnique({ where: { id } });
  if (!work) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(work);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const work = await prisma.work.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(work);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.work.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
