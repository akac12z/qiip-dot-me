import type { UTMFields } from "../rules/utm.interfaces.ts";
import styles from "./utm.module.css";

interface UTMFieldProps {
	fieldKey: keyof UTMFields;
	label: string;
	required?: boolean;
	tooltip: string;
	placeholder: string;
	value: string;
	setField: (key: keyof UTMFields, value: string) => void;
}

export default function UTMField({
	fieldKey,
	label,
	required,
	tooltip,
	placeholder,
	value,
	setField,
}: UTMFieldProps) {
	return (
		<div className={styles.field}>
			<label
				className={styles.label}
				htmlFor={fieldKey}
			>
				{label}
				{required ? (
					<span className={styles.mandatory}>*</span>
				) : (
					<span className={styles.optional}>(optional)</span>
				)}
				<span className={styles.tooltip}>
					<span
						className={styles.tooltipTrigger}
						tabIndex={0}
					>
						?
					</span>
					<span className={styles.tooltipContent}>{tooltip}</span>
				</span>
			</label>
			<input
				id={fieldKey}
				className={styles.input}
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => setField(fieldKey, e.target.value)}
			/>
		</div>
	);
}
