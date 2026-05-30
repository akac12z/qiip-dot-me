export type DOT_LEVEL = "L" | "M" | "Q" | "H";

interface DotLevel {
	value: DOT_LEVEL;
	label: string;
	percent: string;
}

export const DOT_LEVELS: DotLevel[] = [
	{ value: "L", label: "Low", percent: "7%" },
	{ value: "M", label: "Med", percent: "15%" },
	{ value: "Q", label: "Normal", percent: "25%" },
	{ value: "H", label: "High", percent: "30%" },
];
