"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LoginSchemaValues, loginSchema } from "./login-schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "../ui/spinner";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const DEMO_EMAIL =
    process.env.NEXT_PUBLIC_DUMMY_EMAIL ?? "demo@kominfo.go.id";
  const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DUMMY_PASSWORD ?? "demo123";
  const form = useForm<LoginSchemaValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginSchemaValues) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        let msg = result.error;
        if (/ENOTFOUND|Network Error/i.test(msg)) {
          msg =
            "Tidak dapat terhubung ke server. Periksa NEXT_PUBLIC_API_URL dan koneksi jaringan.";
        } else {
          try {
            const parsed = JSON.parse(msg);
            if (parsed?.errors && typeof parsed.errors === "object") {
              const values = Object.values(parsed.errors as any);
              const fieldMessages = ([] as string[]).concat(...(values as any));
              msg = fieldMessages.length
                ? fieldMessages.join(", ")
                : parsed?.message || "Authentication failed";
            } else if (parsed?.message) {
              msg = parsed.message;
            }
          } catch {}
        }
        toast.error(msg);
        return;
      }

      toast.success("Login berhasil. Mengalihkan...");
      router.push(result?.url || "/dashboard");
    } catch (err) {
      toast.error("Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="#"
                            className="text-sm underline-offset-2 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                              disabled={loading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={loading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">
                                {showPassword
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Demo credentials hint + autofill */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg px-3 py-2.5">
                    <div>
                      <span className="font-semibold">Demo:</span>{" "}
                      <span className="font-mono">{DEMO_EMAIL}</span> /{" "}
                      <span className="font-mono">{DEMO_PASSWORD}</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => {
                        form.setValue("email", DEMO_EMAIL, {
                          shouldValidate: true,
                        });
                        form.setValue("password", DEMO_PASSWORD, {
                          shouldValidate: true,
                        });
                      }}
                    >
                      Isi Developer
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? <Spinner /> : "Login"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={loading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="mr-2 h-4 w-4"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </Form>
            </div>
          </div>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="https://plus.unsplash.com/premium_photo-1668708034552-223c0e4a8bc6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              width={687}
              height={454}
            />
          </div>
        </CardContent>
      </Card>

      <p className="px-6 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
