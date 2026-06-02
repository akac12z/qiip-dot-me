import styles from "./wc.module.css";

interface Props {
	text: string;
	setText: (value: string) => void;
	onClear: () => void;
	onCopy: () => void;
}

function IconTrash() {
	return (
		<svg
			width="15"
			height="15"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.8"
			aria-hidden="true"
			viewBox="0 0 24 24"
		>
			<path d="M3 6h18m-2 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 5v6m4-6v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
		</svg>
	);
}

function IconCopy() {
	return (
		<svg
			width="15"
			height="15"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.8"
			aria-hidden="true"
			viewBox="0 0 24 24"
		>
			<rect
				width="13"
				height="13"
				x="9"
				y="9"
				rx="2"
			/>
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
		</svg>
	);
}

export default function WCTextarea({ text, setText, onClear, onCopy }: Props) {
	return (
		<div className={styles.textareaWrap}>
			<textarea
				className={styles.textarea}
				placeholder="Paste or type your text here..."
				value={text}
				onChange={(e) => setText(e.target.value)}
				spellCheck={false}
			/>
			<button
				className={styles.iconBtn}
				data-position="top-right"
				onClick={onClear}
				disabled={text.length === 0}
				aria-label="Clear text"
				title="Clear text"
			>
				<IconTrash />
			</button>
			<button
				className={styles.iconBtn}
				data-position="bottom-right"
				onClick={onCopy}
				disabled={text.length === 0}
				aria-label="Copy text"
				title="Copy text"
			>
				<IconCopy />
			</button>
		</div>
	);
}
