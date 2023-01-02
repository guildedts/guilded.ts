import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';

/**
 * Resolve a color from a string, number, RGB array or color preset.
 * Inspired by discord.js'
 * {@link https://github.com/discordjs/discord.js/blob/main/packages/discord.js/src/util/Util.js#L476 color resolver}.
 * @param color The color to resolve
 * @returns The resolved color
 * @example
 * // Resolve the color with a hex color
 * resolveColor(0xFFFFFF);
 * resolveColor('#FFFFFF');
 * // Resolve the color with a color preset
 * resolveColor('White');
 * // Resolve the color with RGB values
 * resolveColor([255, 255, 255]);
 */
export function resolveColor(color: ColorResolvable) {
	if (color === 'Random') color = Math.floor(Math.random() * (0xffffff + 1));
	else if (typeof color === `string`)
		color = Color[color] || parseInt(color.replace('#', ''), 16);
	else if (Array.isArray(color)) color = (color[0] << 16) + (color[1] << 8) + color[2];
	return color as number;
}

/**
 * The color resolvable type
 */
export type ColorResolvable =
	| `#${string}`
	| keyof typeof Color
	| 'Random'
	| number
	| [red: number, green: number, blue: number];

/**
 * A set of color presets
 */
export enum Color {
	Default = 0x000000,
	White = 0xffffff,
	Aqua = 0x1abc9c,
	Green = 0x57f287,
	Blue = 0x3498db,
	Yellow = 0xfee75c,
	Purple = 0x9b59b6,
	LuminousVividPink = 0xe91e63,
	Fuchsia = 0xeb459e,
	Gold = 0xf1c40f,
	Gilded = 0xf5c400,
	Orange = 0xe67e22,
	Red = 0xed4245,
	Grey = 0x95a5a6,
	Navy = 0x34495e,
	DarkAqua = 0x11806a,
	DarkGreen = 0x1f8b4c,
	DarkBlue = 0x206694,
	DarkPurple = 0x71368a,
	DarkVividPink = 0xad1457,
	DarkGold = 0xc27c0e,
	DarkOrange = 0xa84300,
	DarkRed = 0x992d22,
	DarkGrey = 0x979c9f,
	DarkerGrey = 0x7f8c8d,
	LightGrey = 0xbcc0c0,
	DarkNavy = 0x2c3e50,
	Blurple = 0x5865f2,
	Greyple = 0x99aab5,
	DarkButNotBlack = 0x2c2f33,
	NotQuiteBlack = 0x23272a,
}

/**
 * Covert object keys to snake_case
 * @param target The target object
 * @returns The snake_case result
 * @example toSnakeCase({ helloWorld: 'Hello World!' }); // { hello_world: 'Hello World!' }
 */
export function toSnakeCase(target: unknown) {
	if (typeof target !== 'object' || !target) return target;
	if (target instanceof Date) return target;
	if (Array.isArray(target)) return target.map(toSnakeCase);
	return Object.fromEntries(
		Object.entries(target).map(([key, value]) => [snakeCase(key), toSnakeCase(value)]),
	);
}

/**
 * Covert object keys to camelCase
 * @param target The target object
 * @returns The camelCase result
 * @example toCamelCase({ hello_world: 'Hello World!' }); // { helloWorld: 'Hello World!' }
 */
export function toCamelCase(target: unknown) {
	if (typeof target !== 'object' || !target) return target;
	if (target instanceof Date) return target;
	if (Array.isArray(target)) return target.map(toSnakeCase);
	return Object.fromEntries(
		Object.entries(target).map(([key, value]) => [camelCase(key), toCamelCase(value)]),
	);
}
