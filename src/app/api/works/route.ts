import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAuth } from "@/lib/auth";

export async function GET() {
  const works = await prisma.work.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(works);
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, country, industry, scope, result, image, published, order } = body;

  if (!title || !country || !industry || !scope || !result || !image) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const maxOrder = await prisma.work.aggregate({ _max: { order: true } });

  const work = await prisma.work.create({
    data: {
      title,
      country,
      industry,
      scope,
      result,
      image,
      published: published ?? true,
      order: order ?? (maxOrder._max.order ?? 0) + 1,
    },
  });

  return NextResponse.json(work);
}
