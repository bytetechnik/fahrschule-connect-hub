import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getPracticalLessonTopics, 
  getPracticalLessonRecordsByDate,
  getPracticalLessonRecordsByStudent,
  createPracticalLessonRecord,
  updatePracticalLessonRecord,
  deletePracticalLessonRecord,
  getStudents,
  PracticalLessonTopic,
  PracticalLessonRecord
} from '@/lib/mockData';
import { useState, useEffect, useMemo } from 'react';
import { Calendar, MessageSquare, Plus, Pencil, User, BookOpen, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

type ViewMode = 'date' | 'class';

const TeacherPracticalLessons = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('date');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [students] = useState(getStudents());
  const [topics] = useState<PracticalLessonTopic[]>(getPracticalLessonTopics());
  const [allRecords, setAllRecords] = useState<PracticalLessonRecord[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PracticalLessonRecord | null>(null);
  const [editingDate, setEditingDate] = useState<string | null>(null); // For date-wise editing
  const [deleteDate, setDeleteDate] = useState<string | null>(null); // For date-wise deletion
  const [topicPopoverOpen, setTopicPopoverOpen] = useState(false);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    studentId: '',
    topicId: '',
    comments: ''
  });

  const teacherStudents = students.filter(s => s.teacherId === user?.id);

  // Load records for selected student
  useEffect(() => {
    if (selectedStudentId && user?.id) {
      const studentRecords = getPracticalLessonRecordsByStudent(selectedStudentId);
      // Filter to only records created by this teacher
      const filteredRecords = studentRecords.filter(r => r.teacherId === user.id);
      setAllRecords(filteredRecords);
    } else {
      setAllRecords([]);
    }
  }, [selectedStudentId, user?.id]);

  // Group records by date for date-wise view
  const recordsByDate = useMemo(() => {
    const grouped: Record<string, PracticalLessonRecord[]> = {};
    allRecords.forEach(record => {
      if (!grouped[record.date]) {
        grouped[record.date] = [];
      }
      grouped[record.date].push(record);
    });
    // Sort dates in descending order (newest first)
    return Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).reduce((acc, date) => {
      acc[date] = grouped[date].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return acc;
    }, {} as Record<string, PracticalLessonRecord[]>);
  }, [allRecords]);

  // Group records by topic/class for class-wise view
  const recordsByClass = useMemo(() => {
    const grouped: Record<string, PracticalLessonRecord[]> = {};
    allRecords.forEach(record => {
      if (!grouped[record.topicId]) {
        grouped[record.topicId] = [];
      }
      grouped[record.topicId].push(record);
    });
    // Sort by most recent record date within each topic
    return Object.keys(grouped).reduce((acc, topicId) => {
      acc[topicId] = grouped[topicId].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return acc;
    }, {} as Record<string, PracticalLessonRecord[]>);
  }, [allRecords]);

  const handleAdd = () => {
    setEditingRecord(null);
    setEditingDate(null);
    setSelectedTopicIds([]);
    setFormData({
      studentId: selectedStudentId || '',
      topicId: '',
      comments: ''
    });
    setTopicPopoverOpen(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (record: PracticalLessonRecord) => {
    setEditingRecord(record);
    setEditingDate(null);
    setSelectedTopicIds([record.topicId]);
    setFormData({
      studentId: record.studentId,
      topicId: record.topicId,
      comments: record.comments || ''
    });
    setTopicPopoverOpen(false);
    setIsDialogOpen(true);
  };

  const handleEditDate = (date: string, dateRecords: PracticalLessonRecord[]) => {
    setEditingDate(date);
    setEditingRecord(null);
    setSelectedTopicIds([]);
    setFormData({
      studentId: dateRecords[0]?.studentId || selectedStudentId || '',
      topicId: '',
      comments: getDateComments(dateRecords)
    });
    setTopicPopoverOpen(false);
    setIsDialogOpen(true);
  };

  const handleDeleteDate = (date: string, dateRecords: PracticalLessonRecord[]) => {
    setDeleteDate(date);
  };

  const confirmDeleteDate = () => {
    if (!deleteDate) return;

    const dateRecords = recordsByDate[deleteDate] || [];
    
    // Delete all records for this date
    dateRecords.forEach(record => {
      deletePracticalLessonRecord(record.id);
    });

    toast({
      title: t('success'),
      description: t('lessonsDeletedSuccessfully')?.replace('{count}', dateRecords.length.toString()) || 
                   `${dateRecords.length} ${dateRecords.length === 1 ? t('lesson') : t('lessons')} ${t('deletedSuccessfully') || 'deleted successfully'}`,
    });

    // Refresh records after deleting
    if (selectedStudentId && user?.id) {
      const studentRecords = getPracticalLessonRecordsByStudent(selectedStudentId);
      const filteredRecords = studentRecords.filter(r => r.teacherId === user.id);
      setAllRecords(filteredRecords);
    }

    setDeleteDate(null);
  };

  const toggleTopicSelection = (topicId: string) => {
    setSelectedTopicIds(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubmit = () => {
    if (!formData.studentId) {
      toast({
        title: t('error'),
        description: t('pleaseSelectStudent'),
        variant: "destructive",
      });
      return;
    }

    if (editingDate) {
      // Editing all records for a date
      if (!user?.id) return;

      const dateRecords = recordsByDate[editingDate] || [];
      dateRecords.forEach(record => {
        updatePracticalLessonRecord(record.id, {
          comments: formData.comments || undefined
        });
      });

      toast({
        title: t('success'),
        description: t('lessonUpdatedSuccessfully'),
      });
    } else if (editingRecord) {
      // Editing single record
      if (!formData.topicId) {
        toast({
          title: t('error'),
          description: t('pleaseSelectTopic'),
          variant: "destructive",
        });
        return;
      }

      if (!user?.id) return;

      updatePracticalLessonRecord(editingRecord.id, {
        studentId: formData.studentId,
        topicId: formData.topicId,
        comments: formData.comments || undefined
      });
      toast({
        title: t('success'),
        description: t('lessonUpdatedSuccessfully'),
      });
    } else {
      // Creating multiple records
      if (selectedTopicIds.length === 0) {
        toast({
          title: t('error'),
          description: t('pleaseSelectAtLeastOneTopic'),
          variant: "destructive",
        });
        return;
      }

      if (!user?.id) return;

      // Create a record for each selected topic
      selectedTopicIds.forEach(topicId => {
        createPracticalLessonRecord({
          teacherId: user.id,
          studentId: formData.studentId,
          topicId: topicId,
          date: selectedDate,
          comments: formData.comments || undefined
        });
      });

      toast({
        title: t('success'),
        description: t('lessonsCreatedSuccessfully').replace('{count}', selectedTopicIds.length.toString()),
      });
    }

    // Refresh records after creating/updating
    if (selectedStudentId && user?.id) {
      const studentRecords = getPracticalLessonRecordsByStudent(selectedStudentId);
      const filteredRecords = studentRecords.filter(r => r.teacherId === user.id);
      setAllRecords(filteredRecords);
    }
    setIsDialogOpen(false);
    setSelectedTopicIds([]);
    setEditingDate(null);
  };

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student?.name || t('unknown');
  };

  const getTopicName = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    return topic ? (language === 'de' ? topic.name : topic.nameEn) : t('unknown');
  };

  const getTopicDescription = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    return topic ? (language === 'de' ? topic.description : topic.descriptionEn) : '';
  };

  const dateLocale = language === 'de' ? de : enUS;

  // Get aggregated comments for a date (combine all unique comments from records on that date)
  const getDateComments = (dateRecords: PracticalLessonRecord[]): string => {
    const comments = dateRecords
      .map(r => r.comments?.trim())
      .filter((c): c is string => !!c && c.length > 0);
    
    if (comments.length === 0) return '';
    if (comments.length === 1) return comments[0];
    
    // If all comments are the same, return one
    const uniqueComments = [...new Set(comments)];
    if (uniqueComments.length === 1) return uniqueComments[0];
    
    // Combine different comments
    return uniqueComments.join('\n\n---\n\n');
  };

  const selectedStudent = teacherStudents.find(s => s.id === selectedStudentId);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('practicalLessons')}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{t('manageLessonsForToday')}</p>
          </div>
          <Button onClick={handleAdd} className="w-full sm:w-auto" disabled={!selectedStudentId}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addLesson')}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('selectStudent')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="student-select" className="min-w-[80px]">{t('student')}:</Label>
                <Select
                  value={selectedStudentId}
                  onValueChange={(value) => setSelectedStudentId(value)}
                >
                  <SelectTrigger id="student-select" className="max-w-md">
                    <SelectValue placeholder={t('selectStudentPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {teacherStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedStudentId && (
                <>
                  <div className="flex items-center gap-4">
                    <Label className="min-w-[80px]">{t('viewBy')}:</Label>
                    <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
                      <TabsList>
                        <TabsTrigger value="date" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {t('dateWise')}
                        </TabsTrigger>
                        <TabsTrigger value="class" className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          {t('classWise')}
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {!selectedStudentId ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {t('pleaseSelectStudent')}
              </p>
            </CardContent>
          </Card>
        ) : allRecords.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {t('noLessonsForThisStudent')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
            <TabsContent value="date" className="space-y-4">
              {Object.keys(recordsByDate).length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">{t('noLessonsFound')}</p>
                  </CardContent>
                </Card>
              ) : (
                Object.entries(recordsByDate).map(([date, dateRecords]) => (
                  <Card key={date}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            {format(new Date(date), 'EEEE, d. MMMM yyyy', { locale: dateLocale })}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {dateRecords.length} {dateRecords.length === 1 ? t('lesson') : t('lessons')}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditDate(date, dateRecords)}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            {t('edit')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteDate(date, dateRecords)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('delete')}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          {dateRecords.map((record) => (
                            <div
                              key={record.id}
                              className="p-3 rounded-md border border-border bg-card"
                            >
                              <p className="font-medium text-foreground">
                                {getTopicName(record.topicId)}
                              </p>
                            </div>
                          ))}
                        </div>
                        {getDateComments(dateRecords) && (
                          <div className="flex items-start gap-2 pt-3 border-t">
                            <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium mb-1">{t('comments')}:</p>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted p-3 rounded-md">
                                {getDateComments(dateRecords)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            <TabsContent value="class" className="space-y-4">
              {Object.keys(recordsByClass).length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">{t('noLessonsFound')}</p>
                  </CardContent>
                </Card>
              ) : (
                Object.entries(recordsByClass).map(([topicId, classRecords]) => (
                  <Card key={topicId}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        {getTopicName(topicId)}
                      </CardTitle>
                      <CardDescription>
                        {getTopicDescription(topicId)}
                      </CardDescription>
                      <CardDescription className="mt-1">
                        {classRecords.length} {classRecords.length === 1 ? t('lesson') : t('lessons')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {classRecords.map((record) => (
                          <Card key={record.id} className="border-l-4 border-l-primary">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <CardTitle className="text-lg flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {format(new Date(record.date), 'EEEE, d. MMMM yyyy', { locale: dateLocale })}
                                  </CardTitle>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(record)}
                                >
                                  <Pencil className="h-4 w-4 mr-2" />
                                  {t('edit')}
                                </Button>
                              </div>
                            </CardHeader>
                            {record.comments && (
                              <CardContent>
                                <div className="flex items-start gap-2">
                                  <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium mb-1">{t('comments')}:</p>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                      {record.comments}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        )}

        <Dialog 
          open={isDialogOpen} 
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingDate(null);
            }
          }}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingDate 
                  ? t('editLesson')
                  : editingRecord 
                  ? t('editLesson') 
                  : t('addNewLesson')}
              </DialogTitle>
              <DialogDescription>
                {editingDate
                  ? t('updateLessonDetails')
                  : editingRecord 
                  ? t('updateLessonDetails')
                  : t('recordNewLesson')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {!editingDate && (
                <div className="space-y-2">
                  <Label htmlFor="studentId">{t('selectStudent')} *</Label>
                  <Select
                    value={formData.studentId}
                    onValueChange={(value) => setFormData({ ...formData, studentId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectStudentPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {!editingRecord && !editingDate && (
                <div className="space-y-2">
                  <Label htmlFor="date">{t('date')} *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              )}

              {!editingDate && (
                <div className="space-y-2">
                  <Label htmlFor="topicId">
                    {editingRecord ? t('topic') : t('selectTopics')} {!editingRecord && '*'}
                  </Label>
                  {editingRecord ? (
                  <Popover open={topicPopoverOpen} onOpenChange={setTopicPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={topicPopoverOpen}
                        className="w-full justify-between"
                      >
                        {formData.topicId
                          ? (language === 'de' 
                              ? topics.find(topic => topic.id === formData.topicId)?.name
                              : topics.find(topic => topic.id === formData.topicId)?.nameEn)
                          : t('selectTopicPlaceholder')}
                        <svg
                          className="ml-2 h-4 w-4 shrink-0 opacity-50"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                      <Command>
                        <CommandInput placeholder={t('searchTopic')} />
                        <CommandList>
                          <CommandEmpty>
                            {t('noTopicFound')}
                          </CommandEmpty>
                          <CommandGroup>
                            {topics.map((topic) => (
                              <CommandItem
                                key={topic.id}
                                value={`${language === 'de' ? topic.name : topic.nameEn} ${language === 'de' ? topic.description : topic.descriptionEn}`}
                                onSelect={() => {
                                  setFormData({ ...formData, topicId: topic.id });
                                  setTopicPopoverOpen(false);
                                }}
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">{language === 'de' ? topic.name : topic.nameEn}</span>
                                  {topic.description && (
                                    <span className="text-xs text-muted-foreground">
                                      {language === 'de' ? topic.description : topic.descriptionEn}
                                    </span>
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Popover open={topicPopoverOpen} onOpenChange={setTopicPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={topicPopoverOpen}
                        className="w-full justify-between"
                      >
                        {selectedTopicIds.length > 0
                          ? `${selectedTopicIds.length} ${selectedTopicIds.length === 1 ? t('topic') : t('topics')} ${t('selected')}`
                          : t('selectTopicsPlaceholder')}
                        <svg
                          className="ml-2 h-4 w-4 shrink-0 opacity-50"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0" align="start">
                      <Command>
                        <CommandInput placeholder={t('searchTopic')} />
                        <CommandList className="max-h-[300px]">
                          <CommandEmpty>
                            {t('noTopicFound')}
                          </CommandEmpty>
                          <CommandGroup>
                            {topics.map((topic) => {
                              const isSelected = selectedTopicIds.includes(topic.id);
                              return (
                                <CommandItem
                                  key={topic.id}
                                  value={`${language === 'de' ? topic.name : topic.nameEn} ${language === 'de' ? topic.description : topic.descriptionEn}`}
                                  onSelect={() => toggleTopicSelection(topic.id)}
                                  className="cursor-pointer"
                                >
                                  <div className="flex items-start gap-2 w-full">
                                    <Checkbox
                                      checked={isSelected}
                                      onCheckedChange={() => toggleTopicSelection(topic.id)}
                                      onClick={(e) => e.stopPropagation()}
                                      className="mt-0.5"
                                    />
                                    <div className="flex flex-col flex-1">
                                      <span className="font-medium">{language === 'de' ? topic.name : topic.nameEn}</span>
                                      {topic.description && (
                                        <span className="text-xs text-muted-foreground">
                                          {language === 'de' ? topic.description : topic.descriptionEn}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
                {!editingRecord && selectedTopicIds.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTopicIds.map(topicId => {
                      const topic = topics.find(t => t.id === topicId);
                      return topic ? (
                        <span
                          key={topicId}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-sm"
                        >
                          {language === 'de' ? topic.name : topic.nameEn}
                          <button
                            type="button"
                            onClick={() => toggleTopicSelection(topicId)}
                            className="ml-1 hover:text-primary/80"
                          >
                            ×
                          </button>
                        </span>
                      ) : null;
                    })}
                  </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="comments">{t('comments')}</Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder={editingDate ? t('commentsPlaceholder') : t('commentsPlaceholder')}
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsDialogOpen(false);
                  setEditingDate(null);
                }}
              >
                {t('cancelBtn')}
              </Button>
              <Button onClick={handleSubmit}>
                {editingDate || editingRecord ? t('save') : t('create')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deleteDate} onOpenChange={(open) => !open && setDeleteDate(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>
              <AlertDialogDescription>
                {deleteDate && recordsByDate[deleteDate] && (
                  <>
                    {t('deleteDateConfirm')?.replace('{count}', recordsByDate[deleteDate].length.toString()) || 
                     `This will permanently delete all ${recordsByDate[deleteDate].length} lesson${recordsByDate[deleteDate].length === 1 ? '' : 's'} for this date. This action cannot be undone.`}
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancelBtn')}</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDeleteDate}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {t('delete')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default TeacherPracticalLessons;

