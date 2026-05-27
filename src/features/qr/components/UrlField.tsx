import styles from "./qr.module.css";

interface URLFieldProps {
	baseURL: string;
	setBaseURL: React.Dispatch<React.SetStateAction<string>>;
	errorURL: boolean;
}

export default function UrlField({
	baseURL,
	setBaseURL,
	errorURL,
}: URLFieldProps) {
	return (
		<div className={styles.field}>
			<label
				className={styles.label}
				htmlFor="qr-input"
			>
				URL
			</label>
			<input
				id="qr-input"
				className={styles.input}
				type="text"
				placeholder="https://example.com"
				value={baseURL}
				onChange={(e) => setBaseURL(e.target.value)}
				data-error={errorURL ? "true" : undefined}
				autoFocus
			/>
			<span className={styles.hint}>
				Your URL must begin with "https://" to ensure user security.
			</span>
		</div>
	);
}
