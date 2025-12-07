import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Register",
  description: "Register",
};
export default function page() {
  return (
    <>
      <RegisterForm />
    </>
  );
}
