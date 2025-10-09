import { NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";
import { cookies } from "next/headers";

// if it is named export, the function must be named "middleware"
// middleware receives NextRequest object as parameter
export default async function handler(req, res) {
	const token = req?.cookies?.get("jwt_token")?.value
	const publicRoutes = ["/login"]
	const isValidToken = await verifyJWT(token)

	// NextResponse is a middleware. That's why we use NextResponse.redirect() here
	// if the token is not valid and the page is not login, always redirect to login page
	if (!isValidToken && !publicRoutes.includes(req.nextUrl.pathname)) {
		await deleteCookies("jwt_token")
		return NextResponse.redirect(new URL("/login", req.nextUrl.origin))
	}
	// if the page is login and the token is valid, login page cannot be accessed again
	else if (isValidToken && publicRoutes.includes(req.nextUrl.pathname)) {
		return NextResponse.redirect(new URL("/", req.nextUrl.origin))
	}
}

// Config for middleware
export const config = {
	// all routes except these must undergo middleware first of all
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|api|uploads).*)"
	]
}

/* Delete cookies. The reason this here because Edge middleware cannot import any file that includes native modules, even if the specific function you call doesn’t use them. If you put in authActions.js, it contains bcrypt, while you cannot put in cookies.js because it can only be in server  */
export async function deleteCookies(name) {
	const cookieStore = await cookies()
	cookieStore.delete(name)
}