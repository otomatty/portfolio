/**
 * Calculate the experience period from a start date.
 * Returns a string like "X年Yヶ月" or "Yヶ月", or null if invalid.
 */
export const calculateExperiencePeriod = (
  startDateString: string | undefined | null
): string | null => {
  if (!startDateString) {
    return null;
  }

  const startDate = new Date(startDateString);
  const today = new Date();

  if (Number.isNaN(startDate.getTime()) || startDate > today) {
    console.error('Invalid start date:', startDateString);
    return null;
  }

  const years = today.getFullYear() - startDate.getFullYear();
  const months = today.getMonth() - startDate.getMonth();
  const days = today.getDate() - startDate.getDate();

  let totalMonths = years * 12 + months;
  if (days < 0) {
    totalMonths--;
  }

  if (totalMonths < 0) {
    return null;
  }

  const experienceYears = Math.floor(totalMonths / 12);
  const experienceMonths = totalMonths % 12;

  if (experienceYears > 0 && experienceMonths > 0) {
    return `${experienceYears}年${experienceMonths}ヶ月`;
  }
  if (experienceYears > 0 && experienceMonths === 0) {
    return `${experienceYears}年`;
  }
  if (experienceYears === 0 && experienceMonths > 0) {
    return `${experienceMonths}ヶ月`;
  }

  return null;
};

/**
 * Calculate the number of months since a start date.
 * Returns 0 for invalid or future dates.
 */
export const calculateExperienceMonths = (
  startDateString: string | undefined | null
): number => {
  if (!startDateString) {
    return 0;
  }

  const startDate = new Date(startDateString);
  const today = new Date();

  if (Number.isNaN(startDate.getTime()) || startDate > today) {
    return 0;
  }

  const years = today.getFullYear() - startDate.getFullYear();
  const months = today.getMonth() - startDate.getMonth();
  const days = today.getDate() - startDate.getDate();

  let totalMonths = years * 12 + months;
  if (days < 0) {
    totalMonths--;
  }

  return totalMonths < 0 ? 0 : totalMonths;
};
