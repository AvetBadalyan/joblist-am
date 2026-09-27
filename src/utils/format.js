// Shared display formatters.

// Armenian Dram, no decimals. Intl outputs the ֏ symbol, e.g. "1,500,000 ֏".
const amd = new Intl.NumberFormat("hy-AM", {
  style: "currency",
  currency: "AMD",
  maximumFractionDigits: 0,
});

/**
 * Format a salary range for display in AMD.
 * @param {number|null|undefined} salaryMin
 * @param {number|null|undefined} salaryMax
 * @returns {string|null} Formatted range, or null when no salary is set.
 */
export const formatSalary = (salaryMin, salaryMax) => {
  if (!salaryMin && !salaryMax) return null;
  if (salaryMin && salaryMax) return `${amd.format(salaryMin)} - ${amd.format(salaryMax)}`;
  if (salaryMin) return `From ${amd.format(salaryMin)}`;
  return `Up to ${amd.format(salaryMax)}`;
};
