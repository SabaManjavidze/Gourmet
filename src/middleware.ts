import { withAuth } from "next-auth/middleware";
import { env } from "./env";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    secret: env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) return false;
        const firstRoute = req.url.split("/")[3];
        if (firstRoute === "admin") {
          return (token as any).user?.role === "admin";
        }
        return true;
      },
    },
    pages: {
      signIn: "/",
    },
  },
);

export const config = { matcher: ["/admin/:path*", "/user/:path*"] };
