// export function to<T, U = Error>(
// 	promise: Promise<T>,
// 	errorExt?: object
// ): Promise<[U, undefined]>;

// export function to<T, U = Error>(
// 	promise: Promise<T>,
// 	errorExt?: object
// ): Promise<[null, T]>;

export async function to<T, U = Error>(
	promise: Promise<T>,
	errorExt?: object
): Promise<[U, undefined] | [null, T]> {
	try {
		const data = await promise;
		const result: [null, T] = [null, data];
		return result;
	} catch (err) {
		if (errorExt) {
			const parsedError = Object.assign({}, err, errorExt) as U;
			return [parsedError, undefined];
		}
		return [err as U, undefined];
	}
}

export default to;
