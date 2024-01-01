declare global {
  interface ObjectConstructor {
		// Object.entriesのkeyがstringに限定されるのを防ぐ
    entries<K, T>(
      o: {
        [k in K]: T;
      }
    ): (K extends number ? [string, T] : [K, T])[];
    entries<K, T>(o: Record<K, T>): (K extends number ? [string, T] : [K, T])[];
    entries<T>(o: ArrayLike<T>): [string, T][];

    fromEntries<K, T>(entries: Iterable<readonly [K, T]>): { [k in K]: T };
  }
}