/* token.js should only handle JWT creation and verification without side effects like redirects or cookie management.
 */
import { jwtVerify, SignJWT } from "jose";

// Create token
export async function createJWT(user) {
	const token = await new SignJWT({
		...user,
	}).setProtectedHeader({
		alg: "HS256"
	}).setIssuedAt().setExpirationTime("2h")
		.sign(new TextEncoder().encode(process.env.JWT_SECRET)) // this encode equivalent to pyton .encode("utf-8")

	return token
}

// Verify token
export async function verifyJWT(token) {
	try {
		const { payload } = await jwtVerify(
			token,
			new TextEncoder().encode(process.env.JWT_SECRET)
		)
		return payload
	} catch (err) {
		return false
	}
}