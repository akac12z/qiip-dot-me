import styles from "./utm.module.css";

import type { UTMFields } from "../rules/utm.interfaces.ts";

import { UTM_DEFINITION } from "../rules/utm-definitions.ts";
import { OPTIONAL_TRIO, REQUIRED_TRIO } from "../rules/utm-fields.ts";
import UTMField from "./UTMField";

interface FormPorps {
	baseURL: string;
	errorURL: boolean;
	fields: UTMFields;
	setBaseURL: React.Dispatch<React.SetStateAction<string>>;
	setField: (key: keyof UTMFields, value: string) => void;
}

export default function UTMForm({
	baseURL,
	errorURL,
	setBaseURL,
	setField,
	fields,
}: FormPorps) {
	return (
		<section>
			<div className={styles.field}>
				<label
					className={styles.label}
					htmlFor="utm-url"
				>
					Main URL <span className={styles.mandatory}>*</span>
					<span className={styles.tooltip}>
						<span
							className={styles.tooltipTrigger}
							tabIndex={0}
						>
							?
						</span>
						<span className={styles.tooltipContent}>{UTM_DEFINITION.url}</span>
					</span>
				</label>
				<input
					id="utm-url"
					className={styles.input}
					type="url"
					placeholder="https://yourdomain.com/landing"
					autoComplete="off"
					value={baseURL}
					onChange={(e) => setBaseURL(e.target.value)}
					data-error={errorURL ? "true" : undefined}
				/>
				<p className={styles.hint}>
					Your URL must start with "https://" to ensure it is secure
				</p>
			</div>

			<div className={styles.divider} />

			<div className={styles.mandatoryFields}>
				{REQUIRED_TRIO.map(({ key, label, placeholder, tooltip }) => (
					<UTMField
						key={key}
						label={label}
						placeholder={placeholder}
						tooltip={tooltip}
						value={fields[key]}
						setField={setField}
						fieldKey={key}
						required
					/>
				))}
			</div>

			<div className={styles.optionalFields}>
				{OPTIONAL_TRIO.map(({ key, label, placeholder, tooltip }) => (
					<UTMField
						key={key}
						label={label}
						placeholder={placeholder}
						tooltip={tooltip}
						value={fields[key]}
						setField={setField}
						fieldKey={key}
					/>
				))}
			</div>
		</section>
	);
}
