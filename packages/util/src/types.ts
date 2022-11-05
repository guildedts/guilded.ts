/**
 * A conditional type.
 * @example
 * type NotNull = If<true, string>; // string
 * type Null = If<false, string>; // null
 * type Optional = If<boolean, string>; // string | null
 */
export type If<T extends boolean, A, B = null> = T extends true ? A : T extends false ? B : A | B;
