import cn from "@/lib/utils";

export default function Button({children, className, onClick}) {
	return (
		<div>
			<button 
			className={cn("custom-submit-btn", className)}
			onClick={onClick}>{children}</button>
		</div>
	);
}