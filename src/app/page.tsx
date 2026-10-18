import Chat from "@/components/Chat";
import { currentUser } from "@/lib/auth/session";
import { isPremium } from "@/lib/billing";

export default async function Home() {
  const user = await currentUser();
  const account = user ? { email: user.email, premium: await isPremium(user) } : null;
  return <Chat account={account} />;
}
