import { useCallback, useMemo, useRef, useState } from 'react';
import { addDays, addMinutes, format, startOfWeek } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import type { TeacherAvailability } from '@/types';

type Slot = { date: string; time: string };

interface TeacherSchedulerProps {
  weekStart: Date;
  setWeekStart: (d: Date) => void;
  teacherId: string;
  availability: TeacherAvailability[];
  onAddSlots: (slots: Slot[], repeatWeeks: number) => void;
  onToggleOrDeleteSlot: (date: string, time: string) => void;
}

const HOURS = Array.from({ length: 14 }, (_, i) => 6 + i); // 06:00 - 19:00
const DAYS = [0, 1, 2, 3, 4, 5, 6];

export function TeacherScheduler({
  weekStart,
  setWeekStart,
  teacherId,
  availability,
  onAddSlots,
  onToggleOrDeleteSlot
}: TeacherSchedulerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const didMoveRef = useRef<boolean>(false);
  const [dragStart, setDragStart] = useState<{ dayIdx: number; minutes: number } | null>(null);
  const [dragEnd, setDragEnd] = useState<{ dayIdx: number; minutes: number } | null>(null);
  const [repeatWeeks, setRepeatWeeks] = useState<number>(1);

  const weekDays = useMemo(() => DAYS.map((d) => addDays(startOfWeek(weekStart, { weekStartsOn: 1 }), d)), [weekStart]);

  const findDayAvailability = useCallback(
    (dateStr: string) => availability.find((a) => a.teacherId === teacherId && a.date === dateStr),
    [availability, teacherId]
  );

  const getDateStr = (date: Date) => format(date, 'yyyy-MM-dd');
  const toHHMM = (m: number) => {
    const hh = Math.floor(m / 60);
    const mm = m % 60;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(hh)}:${pad(mm)}`;
  };

  const snapTo15 = (mins: number, mode: 'round' | 'floor' | 'ceil' = 'round') => {
    const q = mins / 15;
    if (mode === 'floor') return Math.floor(q) * 15;
    if (mode === 'ceil') return Math.ceil(q) * 15;
    return Math.round(q) * 15;
  };

  const handleGridMouseDown = (dayIdx: number, yPct: number) => {
    const minutes = snapTo15(yPct * 60 * HOURS.length, 'round');
    setDragStart({ dayIdx, minutes });
    setDragEnd({ dayIdx, minutes });
    didMoveRef.current = false;
  };

  const handleGridMouseMove = (dayIdx: number, yPct: number, isPrimaryDown?: boolean) => {
    if (!dragStart) return;
    if (isPrimaryDown === false) return;
    if (dayIdx !== dragStart.dayIdx) return; // stay within same column
    const minutes = snapTo15(yPct * 60 * HOURS.length, 'round');
    setDragEnd({ dayIdx, minutes });
    didMoveRef.current = true;
  };

  const handleMouseUp = () => {
    if (!dragStart || !dragEnd) {
      setDragStart(null);
      setDragEnd(null);
      return;
    }
    const dayIdx = dragStart.dayIdx;
    const startM = Math.min(dragStart.minutes, dragEnd.minutes);
    const endM = Math.max(dragStart.minutes, dragEnd.minutes);
    const clampedStart = Math.max(0, startM);
    const clampedEnd = Math.min(HOURS.length * 60, endM);
    const startAligned = snapTo15(clampedStart, 'round');
    const endAligned = snapTo15(clampedEnd, 'round');
    
    const slots: Slot[] = [];
    const baseDate = weekDays[dayIdx];
    
    // If it's a click (no drag), create a single slot at that time
    if (startAligned === endAligned || !didMoveRef.current) {
      slots.push({ date: getDateStr(baseDate), time: toHHMM(6 * 60 + startAligned) });
    } else {
      // If dragged, create slots every 15 minutes in the selected range
      for (let m = startAligned; m <= endAligned; m += 15) {
        slots.push({ date: getDateStr(baseDate), time: toHHMM(6 * 60 + m) });
      }
    }
    
    if (slots.length > 0) {
      onAddSlots(slots, repeatWeeks);
    }
    setDragStart(null);
    setDragEnd(null);
    didMoveRef.current = false;
  };

  const renderExistingSlots = (date: Date, rowIdx: number) => {
    const dateStr = getDateStr(date);
    const dayAvail = findDayAvailability(dateStr);
    if (!dayAvail) return null;
    const rowStartM = rowIdx * 60; // minutes from 06:00
    const rowEndM = (rowIdx + 1) * 60;
    return dayAvail.timeSlots.filter((slot) => {
      const [hh, mm] = slot.time.split(':').map(Number);
      const minutesFrom6 = hh * 60 + mm - 6 * 60;
      return minutesFrom6 >= rowStartM && minutesFrom6 < rowEndM;
    }).map((slot) => {
      const [hh, mm] = slot.time.split(':').map(Number);
      const minutesFrom6 = hh * 60 + mm - 6 * 60;
      const offsetWithinRow = minutesFrom6 - rowStartM;
      const topPct = (offsetWithinRow / 60) * 100; // position inside this hour row
      return (
        <div
          key={slot.time}
          className="absolute left-1 right-1 rounded-md h-6 flex items-center border bg-primary/90 text-primary-foreground shadow-sm"
          style={{ top: `${topPct}%` }}
        >
          <div className="w-full px-2 flex items-center justify-between gap-2 text-[10px] md:text-xs">
            <span className="font-medium tracking-tight">{slot.time}</span>
            {slot.available ? (
              <span className="inline-flex items-center rounded-sm bg-background/20 px-1.5 py-0.5">Available</span>
            ) : (
              <span className="inline-flex items-center rounded-sm bg-background/30 px-1.5 py-0.5">Booked</span>
            )}
            {slot.available && (
              <Button size="icon" variant="ghost" className="h-5 w-5 text-primary-foreground/90" onClick={() => onToggleOrDeleteSlot(dateStr, slot.time)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      );
    });
  };

  // Selection overlay removed for now due to layout inconsistencies across browsers

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base md:text-lg">Weekly availability</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setWeekStart(addDays(weekStart, -7))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium w-40 text-center">
            {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
          </div>
          <Button variant="outline" size="icon" onClick={() => setWeekStart(addDays(weekStart, 7))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Repeat weeks</span>
            <Input
              type="number"
              min={1}
              max={12}
              value={repeatWeeks}
              onChange={(e) => setRepeatWeeks(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
              className="w-20 h-8"
            />
          </div>
          <div className="text-xs text-muted-foreground">Select a time range to add available slots.</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto" ref={containerRef}>
          <div className="grid" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
            <div />
            {weekDays.map((d) => (
              <div key={getDateStr(d)} className="px-2 py-2 text-center text-xs md:text-sm font-medium">
                {format(d, 'EEE dd')}
              </div>
            ))}
            {HOURS.map((h, rowIdx) => (
              <>
                <div key={`label-${h}`} className="relative h-16 border-b pr-2 text-right text-xs md:text-sm text-muted-foreground">
                  {`${h}:00`}
                </div>
                {weekDays.map((d, dayIdx) => (
                  <div
                    key={`${getDateStr(d)}-${h}`}
                    className="relative h-16 border-b border-l cursor-crosshair hover:bg-muted/30"
                    onMouseDown={(e) => {
                      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                      const localPct = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
                      const yPct = (rowIdx + localPct) / HOURS.length; // proportion of whole day
                      handleGridMouseDown(dayIdx, yPct);
                    }}
                    onMouseMove={(e) => {
                      if (!dragStart) return;
                      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                      const localPct = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
                      const yPct = (rowIdx + localPct) / HOURS.length; // proportion of whole day
                      handleGridMouseMove(dayIdx, yPct, e.buttons === 1);
                    }}
                    onMouseUp={handleMouseUp}
                  >
                {renderExistingSlots(d, rowIdx)}
                  </div>
                ))}
              </>
            ))}
          </div>
          {/* selection overlay intentionally omitted */}
        </div>
      </CardContent>
    </Card>
  );
}

export default TeacherScheduler;

