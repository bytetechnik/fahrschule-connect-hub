import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getStudentClassReports, getTeacherClassReports } from '@/lib/mockData';
import type { StudentClassReport, TeacherClassReport, MonthKey } from '@/lib/mockData';
import { FileDown, Users, UserCog, FileStack } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useToast } from '@/hooks/use-toast';

const MONTH_LABELS: Record<string, { de: string; en: string }> = {};
['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].forEach((m, i) => {
  const monthsDe = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  MONTH_LABELS[m] = { de: monthsDe[i], en: monthsEn[i] };
});

function formatMonthKey(key: MonthKey, lang: 'de' | 'en'): string {
  const [y, m] = key.split('-');
  const label = MONTH_LABELS[m]?.[lang] ?? m;
  return `${label} ${y}`;
}

function filterStudentReports(reports: StudentClassReport[], fromMonth: MonthKey, toMonth: MonthKey): { reports: StudentClassReport[]; months: MonthKey[] } {
  const months = reports.length ? reports[0].months.filter((m) => m >= fromMonth && m <= toMonth).sort() : [];
  const filtered = reports.map((r) => {
    const monthsInRange = r.months.filter((m) => m >= fromMonth && m <= toMonth).sort();
    let totalTheory = 0;
    let totalPractical = 0;
    monthsInRange.forEach((m) => {
      const cell = r.byMonth[m];
      totalTheory += cell?.theory ?? 0;
      totalPractical += cell?.practical ?? 0;
    });
    const byMonth: Record<MonthKey, { theory: number; practical: number }> = {};
    monthsInRange.forEach((m) => {
      byMonth[m] = r.byMonth[m] ?? { theory: 0, practical: 0 };
    });
    return {
      ...r,
      byMonth,
      months: monthsInRange,
      totalTheory,
      totalPractical,
      totalClasses: totalTheory + totalPractical,
    };
  });
  return { reports: filtered, months };
}

function filterTeacherReports(reports: TeacherClassReport[], fromMonth: MonthKey, toMonth: MonthKey): { reports: TeacherClassReport[]; months: MonthKey[] } {
  const months = reports.length ? reports[0].months.filter((m) => m >= fromMonth && m <= toMonth).sort() : [];
  const filtered = reports.map((r) => {
    const monthsInRange = r.months.filter((m) => m >= fromMonth && m <= toMonth).sort();
    let totalClasses = 0;
    const byMonth: Record<MonthKey, number> = {};
    monthsInRange.forEach((m) => {
      const count = r.byMonth[m] ?? 0;
      byMonth[m] = count;
      totalClasses += count;
    });
    return { ...r, byMonth, months: monthsInRange, totalClasses };
  });
  return { reports: filtered, months };
}

function addStudentTableToPdf(
  doc: jsPDF,
  reports: StudentClassReport[],
  months: MonthKey[],
  lang: 'de' | 'en',
  t: (k: string) => string
): number {
  const pageW = doc.getPageWidth();
  const margin = 10;
  let y = margin;
  const lineHeight = 6;
  const colWidth = Math.max(18, (pageW - margin * 2 - 50) / (months.length + 4));

  doc.setFontSize(14);
  doc.text(t('classesCompletedByStudent'), margin, y);
  y += lineHeight * 2;

  const headers = [t('studentName'), ...months.map((m) => formatMonthKey(m, lang)), t('theory'), t('practical'), t('total')];
  doc.setFontSize(9);
  let x = margin;
  headers.forEach((h, i) => {
    doc.text(h, x, y);
    x += i === 0 ? 50 : colWidth;
  });
  y += lineHeight + 2;

  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += lineHeight;

  for (const r of reports) {
    if (y > 180) {
      doc.addPage('landscape');
      y = margin;
    }
    const row: string[] = [
      r.studentName.length > 22 ? r.studentName.slice(0, 21) + '…' : r.studentName,
      ...months.map((m) => String((r.byMonth[m]?.theory ?? 0) + (r.byMonth[m]?.practical ?? 0))),
      String(r.totalTheory),
      String(r.totalPractical),
      String(r.totalClasses),
    ];
    x = margin;
    row.forEach((cell, i) => {
      doc.text(cell, x, y);
      x += i === 0 ? 50 : colWidth;
    });
    y += lineHeight;
  }
  return y;
}

function addTeacherTableToPdf(
  doc: jsPDF,
  reports: TeacherClassReport[],
  months: MonthKey[],
  lang: 'de' | 'en',
  t: (k: string) => string
): number {
  const pageW = doc.getPageWidth();
  const margin = 10;
  let y = margin;
  const lineHeight = 6;
  const colWidth = Math.max(18, (pageW - margin * 2 - 40) / (months.length + 1));

  doc.setFontSize(14);
  doc.text(t('classesTaughtByTeacher'), margin, y);
  y += lineHeight * 2;

  const headers = [t('teacherName'), ...months.map((m) => formatMonthKey(m, lang)), t('total')];
  doc.setFontSize(9);
  let x = margin;
  headers.forEach((h, i) => {
    doc.text(h, x, y);
    x += i === 0 ? 50 : colWidth;
  });
  y += lineHeight + 2;

  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += lineHeight;

  for (const r of reports) {
    const row: string[] = [
      r.teacherName.length > 22 ? r.teacherName.slice(0, 21) + '…' : r.teacherName,
      ...months.map((m) => String(r.byMonth[m] ?? 0)),
      String(r.totalClasses),
    ];
    x = margin;
    row.forEach((cell, i) => {
      doc.text(cell, x, y);
      x += i === 0 ? 50 : colWidth;
    });
    y += lineHeight;
  }
  return y;
}

function exportStudentReportPdf(reports: StudentClassReport[], months: MonthKey[], lang: 'de' | 'en', t: (k: string) => string) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm' });
  addStudentTableToPdf(doc, reports, months, lang, t);
  doc.save(`student-classes-report-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function exportTeacherReportPdf(reports: TeacherClassReport[], months: MonthKey[], lang: 'de' | 'en', t: (k: string) => string) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm' });
  addTeacherTableToPdf(doc, reports, months, lang, t);
  doc.save(`teacher-classes-report-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function exportFullReportPdf(
  studentReports: StudentClassReport[],
  teacherReports: TeacherClassReport[],
  months: MonthKey[],
  lang: 'de' | 'en',
  t: (k: string) => string
) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm' });
  addStudentTableToPdf(doc, studentReports, months, lang, t);
  doc.addPage('landscape');
  addTeacherTableToPdf(doc, teacherReports, months, lang, t);
  doc.save(`class-reports-full-${new Date().toISOString().slice(0, 10)}.pdf`);
}

const AdminClassReports = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const lang = language as 'de' | 'en';

  const studentReportsRaw = useMemo(() => getStudentClassReports(), []);
  const teacherReportsRaw = useMemo(() => getTeacherClassReports(), []);

  const allMonths = useMemo(() => {
    const set = new Set<MonthKey>();
    studentReportsRaw.forEach((r) => r.months.forEach((m) => set.add(m)));
    teacherReportsRaw.forEach((r) => r.months.forEach((m) => set.add(m)));
    return Array.from(set).sort();
  }, [studentReportsRaw, teacherReportsRaw]);

  const [fromMonth, setFromMonth] = useState<MonthKey>(() => allMonths[0] ?? '2024-01');
  const [toMonth, setToMonth] = useState<MonthKey>(() => allMonths[allMonths.length - 1] ?? '2025-12');

  const { reports: studentReports, months } = useMemo(() => {
    const from = fromMonth || allMonths[0];
    const to = toMonth || allMonths[allMonths.length - 1];
    if (!from || !to || from > to) return { reports: studentReportsRaw, months: allMonths };
    return filterStudentReports(studentReportsRaw, from, to);
  }, [studentReportsRaw, fromMonth, toMonth, allMonths]);

  const { reports: teacherReports, months: teacherMonths } = useMemo(() => {
    const from = fromMonth || allMonths[0];
    const to = toMonth || allMonths[allMonths.length - 1];
    if (!from || !to || from > to) return { reports: teacherReportsRaw, months: allMonths };
    return filterTeacherReports(teacherReportsRaw, from, to);
  }, [teacherReportsRaw, fromMonth, toMonth, allMonths]);

  const displayMonths = months.length > 0 ? months : teacherMonths;

  const handleExportPdf = (type: 'student' | 'teacher') => {
    try {
      if (type === 'student') {
        exportStudentReportPdf(studentReports, displayMonths, lang, t);
      } else {
        exportTeacherReportPdf(teacherReports, displayMonths, lang, t);
      }
      toast({
        title: t('reportGenerated'),
        description: type === 'student' ? t('classesCompleted') : t('classesTaught'),
      });
    } catch (e) {
      toast({
        title: t('error'),
        description: e instanceof Error ? e.message : 'PDF export failed',
        variant: 'destructive',
      });
    }
  };

  const handleExportFullPdf = () => {
    try {
      exportFullReportPdf(studentReports, teacherReports, displayMonths, lang, t);
      toast({
        title: t('reportGenerated'),
        description: t('exportFullReport'),
      });
    } catch (e) {
      toast({
        title: t('error'),
        description: e instanceof Error ? e.message : 'PDF export failed',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('classReports')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('classesCompletedByStudent')} / {t('classesTaughtByTeacher')}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-2">
              <Label className="text-xs">{t('fromMonth')}</Label>
              <Select value={fromMonth} onValueChange={(v) => setFromMonth(v as MonthKey)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allMonths.map((m) => (
                    <SelectItem key={m} value={m}>
                      {formatMonthKey(m, lang)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('toMonth')}</Label>
              <Select value={toMonth} onValueChange={(v) => setToMonth(v as MonthKey)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allMonths.map((m) => (
                    <SelectItem key={m} value={m}>
                      {formatMonthKey(m, lang)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportFullPdf}>
              <FileStack className="h-4 w-4 mr-2" />
              {t('exportFullReport')}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="students" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {t('students')} – {t('classesCompleted')}
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              {t('teachers')} – {t('classesTaught')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{t('classesCompletedByStudent')}</CardTitle>
                <Button size="sm" onClick={() => handleExportPdf('student')}>
                  <FileDown className="h-4 w-4 mr-2" />
                  {t('exportPdf')}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[160px]">{t('studentName')}</TableHead>
                        {displayMonths.map((m) => (
                          <TableHead key={m} className="text-center whitespace-nowrap">
                            {formatMonthKey(m, lang)}
                          </TableHead>
                        ))}
                        <TableHead className="text-center">{t('theory')}</TableHead>
                        <TableHead className="text-center">{t('practical')}</TableHead>
                        <TableHead className="text-center font-medium">{t('total')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentReports.map((r) => (
                        <TableRow key={r.studentId}>
                          <TableCell className="font-medium">{r.studentName}</TableCell>
                          {displayMonths.map((m) => {
                            const cell = r.byMonth[m];
                            const theory = cell?.theory ?? 0;
                            const practical = cell?.practical ?? 0;
                            const sum = theory + practical;
                            return (
                              <TableCell key={m} className="text-center">
                                {sum > 0 ? (
                                  <span className="text-muted-foreground">
                                    {theory}/{practical}
                                  </span>
                                ) : (
                                  '–'
                                )}
                              </TableCell>
                            );
                          })}
                          <TableCell className="text-center">{r.totalTheory}</TableCell>
                          <TableCell className="text-center">{r.totalPractical}</TableCell>
                          <TableCell className="text-center font-medium">{r.totalClasses}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {t('theory')}/{t('practical')} = Theorie-/Praxisstunden pro Monat
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{t('classesTaughtByTeacher')}</CardTitle>
                <Button size="sm" onClick={() => handleExportPdf('teacher')}>
                  <FileDown className="h-4 w-4 mr-2" />
                  {t('exportPdf')}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[160px]">{t('teacherName')}</TableHead>
                        {displayMonths.map((m) => (
                          <TableHead key={m} className="text-center whitespace-nowrap">
                            {formatMonthKey(m, lang)}
                          </TableHead>
                        ))}
                        <TableHead className="text-center font-medium">{t('total')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teacherReports.map((r) => (
                        <TableRow key={r.teacherId}>
                          <TableCell className="font-medium">{r.teacherName}</TableCell>
                          {displayMonths.map((m) => (
                            <TableCell key={m} className="text-center">
                              {r.byMonth[m] ?? '–'}
                            </TableCell>
                          ))}
                          <TableCell className="text-center font-medium">{r.totalClasses}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminClassReports;
