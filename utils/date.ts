export function timeDifference(date: Date): [number, string] {
  const now = new Date().getTime();
  const past = date.getTime();
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return [diffInSeconds, "seconds"];
  } else if (diffInSeconds < 3600) {
    return [Math.floor(diffInSeconds / 60), "minutes"];
  } else if (diffInSeconds < 86400) {
    return [Math.floor(diffInSeconds / 3600), "hours"];
  } else {
    return [Math.floor(diffInSeconds / 86400), "days"];
  }
}
