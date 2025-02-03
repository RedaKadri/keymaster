export function formatSecondsToHMS(seconds: number | undefined) {
  if (!seconds) return "invalid input";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = remainingSeconds.toString().padStart(2, "0");

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}
