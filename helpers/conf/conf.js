/**
 * Return retry conf.
 *
 * @param times
 *   Retries count.
 *
 * @returns {{retries: {openMode: 1, runMode: 1}}}
 */
export function retry(times = 1) {
  return {
    retries: {
      runMode: times,
      openMode: times,
    }
  };
};
