import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...classNames) {
	return twMerge(clsx(classNames))
}

export function formatDate(dateString) {
	const date = new Date(dateString)
	const options = {
		timeZone: "Asia/Kuala_Lumpur"
	}

	return date.toLocaleDateString("en-CA", options)
}