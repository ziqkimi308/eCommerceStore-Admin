"use client";

import Link from "next/link";
import Image from "next/image";
import {
	HomeIcon,
	LogoutIcon,
	ShoppingBagIcon,
	SwatchIcon,
	UsersIcon,
} from "../icons";
import Button from "../ui/Button";
import { logoutUser } from "@/actions/authActions";
import { useUser } from "@/contexts/UserContext";

export default function Sidebar() {
	const { userData } = useUser();
	const menuItem = [
		{ text: "Dashboard", url: "/", icon: <HomeIcon /> },
		{ text: "Users", url: "/users", icon: <UsersIcon /> },
		{ text: "Product Type", url: "/product-type", icon: <SwatchIcon /> },
		{ text: "Products", url: "/products", icon: <ShoppingBagIcon /> },
		{ text: "Buyers", url: "/buyers", icon: <UsersIcon /> },
	];

	return (
		<div className="sidebar-main">
			<div className="p-4 m-4">
				<h1 className="text-3xl font-semibold">eStore</h1>
			</div>
			<ul className="mx-auto text-lg flex flex-col">
				{menuItem.map((menuItem, index) => (
					<li key={index}>
						<Link href={menuItem.url}>
							<div className="sidebar-list-item">
								<span className="mx-2">{menuItem.icon}</span>
								{menuItem.text}
							</div>
						</Link>
					</li>
				))}
			</ul>
			<div className="sidebar-usercard">
				<div className="flex flex-row items-center m-5 mb-8 space-x-8">
					<Image
						src="/user.svg"
						alt="User Avatar"
						height={50}
						width={50}
						radius="sm"
						className="rounded-full border-2 border-gray-600"
					/>
					<div className="text-lg font-semibold">{userData?.userName}</div>
					{/* Logout Button */}
					<Button
						className="bg-transparent text-black p-0"
						onClick={logoutUser}
					>
						<LogoutIcon className="h-7 w-7" />
					</Button>
				</div>
			</div>
		</div>
	);
}
