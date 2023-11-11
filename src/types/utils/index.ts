export * from './api';

/**
 * Convert a type to a string path
 * @example PathToStringProps<{a: {b: {c: string}}, d: {e: string}}> = ["a", "b", "c"] | ["d", "e"]
 */
export type PathsToStringProps<T> = T extends string
  ? []
  : T extends number
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

/**
 * Join a string path and a delimiter to get flatten type
 * @example Join<["a", "b", "c"], "."> = "a.b.c"
 */
export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;
