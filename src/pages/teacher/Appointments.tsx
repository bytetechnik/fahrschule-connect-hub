import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  getAppointments, 
  mockStudents, 
  getDrivingLessonTicketsForStudent,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
  completeAppointment
} from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { format, isToday, isTomorrow, isYesterday, startOfDay, parseISO, compareAsc, startOfMonth, endOfMonth } from 'date-fns';
import { Plus, Edit, Trash2, X, Save, CheckCircle2, Search, Calendar as CalendarIcon, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import type { Appointment } from '@/types';

const TeacherAppointments = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(getAppointments());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [cancellingAppointment, setCancellingAppointment] = useState<Appointment | null>(null);
  
  // Form state for create
  const [formData, setFormData] = useState({
    studentId: '',
    date: '',
    time: '',
    duration: 45,
  });
  
  // Form state for edit
  const [editFormData, setEditFormData] = useState({
    date: '',
    time: '',
    duration: 45,
  });
  
  const [cancelReason, setCancelReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const myStudents = mockStudents.filter(s => s.teacherId === user?.id);
  const myAppointments = appointments.filter(a => a.teacherId === user?.id);

  // Monthly statistics
  const monthlyStats = useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const monthAppointments = myAppointments.filter(apt => {
      const aptDate = parseISO(apt.date);
      return aptDate >= monthStart && aptDate <= monthEnd;
    });

    return {
      scheduled: monthAppointments.filter(a => a.status === 'scheduled').length,
      completed: monthAppointments.filter(a => a.status === 'completed').length,
      cancelled: monthAppointments.filter(a => a.status === 'cancelled').length,
      total: monthAppointments.length,
    };
  }, [myAppointments]);

  // Get dates with appointments for calendar highlighting
  const datesWithAppointments = useMemo(() => {
    return myAppointments.map(a => new Date(a.date));
  }, [myAppointments]);

  // Filter by selected calendar date if set
  const filteredAppointments = useMemo(() => {
    let filtered = myAppointments;

    // Apply calendar date filter
    if (selectedCalendarDate) {
      const selectedDateStr = format(selectedCalendarDate, 'yyyy-MM-dd');
      filtered = filtered.filter(a => a.date === selectedDateStr);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(appointment => {
        const student = mockStudents.find(s => s.id === appointment.studentId);
        const searchLower = searchQuery.toLowerCase();
        return (
          student?.name.toLowerCase().includes(searchLower) ||
          appointment.date.includes(searchQuery) ||
          appointment.time.includes(searchQuery)
        );
      });
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    return filtered;
  }, [myAppointments, selectedCalendarDate, searchQuery, statusFilter, mockStudents]);

  // Group appointments by date and filter
  const groupedAppointments = useMemo(() => {
    // Use already filtered appointments
    const filtered = filteredAppointments;

    // Group by date
    const grouped: Record<string, Appointment[]> = {};
    filtered.forEach(appointment => {
      const dateKey = appointment.date;
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(appointment);
    });

    // Sort appointments within each date group by time
    Object.keys(grouped).forEach(dateKey => {
      grouped[dateKey].sort((a, b) => a.time.localeCompare(b.time));
    });

    // Sort dates: today first, then upcoming (future), then past
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      const dateA = parseISO(a);
      const dateB = parseISO(b);
      const today = startOfDay(new Date());
      
      const isAToday = isToday(dateA);
      const isBToday = isToday(dateB);
      const isAFuture = dateA > today;
      const isBFuture = dateB > today;
      
      // Today always comes first
      if (isAToday && !isBToday) return -1;
      if (!isAToday && isBToday) return 1;
      
      // Both are today - same position
      if (isAToday && isBToday) return 0;
      
      // Future dates come before past dates
      if (isAFuture && !isBFuture) return -1;
      if (!isAFuture && isBFuture) return 1;
      
      // Both future or both past - sort chronologically
      // Future: ascending (earliest first)
      // Past: descending (most recent first)
      if (isAFuture && isBFuture) {
        return compareAsc(dateA, dateB);
      } else {
        return compareAsc(dateB, dateA); // Reverse for past dates
      }
    });

    return { grouped, sortedDates };
  }, [filteredAppointments]);

  // Get default open value (today's date)
  const defaultOpenDate = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return groupedAppointments.sortedDates.includes(today) ? today : undefined;
  }, [groupedAppointments.sortedDates]);

  const getDateLabel = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) {
      return `${format(date, 'EEEE, MMMM d, yyyy')} (${t('today')})`;
    }
    if (isTomorrow(date)) {
      return `${format(date, 'EEEE, MMMM d, yyyy')} (${t('tomorrow')})`;
    }
    if (isYesterday(date)) {
      return `${format(date, 'EEEE, MMMM d, yyyy')} (${t('yesterday')})`;
    }
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  const handleCreate = () => {
    if (!user || !formData.studentId || !formData.date || !formData.time) {
      toast({
        title: t('error'),
        description: t('pleaseFillFields'),
        variant: 'destructive'
      });
      return;
    }

    const result = createAppointment(
      user.id,
      formData.studentId,
      formData.date,
      formData.time,
      formData.duration
    );

    if (result.success) {
      setAppointments(getAppointments());
      setIsCreateDialogOpen(false);
      setFormData({ studentId: '', date: '', time: '', duration: 45 });
      toast({
        title: t('success'),
        description: t('appointmentCreated')
      });
    } else {
      toast({
        title: t('error'),
        description: result.error,
        variant: 'destructive'
      });
    }
  };

  const handleEdit = () => {
    if (!editingAppointment) return;

    const updates: { date?: string; time?: string; duration?: number } = {};
    if (editFormData.date) updates.date = editFormData.date;
    if (editFormData.time) updates.time = editFormData.time;
    if (editFormData.duration) updates.duration = editFormData.duration;

    const result = updateAppointment(editingAppointment.id, updates);

    if (result.success) {
      setAppointments(getAppointments());
      setIsEditDialogOpen(false);
      setEditingAppointment(null);
      toast({
        title: t('success'),
        description: t('appointmentUpdated')
      });
    } else {
      toast({
        title: t('error'),
        description: result.error,
        variant: 'destructive'
      });
    }
  };

  const handleCancel = () => {
    if (!cancellingAppointment) return;

    if (!cancelReason.trim()) {
      toast({
        title: t('error'),
        description: t('cancelReason') + ' ' + t('isRequired'),
        variant: 'destructive'
      });
      return;
    }

    const result = cancelAppointment(cancellingAppointment.id, 'teacher', cancelReason);

    if (result.success) {
      setAppointments(getAppointments());
      setIsCancelDialogOpen(false);
      setCancellingAppointment(null);
      setCancelReason('');
      toast({
        title: t('success'),
        description: t('appointmentCancelled')
      });
    } else {
      toast({
        title: t('error'),
        description: result.error,
        variant: 'destructive'
      });
    }
  };

  const handleDelete = (appointmentId: string) => {
    if (!confirm(t('confirmDelete'))) {
      return;
    }

    const result = deleteAppointment(appointmentId);

    if (result.success) {
      setAppointments(getAppointments());
      toast({
        title: t('success'),
        description: t('appointmentDeleted')
      });
    } else {
      toast({
        title: t('error'),
        description: result.error,
        variant: 'destructive'
      });
    }
  };

  const handleApprove = (appointmentId: string) => {
    if (!confirm(t('confirmCompletion'))) {
      return;
    }

    const result = completeAppointment(appointmentId);

    if (result.success) {
      setAppointments(getAppointments());
      toast({
        title: t('success'),
        description: t('appointmentCompleted')
      });
    } else {
      toast({
        title: t('error'),
        description: result.error,
        variant: 'destructive'
      });
    }
  };

  const openEditDialog = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setEditFormData({
      date: appointment.date,
      time: appointment.time,
      duration: appointment.duration,
    });
    setIsEditDialogOpen(true);
  };

  const openCancelDialog = (appointment: Appointment) => {
    setCancellingAppointment(appointment);
    setCancelReason('');
    setIsCancelDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="default">{t('scheduled')}</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">{t('cancelled')}</Badge>;
      case 'completed':
        return <Badge variant="secondary">{t('completed')}</Badge>;
      default:
        return <Badge>{t(status)}</Badge>;
    }
  };

  const calculateEndTime = (time: string, duration: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{t('appointments')}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">{t('manageAppointments')}</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                {t('createAppointment')}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-[425px] mx-4">
              <DialogHeader>
                <DialogTitle>{t('createAppointment')}</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  {t('willUseTickets').replace('{count}', Math.ceil(formData.duration / 45).toString())}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="student">{t('student')} *</Label>
                  <Select
                    value={formData.studentId}
                    onValueChange={(value) => setFormData({ ...formData, studentId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectStudent')} />
                    </SelectTrigger>
                    <SelectContent>
                      {myStudents.map((student) => {
                        const tickets = getDrivingLessonTicketsForStudent(student.id);
                        return (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} ({tickets} {t('tickets')} {t('available')})
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">{t('date')} *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">{t('startTime')} *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">{t('durationMinutes')} *</Label>
                  <Select
                    value={formData.duration.toString()}
                    onValueChange={(value) => setFormData({ ...formData, duration: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="45">45 {t('minutes')} (1 {t('tickets')})</SelectItem>
                      <SelectItem value="90">90 {t('minutes')} (2 {t('tickets')})</SelectItem>
                      <SelectItem value="135">135 {t('minutes')} (3 {t('tickets')})</SelectItem>
                      <SelectItem value="180">180 {t('minutes')} (4 {t('tickets')})</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {t('willUseTickets').replace('{count}', Math.ceil(formData.duration / 45).toString())}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  {t('cancelBtn')}
                </Button>
                <Button onClick={handleCreate}>{t('create')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Monthly Statistics and Calendar Button */}
        <Card>
          <CardContent className="py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              {/* Monthly Statistics - Compact Row */}
              <div className="flex flex-1 items-center justify-between sm:justify-start gap-3 sm:gap-4 md:gap-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground truncate">{t('scheduled')}</div>
                    <div className="text-base sm:text-lg font-bold">{monthlyStats.scheduled}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground truncate">{t('completed')}</div>
                    <div className="text-base sm:text-lg font-bold">{monthlyStats.completed}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground truncate">{t('cancelled')}</div>
                    <div className="text-base sm:text-lg font-bold">{monthlyStats.cancelled}</div>
                  </div>
                </div>
              </div>

              {/* Calendar Button and Clear Button */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="default" className="w-full sm:w-auto flex-1 sm:flex-initial">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {t('calendar')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-[425px] mx-4">
                  <DialogHeader>
                    <DialogTitle>{t('calendar')}</DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm">
                      {selectedCalendarDate 
                        ? `${t('selectedDate')}: ${format(selectedCalendarDate, 'PPP')}`
                        : t('selectDateToView') || 'Select a date to view appointments'
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-2 sm:py-4">
                    <CalendarComponent
                      mode="single"
                      selected={selectedCalendarDate}
                      onSelect={(date) => {
                        setSelectedCalendarDate(date);
                        setIsCalendarOpen(false);
                      }}
                      className="rounded-md border pointer-events-auto"
                      modifiers={{
                        hasAppointments: datesWithAppointments
                      }}
                      modifiersClassNames={{
                        hasAppointments: 'bg-primary/20 font-bold'
                      }}
                    />
                    <div className="mt-3 sm:mt-4 text-xs text-muted-foreground text-center">
                      {t('datesWithAppointments')}
                    </div>
                    {selectedCalendarDate && (
                      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="text-xs sm:text-sm flex-1 min-w-0">
                          <span className="font-medium">{t('selectedDate')}:</span>{' '}
                          <span className="break-words">{format(selectedCalendarDate, 'PPP')}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => {
                            setSelectedCalendarDate(undefined);
                            setIsCalendarOpen(false);
                          }}
                        >
                          {t('clear')}
                        </Button>
                      </div>
                    )}
                  </div>
                </DialogContent>
                </Dialog>
                {selectedCalendarDate && (
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={() => setSelectedCalendarDate(undefined)}
                    className="w-full sm:w-auto flex-1 sm:flex-initial"
                  >
                    <X className="h-4 w-4 mr-2" />
                    {t('clear')}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('searchAppointments')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t('filterByStatus')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allStatuses')}</SelectItem>
                  <SelectItem value="scheduled">{t('scheduled')}</SelectItem>
                  <SelectItem value="completed">{t('completed')}</SelectItem>
                  <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Grouped by Date */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 && myAppointments.length > 0 && selectedCalendarDate ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                {t('noAppointmentsOnDate') || `No appointments on ${format(selectedCalendarDate, 'PPP')}`}
              </CardContent>
            </Card>
          ) : myAppointments.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                {t('createFirstAppointment')}
              </CardContent>
            </Card>
          ) : groupedAppointments.sortedDates.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                {t('noAppointmentsFoundFilter')}
              </CardContent>
            </Card>
          ) : (
            <Accordion
              type="single"
              collapsible
              defaultValue={defaultOpenDate}
              className="space-y-4"
            >
              {groupedAppointments.sortedDates.map((dateKey) => {
                const dateAppointments = groupedAppointments.grouped[dateKey];
                const appointmentCount = dateAppointments.length;
                const dateObj = parseISO(dateKey);
                const isTodayDate = isToday(dateObj);

                return (
                  <AccordionItem
                    key={dateKey}
                    value={dateKey}
                    className="border rounded-lg px-4 bg-card"
                  >
                    <AccordionTrigger className="hover:no-underline px-2 sm:px-0">
                      <div className="flex items-center justify-between w-full pr-2 sm:pr-4">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                          <div className="text-left min-w-0 flex-1">
                            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                              <span className="font-semibold text-sm sm:text-lg truncate">
                                {getDateLabel(dateKey)}
                              </span>
                              {isTodayDate && (
                                <Badge variant="default" className="bg-primary text-xs flex-shrink-0">
                                  {t('today')}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {appointmentCount} {appointmentCount === 1 ? t('appointment') : t('appointments')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        {dateAppointments.map((appointment) => {
                          const student = mockStudents.find(s => s.id === appointment.studentId);
                          const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
                          const isPast = appointmentDateTime < new Date();
                          
                          return (
                            <Card key={appointment.id} className={isTodayDate && !isPast ? 'border-l-4 border-l-primary' : ''}>
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between gap-2">
                                  <CardTitle className="text-base sm:text-lg truncate flex-1 min-w-0">{student?.name || t('unknownStudent')}</CardTitle>
                                  <div className="flex-shrink-0">
                                    {getStatusBadge(appointment.status)}
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                                    <div>
                                      <span className="text-muted-foreground">{t('time')}:</span>
                                      <p className="font-medium">
                                        {appointment.time} - {calculateEndTime(appointment.time, appointment.duration)}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">{t('duration')}:</span>
                                      <p className="font-medium">{appointment.duration} {t('minutes')}</p>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">{t('ticketsUsed')}:</span>
                                      <p className="font-medium">{appointment.ticketsUsed}</p>
                                    </div>
                                  </div>
                                  
                                  {appointment.status === 'cancelled' && appointment.cancelReason && (
                                    <div className="p-3 bg-destructive/10 rounded-md">
                                      <p className="text-sm font-medium">{t('cancellationReason')}:</p>
                                      <p className="text-sm text-muted-foreground">{appointment.cancelReason}</p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {t('cancelledBy')}: {appointment.cancelledBy === 'teacher' ? t('teacher') : t('student')}
                                      </p>
                                    </div>
                                  )}

                                  {appointment.status === 'scheduled' && !isPast && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openEditDialog(appointment)}
                                      >
                                        <Edit className="h-4 w-4 mr-2" />
                                        {t('edit')}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openCancelDialog(appointment)}
                                      >
                                        <X className="h-4 w-4 mr-2" />
                                        {t('cancel')}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(appointment.id)}
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        {t('delete')}
                                      </Button>
                                    </div>
                                  )}

                                  {appointment.status === 'scheduled' && (
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 pt-2 border-t">
                                      <Button
                                        size="sm"
                                        variant="default"
                                        className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                                        onClick={() => handleApprove(appointment.id)}
                                      >
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        {t('markAsCompleted')}
                                      </Button>
                                      <p className="text-xs text-muted-foreground flex items-center sm:ml-2">
                                        {t('cannotUndoApproval')}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="w-[95vw] max-w-[425px] mx-4">
            <DialogHeader>
              <DialogTitle>{t('editAppointment')}</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                {t('updateAppointmentDetails')}
              </DialogDescription>
            </DialogHeader>
            {editingAppointment && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">{t('date')}</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editFormData.date}
                    onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">{t('startTime')}</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={editFormData.time}
                    onChange={(e) => setEditFormData({ ...editFormData, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">{t('durationMinutes')}</Label>
                  <Select
                    value={editFormData.duration.toString()}
                    onValueChange={(value) => setEditFormData({ ...editFormData, duration: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="45">45 {t('minutes')} (1 {t('tickets')})</SelectItem>
                      <SelectItem value="90">90 {t('minutes')} (2 {t('tickets')})</SelectItem>
                      <SelectItem value="135">135 {t('minutes')} (3 {t('tickets')})</SelectItem>
                      <SelectItem value="180">180 {t('minutes')} (4 {t('tickets')})</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {t('willUseTickets').replace('{count}', Math.ceil(editFormData.duration / 45).toString())}
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                {t('cancelBtn')}
              </Button>
              <Button onClick={handleEdit}>
                <Save className="h-4 w-4 mr-2" />
                {t('save')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Dialog */}
        <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
          <DialogContent className="w-[95vw] max-w-[425px] mx-4">
            <DialogHeader>
              <DialogTitle>{t('cancelAppointment')}</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                {t('cancelAppointmentDescription')}
              </DialogDescription>
            </DialogHeader>
            {cancellingAppointment && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cancel-reason">{t('cancelReasonRequired')}</Label>
                  <Textarea
                    id="cancel-reason"
                    placeholder={t('cancelReasonPlaceholder')}
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
                {t('cancelBtn')}
              </Button>
              <Button variant="destructive" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                {t('cancelAppointment')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default TeacherAppointments;