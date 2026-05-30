import styles from "./utm.module.css";
import { useUTMBuilder } from "../hooks/useUTMBuilder.ts";
import UTMForm from "./UTMForm.tsx";
import Chips from "./Chips.tsx";
import UTMResult from "./UTMResult.tsx";

export default function UTMBuilder() {
	const {
		baseUrl,
		setBaseUrl,
		fields,
		setField,
		urlError,
		generatedUrl,
		showToast,
		copyUrl,
		goToQR,
	} = useUTMBuilder();

	return (
		<>
			<UTMForm
				baseURL={baseUrl}
				errorURL={urlError}
				fields={fields}
				setBaseURL={setBaseUrl}
				setField={setField}
			/>

			<Chips fields={fields} />

			<UTMResult
				copyUrl={copyUrl}
				generatedURL={generatedUrl}
				toQR={goToQR}
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
