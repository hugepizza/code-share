"use client";

import { timeDifference } from "@/utils/date";

export default function ClientTime({ time }: { time: Date }) {
  return <>{`${timeDifference(time)[0]} ${timeDifference(time)[1]} ago`}</>;
}
