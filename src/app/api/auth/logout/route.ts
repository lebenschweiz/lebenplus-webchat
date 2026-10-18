import { seeOther } from "@/lib/auth/redirect";
import { signOut } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  await signOut();
  return seeOther("/");
}
