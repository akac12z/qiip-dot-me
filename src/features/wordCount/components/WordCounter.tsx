import styles from "./wc.module.css";
import { useWordCounter } from "../hooks/useWordCounter.ts";
import WCStats from "./WCStats.tsx";
import WCTextarea from "./WCTextarea.tsx";

export default function WordCounter() {
	const { text, setText, stats, clearText, copyText, showToast } =
		useWordCounter();

	return (
		<>
			<WCTextarea
				text={text}
				setText={setText}
				onClear={clearText}
				onCopy={copyText}
			/>
			<WCStats stats={stats} />
			<div
				className={styles.toast}
				data-show={showToast ? "" : undefined}
			>
				✓ Copied
			</div>
		</>
	);
}
