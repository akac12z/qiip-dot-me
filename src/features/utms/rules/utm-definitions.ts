export const UTM_DEFINITION = {
	url: "Base URL of the page you're driving traffic to. Don't include any UTM parameters here.",
	source:
		"Who sent the traffic? Identifies the specific platform or site sending the traffic, such as Google, Facebook, or Newsletter.",
	medium:
		"How did they get here? Identifies the high-level channel or type of traffic, like cpc (paid ads), email, or social.",
	campaign:
		"What is the big event? Identifies the specific marketing effort or product promotion being tracked, such as summer_sale or launch_2026.",
	term: "Which keyword did they type? Used primarily in paid search to identify the specific keywords that triggered the ad.",
	content:
		"Which specific link did they click? Used to differentiate between similar links or ads within the same campaign, like blue_banner_v1 versus red_button_v2.",
	id: "What is the internal serial number? A unique code used to identify a specific campaign in your backend data or to link to an uploaded campaign dataset.",
} as const;
