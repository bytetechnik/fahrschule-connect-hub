import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPracticalLessonRecordsByStudent, getPracticalLessonTopics, PracticalLessonRecord } from '@/lib/mockData';
import { useState } from 'react';
import { Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

const StudentPracticalLessons = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [records] = useState<PracticalLessonRecord[]>(
    user?.id ? getPracticalLessonRecordsByStudent(user.id) : []
  );
  const [topics] = useState(getPracticalLessonTopics());

  const getTopicName = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    return topic ? (language === 'de' ? topic.name : topic.nameEn) : t('unknown');
  };

  const dateLocale = language === 'de' ? de : enUS;

  const recordsByDate = records.reduce((acc, record) => {
    const date = record.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {} as Record<string, PracticalLessonRecord[]>);

  const sortedDates = Object.keys(recordsByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

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

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('myPracticalLessons')}</h1>
          <p className="text-sm md:text-base text-muted-foreground">{t('overviewPracticalLessons')}</p>
        </div>

        {records.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {t('noPracticalLessonsYet')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedDates.map((date) => (
              <Card key={date}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {format(new Date(date), 'EEEE, d. MMMM yyyy', { locale: dateLocale })}
                  </CardTitle>
                  <CardDescription>
                    {recordsByDate[date].length} {recordsByDate[date].length === 1 ? t('lesson') : t('lessons')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {recordsByDate[date].map((record) => (
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
                    {getDateComments(recordsByDate[date]) && (
                      <div className="flex items-start gap-2 pt-3 border-t">
                        <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">{t('teacherComments')}:</p>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted p-3 rounded-md">
                            {getDateComments(recordsByDate[date])}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentPracticalLessons;

