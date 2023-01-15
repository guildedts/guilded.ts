export * from './EmbedBuilder';
export * from '@guildedts/util';

/**
 * Create bold text
 * @param text The text
 * @returns The formatted text
 * @example bold('bold text'); // '**bold text**'
 */
export const bold = <T extends string>(text: T) => `**${text}**` as const;

/**
 * Create italic text
 * @param text The text
 * @returns The formatted text
 * @example italic('italic text'); // '*italic text*'
 */
export const italic = <T extends string>(text: T) => `*${text}*` as const;

/**
 * Create a spoiler
 * @param text The text
 * @returns The formatted text
 * @example spoiler('spoiler text'); // '||spoiler text||'
 */
export const spoiler = <T extends string>(text: T) => `||${text}||` as const;

/**
 * Underline text
 * @param text The text
 * @returns The formatted text
 * @example underline('underlined text'); // '__underlined text__'
 */
export const underline = <T extends string>(text: T) => `__${text}__` as const;

/**
 * Strikethrough text
 * @param text The text
 * @returns The formatted text
 * @example strikethrough('strikethrough text'); // '~~strikethrough text~~'
 */
export const strikeThrough = <T extends string>(text: T) => `~~${text}~~` as const;

/**
 * Create inline code
 * @param text The text
 * @returns The formatted text
 * @example inlineCode('inline code'); // '`inline code`'
 */
export const inlineCode = <T extends string>(text: T) => `\`${text}\`` as const;

/**
 * Create a divider
 * @param newLine Whether to create a new line
 * @returns The formatted text
 * @example
 * // Create a divider
 * divider(); // '---'
 * // Create a divider with a new line
 * divider(true); // '\n---\n'
 */
export const divider = <NL extends boolean>(newLine = false as NL) =>
	(newLine ? '\n---\n' : '---') as NL extends true ? '\n---\n' : '---';

/**
 * Create a big heading
 * @param text The text
 * @returns The formatted text
 * @example h1('big heading'); // '# big heading'
 */
export const h1 = <T extends string>(text: T) => `# ${text}` as const;

/**
 * Create a medium heading
 * @param text The text
 * @returns The formatted text
 * @example h2('medium heading'); // '## medium heading'
 */
export const h2 = <T extends string>(text: T) => `## ${text}` as const;

/**
 * Create a user mention
 * @param userId The ID of the user
 * @returns The formatted text
 * @example userMention('abc'); // '<@abc>'
 */
export const userMention = <U extends string>(userId: U) => `<@${userId}>` as const;
