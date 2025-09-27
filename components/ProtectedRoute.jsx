// components/ProtectedRoute.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedRoute({ children }) {
  const cookieStore = await cookies(); // await cookies
  const token = cookieStore.get("auth_token")?.value;

  // If no auth token, redirect to sign-in
  if (!token) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
