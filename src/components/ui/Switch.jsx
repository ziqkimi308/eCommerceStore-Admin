import cn from "@/lib/utils";
import Input from "./Input";

export default function Switch({ name, className, defaultChecked }) {
	return (
		<label
			htmlFor={name}
			className={cn("inline-flex items-center cursor-pointer w-fit", className)}
		>
			<div className="relative w-16 h-8">
				{/* The actual checkbox */}
				<Input type="checkbox" id={name} name={name} className="sr-only peer" defaultChecked={defaultChecked} />

				{/* Track */}
				<span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-300 peer-hover:bg-gray-500 peer-checked:bg-blue-600 peer-checked:peer-hover:bg-blue-600 pointer-events-none"></span>

				{/* Thumb */}
				<span className="absolute top-0.5 left-[4px] w-7 h-7 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-7 pointer-events-none"></span>
			</div>
		</label>
	);
}
