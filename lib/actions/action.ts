"use server";

import {
  signInTeacherServer,
  signUpTeacherServer,
} from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

type AuthValues = {
  fullName?: string;
  email: string;
  password: string;
};

export async function handleAuth(
  values: AuthValues,
  type: "sign-in" | "sign-up"
) {
  if (type === "sign-up") {
    await signUpTeacherServer({
      name: values.fullName!,
      email: values.email,
      password: values.password,
    });
  } else {
    await signInTeacherServer({
      email: values.email,
      password: values.password,
    });
  }

  // ✅ redirect after cookie is set
  redirect("/");
}
