import { navigate } from "astro:transitions/client";
import { useState, useRef } from "react";

import type { UTMFields } from "../rules/utm.interfaces.ts";

import styles from "./utm.module.css";

import UTMForm from "./UTMForm.tsx";
import Chips from "./Chips.tsx";
import UTMResult from "./UTMResult.tsx";

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

export default function UTMBuilder() {
	const [baseUrl, setBaseUrl] = useState("");
	const [fields, setFields] = useState<UTMFields>(EMPTY);
	const [showToast, setShowToast] = useState(false);
	const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const errorURL = baseUrl.length > 0 && !baseUrl.startsWith("https://");
	const canGenerate =
		baseUrl &&
		!errorURL &&
		fields.utm_source &&
		fields.utm_medium &&
		fields.utm_campaign;
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

	function handleQrClick() {
		if (generatedUrl) {
			sessionStorage.setItem("qr-prefill", generatedUrl);
			navigate(`/qr?url=${encodeURIComponent(generatedUrl)}`);
		}
	}

	return (
		<>
			<UTMForm
				baseURL={baseUrl}
				errorURL={errorURL}
				fields={fields}
				setBaseURL={setBaseUrl}
				setField={setField}
			/>

			<Chips fields={fields} />

			<UTMResult
				copyUrl={copyUrl}
				generatedURL={generatedUrl}
				toQR={handleQrClick}
			/>

			<div
				className={styles.toast}
				data-show={showToast ? "" : undefined}
			>
				✓ Copied URL
			</div>
		</>
	);
}
