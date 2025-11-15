/* eslint-disable @typescript-eslint/no-magic-numbers */

const KILOBYTE = 1024 as const;
const MEGABYTE = 1024 * KILOBYTE;

export const MAX_FILE_SIZE_BYTES = 10 * MEGABYTE;
export const RANDOM_SUFFIX_LIMIT = 1_000_000_000;

