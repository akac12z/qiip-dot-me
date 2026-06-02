import { useMemo, useRef, useState } from "react";
import type { WCStats } from "../rules/wc.interfaces.ts";
import {
	PARAGRAPH_SPLIT_RE,
	SENTENCE_RE,
	WORDS_PER_MINUTE,
} from "../rules/wc-config.ts";

function computeStats(text: string): WCStats {
	const trimmed = text.trim();
	const isEmpty = trimmed === "";

	const words = isEmpty ? 0 : trimmed.split(/\s+/).length;
	const chars = text.length;
	const sentences = isEmpty
		? 0
		: (trimmed.match(SENTENCE_RE) ?? []).length || 1;
	const paragraphs = isEmpty
		? 0
		: text
				.split(PARAGRAPH_SPLIT_RE)
				.filter((paragraph) => paragraph.trim() !== "").length || 1;
	const readingTime = isEmpty
		? 0
		: Math.max(1, Math.round(words / WORDS_PER_MINUTE));

	return { words, chars, sentences, paragraphs, readingTime };
}

export function useWordCounter() {
	const [text, setText] = useState("");
	const [showToast, setShowToast] = useState(false);
	const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const stats = useMemo(() => computeStats(text), [text]);

	function clearText() {
		setText("");
	}

	function copyText() {
		if (!text) return;
		navigator.clipboard.writeText(text);
		if (toastTimer.current) clearTimeout(toastTimer.current);
		setShowToast(true);
		toastTimer.current = setTimeout(() => setShowToast(false), 2000);
	}

	return { text, setText, stats, clearText, copyText, showToast };
}
