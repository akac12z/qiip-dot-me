import { UTM_DEFINITION } from "./utm-definitions.ts";
import type { UTMFieldConfig, UTMFields } from "./utm.interfaces.ts";

export const UTM_KEYS: (keyof UTMFields)[] = [
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_term",
	"utm_content",
	"utm_id",
];

export const CHIP_STATE = {
	ON: "on",
	OFF: "off",
} as const;

export const REQUIRED_TRIO: UTMFieldConfig[] = [
	{
		key: "utm_source",
		label: "utm_source",
		placeholder: "google, newsletter, instagram…",
		tooltip: UTM_DEFINITION.source,
		required: true,
	},
	{
		key: "utm_medium",
		label: "utm_medium",
		placeholder: "cpc, email, social…",
		tooltip: UTM_DEFINITION.medium,
		required: true,
	},
	{
		key: "utm_campaign",
		label: "utm_campaign",
		placeholder: "black-friday-2025, product-launch…",
		tooltip: UTM_DEFINITION.campaign,
		required: true,
	},
];

export const OPTIONAL_TRIO: UTMFieldConfig[] = [
	{
		key: "utm_term",
		label: "utm_term",
		placeholder: "keyword",
		tooltip: UTM_DEFINITION.term,
	},
	{
		key: "utm_content",
		label: "utm_content",
		placeholder: "banner-top, cta-hero…",
		tooltip: UTM_DEFINITION.content,
	},
	{
		key: "utm_id",
		label: "utm_id",
		placeholder: "campaign-id",
		tooltip: UTM_DEFINITION.id,
	},
];
