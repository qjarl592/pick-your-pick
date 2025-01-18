import withAuth from "next-auth/middleware";

export default withAuth(
  function middleware() {
    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/",
    },
  }
);

export const config = {
  matcher: ["/score/:path*"],
};
