import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};
export default function page() {
  return (
    <>
      <LoginForm />
    </>
  );
}
