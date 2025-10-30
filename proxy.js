import { NextResponse } from "next/server";
import { verifyJWT } from "./src/lib/token";

// all routes except these must undergo middleware first of all
// Next.js now expects you to use the export const matcher syntax directly, not nested inside a config object.
export const matcher = [
	'/((?!_next/static|_next/image|favicon.ico|.*\\..*|api|uploads).*)'
]

// if it is named export, the function must be named "middleware"
// middleware receives NextRequest object as parameter
export default async function proxy(request) {
	const token = request?.cookies?.get("jwt_token")?.value
	const publicRoutes = ["/login"]
	const isValidToken = await verifyJWT(token)

	// NextResponse is a middleware. That's why we use NextResponse.redirect() here
	// if the token is not valid and the page is not login, always redirect to login page
	if (!isValidToken && !publicRoutes.includes(request.nextUrl.pathname)) {
		// await deleteCookies("jwt_token")
		await fetch(`${request.nextUrl.origin}/api/delete-cookie`, {
			method: "POST",
			cache: "no-store",
		});
		return NextResponse.redirect(new URL("/login", request.nextUrl.origin))
	}
	// if the page is login and the token is valid, login page cannot be accessed again
	else if (isValidToken && publicRoutes.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL("/", request.nextUrl.origin))
	}
}

/* Delete cookies. The reason this here because Edge middleware cannot import any file that includes native modules, even if the specific function you call doesn’t use them. If you put in authActions.js, it contains bcrypt, while you cannot put in cookies.js because it can only be in server  */
// export async function deleteCookies(name) {
// 	const cookieStore = await cookies()
// 	cookieStore.delete(name)
// }