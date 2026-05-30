import { navigate } from "astro:transitions/client";
import { useRef, useState } from "react";
import type { UTMFields } from "../rules/utm.interfaces.ts";

const EMPTY: UTMFields = {
	utm_source: "",
	utm_medium: "",
	utm_campaign: "",
	utm_term: "",
	utm_content: "",
	utm_id: "",
};

function buildUrl(base: string, fields: UTMFields): string | null {
	try {
		const url = new URL(base);
		Object.entries(fields).forEach(([param, value]) => {
			if (value) url.searchParams.set(param, value);
		});
		return url.toString();
	} catch {
		return null;
	}
}

export function useUTMBuilder() {
	const [baseUrl, setBaseUrl] = useState("");
	const [fields, setFields] = useState<UTMFields>(EMPTY);
	const [showToast, setShowToast] = useState(false);
	const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const hasText = baseUrl.length > 0;
	const urlError = hasText && !baseUrl.startsWith("https://");
	const canGenerate = hasText && !urlError && fields.utm_source && fields.utm_medium && fields.utm_campaign;
	const generatedUrl = canGenerate ? buildUrl(baseUrl, fields) : null;

	function setField(key: keyof UTMFields, value: string) {
		setFields((prev) => ({ ...prev, [key]: value }));
	}

	function copyUrl() {
		if (!generatedUrl) return;
		navigator.clipboard.writeText(generatedUrl);
		if (toastTimer.current) clearTimeout(toastTimer.current);
		setShowToast(true);
		toastTimer.current = setTimeout(() => setShowToast(false), 2200);
	}

	function goToQR() {
		if (!generatedUrl) return;
		sessionStorage.setItem("qr-prefill", generatedUrl);
		navigate(`/qr?url=${encodeURIComponent(generatedUrl)}`);
	}

	return {
		baseUrl,
		setBaseUrl,
		fields,
		setField,
		urlError,
		generatedUrl,
		showToast,
		copyUrl,
		goToQR,
	};
}
