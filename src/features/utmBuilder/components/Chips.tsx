import styles from "./utm.module.css";

import type { UTMFields } from "../rules/utm.interfaces";
import { UTM_KEYS, CHIP_STATE } from "../rules/utm-fields";

interface ChipProps {
	fields: UTMFields;
}

export default function Chips({ fields }: ChipProps) {
	return (
		<section className={styles.chipsRow}>
			{UTM_KEYS.map((key) => (
				<div
					key={key}
					data-chip={fields[key] ? CHIP_STATE.ON : CHIP_STATE.OFF}
				>
					{key}
				</div>
			))}
		</section>
	);
}
