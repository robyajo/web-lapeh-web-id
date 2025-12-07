import { AuthOptions, User, Account, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

// Extend the Session and User types to include our custom properties
declare module "next-auth" {
  interface Session {
    success: boolean;
    message: string;
    data: {
      user: {
        name: string;
        email: string;
        role: string;
        emailVerified: Date | null;
        avatarUrl: string | null;
      };
      token: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    accessToken: string;
    emailVerified: Date | null;
    avatarUrl: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: {
      name: string;
      email: string;
      role: string;
      emailVerified: Date | null;
      avatarUrl: string | null;
    };
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 60 * 60 * 24 * 7,
    // maxAge: 20,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
    // maxAge: 20,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const signinUrl = process.env.NEXT_PUBLIC_API_URL + "/api/login";

          const res = await axios.post(
            signinUrl,
            {
              email: credentials.email.trim(),
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              timeout: 10000, // 10 detik
            }
          );

          if (res.headers["content-type"]?.includes("application/json")) {
            const response = res.data;

            if (response?.access_token && response?.data) {
              const userData = response.data;

              return {
                id: String(userData.id),
                name: userData.name,
                email: userData.email,
                emailVerified: userData.email_verified_at,
                avatarUrl: userData.avatar_url,
                role: userData.role,
                accessToken: response.access_token,
              };
            } else {
              throw new Error(response?.message || "Authentication failed");
            }
          } else {
            throw new Error("Received invalid response from server");
          }
        } catch (error: any) {
          if (error.response?.data) {
            const data = error.response.data;
            const message = data?.message || "Authentication failed";
            const errors = data?.errors;
            if (errors && typeof errors === "object") {
              throw new Error(JSON.stringify({ message, errors }));
            }
            if (Array.isArray(errors)) {
              throw new Error(JSON.stringify({ message, errors }));
            }
            throw new Error(JSON.stringify({ message }));
          }
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | AdapterUser }) {
      if (user) {
        const u = user as User;
        token.accessToken = u.accessToken;
        token.user = {
          name: u.name,
          email: u.email,
          role: u.role,
          emailVerified: u.emailVerified,
          avatarUrl: u.avatarUrl,
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.success = true;
      session.message = "Login berhasil.";
      session.data = {
        user: {
          name: token.user?.name,
          email: token.user?.email,
          emailVerified: token.user?.emailVerified,
          avatarUrl: token.user?.avatarUrl,
          role: token.user?.role,
        },
        token: token.accessToken,
      };
      return session;
    },
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: any;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }) {
      if (user) return true;
      else return false;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // CUSTOM
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl; // Fallback to baseUrl to prevent loops
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
    signOut: "/logout",
    error: "/error",
  },
};
