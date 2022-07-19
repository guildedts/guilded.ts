export * from './Embed';
export * from './util';

/**
 * Create bold text.
 * @param text The text to be formatted.
 * @returns The formatted text.
 * @example bold('bold text'); // '**bold text**'
 */
export const bold = (text: string): `**${string}**` => `**${text}**`;

/**
 * Create italic text.
 * @param text The text to be formatted.
 * @returns The formatted text.
 * @example italic('italic text'); // '*italic text*'
 */
export const italic = (text: string): `*${string}*` => `*${text}*`;

/**
 * Create a spoiler.
 * @param text The text to be formatted.
 * @returns The formatted text.
 * @example spoiler('spoiler text'); // '||spoiler text||'
 */
export const spoiler = (text: string): `||${string}||` => `||${text}||`;

/**
 * Underline text.
 * @param text The text to be formatted.
 * @returns The formatted text.
 * @example underline('underlined text'); // '__underlined text__'
 */
export const underline = (text: string): `__${string}__` => `__${text}__`;

/**
 * Strikethrough text.
 * @param text The text to be formatted.
 * @returns The formatted text.
 * @example strikethrough('strikethrough text'); // '~~strikethrough text~~'
 */
export const strikeThrough = (text: string): `~~${string}~~` => `~~${text}~~`;

/**
 * Create inline code.
 * @param text The text to be formatted.
 * @returns The formatted text.
 * @example inlineCode('inline code'); // '`inline code`'
 */
export const inlineCode = (text: string): `\`${string}\`` => `\`${text}\``;

/**
 * Create a divider
 * @param newLine Whether to create a new line.
 * @returns The formatted text.
 * @example
 * // Create a divider
 * divider(); // '---'
 * // Create a divider with a new line
 * divider(true); // '\n---\n'
 */
export const divider = (newLine = false): `\n---\n` | '---' => (newLine ? '\n---\n' : '---');

/**
 * Create a big heading.
 * @param text The text to be formatted.
 * @returns The formatted text.
 * @example h1('big heading'); // '# big heading'
 */
export const h1 = (text: string): `# ${string}` => `# ${text}`;

/**
 * Create a medium heading.
 * @param text The text to be formatted.
 * @returns The formatted text.
 * @example h2('medium heading'); // '## medium heading'
 */
export const h2 = (text: string): `## ${string}` => `## ${text}`;

/**
 * Create a user mention.
 * @param userId The ID of the user to mention.
 * @returns The formatted text.
 * @example userMention('abc'); // '<@abc>'
 */
export const userMention = (userId: string): `<@${string}>` => `<@${userId}>`;
