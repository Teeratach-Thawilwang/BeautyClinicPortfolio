type TimeRange = {start: string; end: string}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, '0')
  const m = (mins % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

export function isOverlap(slot: TimeRange, ranges: TimeRange[]): boolean {
  const start = timeToMinutes(slot.start)
  const end = timeToMinutes(slot.end)
  return ranges.some(r => {
    const rStart = timeToMinutes(r.start)
    const rEnd = timeToMinutes(r.end)
    return start < rEnd && end > rStart
  })
}

export function countOverlap(slot: TimeRange, ranges: TimeRange[]): number {
  const start = timeToMinutes(slot.start)
  const end = timeToMinutes(slot.end)
  return ranges.filter(r => {
    const rStart = timeToMinutes(r.start)
    const rEnd = timeToMinutes(r.end)
    return start < rEnd && end > rStart
  }).length
}

export function generateSlots(
  durationHr: number,
  workingTime: TimeRange[],
  booking: TimeRange[],
  backoutPeriod: TimeRange[],
  bookingLimit: number,
): TimeRange[] {
  const slots: TimeRange[] = []
  const durationMin = durationHr * 60

  for (const work of workingTime) {
    let current = timeToMinutes(work.start)
    const end = timeToMinutes(work.end)

    while (current + durationMin <= end) {
      const slot: TimeRange = {
        start: minutesToTime(current),
        end: minutesToTime(current + durationMin),
      }

      const hasConflict =
        isOverlap(slot, booking) && countOverlap(slot, booking) >= bookingLimit
      const hasBackout = isOverlap(slot, backoutPeriod)

      if (!hasConflict && !hasBackout) {
        slots.push(slot)
      }

      current += durationMin
    }
  }

  return slots
}
