// Persian date formatting utilities

const persianMonths = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

const persianWeekdays = [
  "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"
];

// Convert English digits to Persian digits
export function toPersianDigits(str: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.toString().replace(/[0-9]/g, (match) => persianDigits[parseInt(match)]);
}

// Simple Gregorian to Persian date conversion (approximate)
export function formatPersianDate(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  
  // Simple approximation - Persian year starts around March 21
  // This is a simplified calculation for demo purposes
  let persianYear = year - 621;
  let persianMonth = month - 2; // March is month 0 in Persian calendar
  let persianDay = day;
  
  if (persianMonth < 0) {
    persianMonth += 12;
    persianYear -= 1;
  }
  
  // Ensure we don't go out of bounds
  if (persianMonth >= 12) {
    persianMonth = 11;
  }
  
  return `${toPersianDigits(persianDay)} ${persianMonths[persianMonth]} ${toPersianDigits(persianYear)}`;
}

// Format time in Persian
export function formatPersianTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${toPersianDigits(hours)}:${toPersianDigits(minutes.toString().padStart(2, '0'))}`;
}

// Get Persian weekday
export function getPersianWeekday(date: Date): string {
  return persianWeekdays[date.getDay()];
}

// Format full Persian date and time
export function formatFullPersianDateTime(date: Date): string {
  const persianDate = formatPersianDate(date);
  const persianTime = formatPersianTime(date);
  const weekday = getPersianWeekday(date);
  
  return `${weekday}، ${persianDate} ساعت ${persianTime}`;
}
