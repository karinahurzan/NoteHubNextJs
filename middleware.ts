import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // В ТЗ зазвичай використовується "session-token" або "accessToken"
  // Перевір назву куки в DevTools -> Application -> Cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 1. Якщо користувач НЕ авторизований і йде на приватний роут
  if (isPrivateRoute && !accessToken) {
    const redirectUrl = new URL("/sign-in", request.url);
    // Можна додати параметр, щоб після логіну повернути користувача сюди
    // redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 2. Якщо користувач АВТОРИЗОВАНИЙ і йде на сторінки логіну/реєстрації
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
