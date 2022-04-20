/**
 * Crate bold text.
 * @param text The text to be formatted.
 * @returns The formatted text.
 */
export const bold = (text: string): `**${string}**` => `**${text}**`;

/**
 * Create italic text.
 * @param text The text to be formatted.
 * @returns The formatted text.
 */
export const italic = (text: string): `*${string}*` => `*${text}*`;

/**
 * Create a spoiler.
 * @param text The text to be formatted.
 * @returns The formatted text.
 */
export const spoiler = (text: string): `||${string}||` => `||${text}||`;

/**
 * Underline text.
 * @param text The text to be formatted.
 * @returns The formatted text.
 */
export const underline = (text: string): `__${string}__` => `__${text}__`;

/**
 * Strikethrough text.
 * @param text The text to be formatted.
 * @returns The formatted text.
 */
export const strikeThrough = (text: string): `~~${string}~~` => `~~${text}~~`;

/**
 * Create inline code.
 * @param text The text to be formatted.
 * @returns The formatted text.
 */
export const inlineCode = (text: string): `\`${string}\`` => `\`${text}\``;

/**
 * Create a divider
 * @returns The formatted text.
 */
export const divider = () => '\n---\n';

/**
 * Create a big heading.
 * @param text The text to be formatted.
 * @returns The formatted text.
 */
export const h1 = (text: string): `# ${string}` => `# ${text}`;

/**
 * Create a medium heading.
 * @param text The text to be formatted.
 * @returns The formatted text.
 */
export const h2 = (text: string): `## ${string}` => `## ${text}`;
