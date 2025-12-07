"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbType } from "@/types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/animate-ui/components/radix/alert-dialog";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Eye, Plus } from "lucide-react";

export default function PageContainerDashboard({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb: BreadcrumbType[];
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { data: session } = useSession();
  const [showSessionExpiredDialog, setShowSessionExpiredDialog] =
    useState(false);

  const { data: sessionData, error: sessionError } = useQuery<any>({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/session`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${session?.data?.token}`,
          },
        });
        return response.data;
      } catch (error: any) {
        // Return the error response data so we can check for "Unauthenticated." message
        if (error.response?.data) {
          return error.response.data;
        }
        throw error;
      }
    },
    refetchOnWindowFocus: true,
    // refetchInterval: 10000,
    enabled: !!session?.data?.token,
    retry: false, // Don't retry on 401 errors
  });
  // Check if session is expired
  useEffect(() => {
    const isSessionExpired =
      sessionData?.data?.authenticated === false ||
      sessionData?.message === "Unauthenticated." ||
      (sessionError &&
        "response" in sessionError &&
        (sessionError as any)?.response?.data?.message === "Unauthenticated.");

    if (isSessionExpired) {
      setShowSessionExpiredDialog(true);
    }
  }, [sessionData, sessionError]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <AlertDialog
        open={showSessionExpiredDialog}
        onOpenChange={setShowSessionExpiredDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Expired</AlertDialogTitle>
            <AlertDialogDescription>
              Your session has expired. Please log in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={handleLogout}>Logout</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <SidebarInset>
        <header className="sticky top-0 z-50 bg-background/10 backdrop-blur supports-backdrop-filter:bg-background/10 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border:black/10 dark:border-white/10">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumb.map((item, idx) => (
                  <React.Fragment key={item.href}>
                    <BreadcrumbItem>
                      {item.isCurrent ? (
                        <BreadcrumbPage className="font-bold">
                          {item.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={item.href}
                          className="font-medium"
                        >
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {idx < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 mr-4">
            <ThemeSwitcher />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className=" w-full max-w-7xl mx-auto space-y-4">{children}</div>
        </div>
      </SidebarInset>
    </>
  );
}
