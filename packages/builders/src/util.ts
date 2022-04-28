/**
 * Resolve a color from a string, number, RGB array or color preset.
 * @param color The color to resolve.
 * @returns The resolved color.
 * Inspired by {@link https://github.com/guildedjs/guilded.js/blob/main/packages/webhook-client/lib/util.ts#L8 Guilded.JS}'s color resolver.
 */
export function resolveColor(
	color: ColorResolvable,
) {
	if (typeof color === `string`) color = COLORS[color as keyof typeof COLORS] ?? parseInt(color.replace('#', ''), 16);
	else if (Array.isArray(color)) color = (color[0] << 16) + (color[1] << 8) + color[2];

	return color;
}

/** The color resolvable type. */
export type ColorResolvable = `#${string}` | keyof typeof COLORS | number | [r: number, g: number, b: number];

/** A set of coloe presets. */
export const COLORS = {
	WHITE: 0xffffff,
	BLACK: 0x000000,
	GREY: 0x343a40,
	RED: 0xe03131,
	PINK: 0xc2255c,
	GRAPE: 0x9c36b5,
	VIOLET: 0x6741d9,
	INDIGO: 0x3b5bdb,
	BLUE: 0x1971c2,
	CYAN: 0x0c8599,
	TEAL: 0x099268,
	GREEN: 0x2f9e44,
	LIME: 0x66a80f,
	YELLOW: 0xfcc419,
	ORANGE: 0xe8590c,
} as const;
