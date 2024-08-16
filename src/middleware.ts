import { withAuth } from "next-auth/middleware";
import { env } from "./env";
import { redirect } from "next/navigation";

export default withAuth({
  secret: env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false;
      const firstRoute = req.url.split("/")[3];
      if (firstRoute === "admin") {
        return (token as any).user?.role === "admin";
      } else if (firstRoute == "user") {
        const authed = !!token?.user;
        return authed;
      }
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
});

export const config = { matcher: ["/admin/:path*", "/user/:path*"] };
