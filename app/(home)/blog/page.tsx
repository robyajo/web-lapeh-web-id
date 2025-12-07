import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "Blog",
  description: "Blog",
};
export default function page() {
  return (
    <div>
      <Link href="/">Home</Link>
    </div>
  );
}
