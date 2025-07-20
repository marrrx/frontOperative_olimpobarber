import dayjs from "dayjs";

export const formatDate = (date: string) => {
  return dayjs(date).format("dddd DD [de] MMMM");
};

export function to12hCompact(time24: string): string {
  if (!time24 || time24.trim() === "") {
    return "";
  }

  const parts = time24.split(":");
  if (parts.length !== 2) {
    return "";
  }

  const [hourStr, minuteStr] = parts;
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (isNaN(hour) || isNaN(minute)) {
    return "";
  }

  const isPM = hour >= 12;
  let hour12 = hour;
  if (hour === 0) hour12 = 12;
  else if (hour > 12) hour12 = hour - 12;

  return `${hour12}:${minuteStr}${isPM ? " pm" : " am"}`;
}
