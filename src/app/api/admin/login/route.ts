import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { hashPassword } from "@/lib/auth";
import { rateLimit, rateLimitKey } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const rl = rateLimit(rateLimitKey(request, "admin-login"), {
    max: 5,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  if (password !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_token", hashPassword(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return NextResponse.json({ success: true });
}
