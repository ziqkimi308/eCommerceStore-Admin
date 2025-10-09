"use client";

import Input from "./Input";
import { UploadIcon } from "../icons";
import { useEffect, useState } from "react";

export default function CustomFileInput({ name, required, defaultValue }) {
	const [fileName, setFileName] = useState("No file chosen.");

	const handleFileChange = (e) => {
		const file = e.target.files[0]; // .files gives details of file in object format. First index give the name
		setFileName(file.name || "No file chosen.");
	};

	// Without useEffect, the if statement will triggered which trigger state updates (setFileName) which will re-render and trigger if again. 
	useEffect(() => {
		if (defaultValue) {
			const parts = defaultValue.split("/");
			setFileName(parts[parts.length - 1]);
		}
	}, [defaultValue]);

	return (
		<div className="grid grid-cols-[auto_1fr] items-center gap-2">
			<Input
				type="file"
				name={name}
				required={required}
				id={name}
				className="sr-only"
				onChange={handleFileChange}
			/>
			<label
				htmlFor={name}
				className="custom-input bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 w-fit flex gap-x-2 font-semibold"
			>
				<UploadIcon />
				Choose File
			</label>

			{/* The text at right side */}
			<span className="ml-3 text-gray-600 truncate">{fileName}</span>
		</div>
	);
}
