import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/search(.*)",
  "/barber(.*)",
  "/connexion(.*)",
  "/inscription-client(.*)",
  "/inscription-barbier(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const url = new URL("/connexion", req.url);
      url.searchParams.set("redirect_url", req.url);
      return Response.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
