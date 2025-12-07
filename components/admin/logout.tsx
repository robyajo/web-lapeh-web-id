"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import AlertModal from "../modal/alert-modal";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function LogoutComponent() {
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ callbackUrl: "/", redirect: true });
      toast.success("Logout berhasil. Mengalihkan...");
    } catch {
      toast.error("Logout gagal. Silakan coba lagi.");
    } finally {
      setIsLoggingOut(false);
      setLogoutOpen(false);
    }
  };
  return (
    <div>
      <AlertModal
        isOpen={logoutOpen}
        onOpenChange={setLogoutOpen}
        data={null}
        isDeleting={isLoggingOut}
        handleDelete={() => handleLogout()}
        title="Keluar dari akun"
        description="Anda yakin ingin keluar dari akun Anda?"
        cancelLabel="Batal"
        actionLabel={isLoggingOut ? "Keluar..." : "Keluar"}
        actionClassName="bg-blue-600 hover:bg-blue-700"
      />
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={() => setLogoutOpen(true)}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
