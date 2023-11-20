import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // console.log("middleware session", session);

    if (!session) {
      const requestPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/api/auth/signin`;
      url.search = `p=${requestPage}`;

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // console.log("middleware authorized", token);
        // return !!token?.idToken;
        return !!token?.idToken;
      },
    },
  }
);

/*
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // console.log("middleware",session, process.env.NEXTAUTH_URL);

  if (!session) {
    const requestPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/api/auth/signin`;
    url.search = `p=${requestPage}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
} */

// export const config = { matcher: [] };
export const config = {
  matcher: ["/dashboard"],
};
