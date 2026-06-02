import { WORDS_PER_MINUTE } from "./wc-config.ts";
import type { StatTools } from "./wc.interfaces.ts";

export const STAT_TOOLTIPS: StatTools = {
	characters:
		"If you add text in Markdown format, the actual character count will be affected and distorted.",
	sentences:
		"Counts groups of . ! or ? followed by a space or end of text. Abbreviations like Dr. or EE.UU. may be overcounted.",
	paragraphs:
		"A paragraph is a block of text separated by a blank line. A single line break does not start a new paragraph.",
	readingTime: `Estimated at ${WORDS_PER_MINUTE} words per minute.`,
};
