import type { DayOfWeek } from "../../generated/prisma";

// ponytail: no Service catalog in the schema yet, so a booking is a fixed
// 30-minute slot; the price is agreed out of band once the barber accepts.
export const APPOINTMENT_DURATION_MINUTES = 30;
export const SLOT_STEP_MINUTES = 30;

// Barbers' opening hours are wall-clock times in Tunisia. The server may run
// in any timezone (UTC on most hosts), so day/minute maths always goes
// through this zone instead of the machine's local one.
const TUNIS_TZ = "Africa/Tunis";

const tunisFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TUNIS_TZ,
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Calendar day ("YYYY-MM-DD"), weekday and minutes-since-midnight in Tunis. */
export function tunisParts(date: Date) {
  const p = Object.fromEntries(
    tunisFormat.formatToParts(date).map((x) => [x.type, x.value]),
  );
  return {
    day: `${p.year}-${p.month}-${p.day}`,
    weekday: p.weekday!.toUpperCase() as DayOfWeek,
    minutes: Number(p.hour) * 60 + Number(p.minute),
  };
}
