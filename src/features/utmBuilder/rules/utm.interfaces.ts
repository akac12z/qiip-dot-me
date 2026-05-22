export interface UTMFields {
	utm_source: string;
	utm_medium: string;
	utm_campaign: string;
	utm_term: string;
	utm_content: string;
	utm_id: string;
}

export interface UTMFieldConfig {
	key: keyof UTMFields;
	label: string;
	placeholder: string;
	tooltip: string;
	required?: boolean;
}
