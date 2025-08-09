// Global utility types that should be available in all TypeScript projects

declare global {
	/**
	 * Utility type to make specific keys of an object required
	 * @example RequireKeys<{ a?: string; b?: number; c: boolean }, 'a' | 'b'>
	 * // Result: { a: string; b: number; c: boolean }
	 */
	type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

	/**
	 * Utility type to make specific keys of an object optional
	 * @example MakeOptional<{ a: string; b: number; c: boolean }, 'a' | 'b'>
	 * // Result: { a?: string; b?: number; c: boolean }
	 */
	type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

	/**
	 * Utility type for deep partial - makes all properties optional recursively
	 */
	type DeepPartial<T> = {
		[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
	};

	/**
	 * Utility type for extracting the value type from an array
	 * @example ArrayElement<string[]> // Result: string
	 */
	type ArrayElement<T> = T extends (infer U)[] ? U : never;

	/**
	 * Utility type for creating a union of object values
	 * @example ValueOf<{ a: string; b: number }> // Result: string | number
	 */
	type ValueOf<T> = T[keyof T];

	/**
	 * Utility type for branded/nominal types
	 * @example type UserId = Brand<string, 'UserId'>
	 */
	type Brand<T, U> = T & { __brand: U };

	/**
	 * Utility function for filtering out falsy values with proper type narrowing
	 * @example [1, 2, undefined].filter(isTruthy) // number[]
	 */
	var isTruthy: <T>(value: T) => value is NonNullable<T>;

	/**
	 * Environment variables that should be available globally
	 */
	namespace NodeJS {
		interface ProcessEnv {
			readonly NODE_ENV: 'development' | 'production' | 'test';
			readonly VITE_API_BASE_URL?: string;
			readonly VITE_TMDB_API_KEY?: string;
		}
	}
}

export {};
