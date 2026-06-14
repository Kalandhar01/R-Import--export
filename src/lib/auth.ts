import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const COOKIE_NAME = "admin_token";

export function getExpectedToken(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD env var not set");
  return hashPassword(pw);
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token === getExpectedToken();
}

export async function requireAuth(): Promise<void> {
  const authed = await checkAuth();
  if (!authed) redirect("/admin");
}
