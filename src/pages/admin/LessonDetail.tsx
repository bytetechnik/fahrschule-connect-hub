import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Video, FileText, Pencil } from 'lucide-react';
import { getLessons } from '@/lib/mockData';

const AdminLessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const lessons = getLessons();
  const lesson = lessons.find(l => l.id === id);

  if (!lesson) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
          <Button onClick={() => navigate('/admin/lessons')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Button>
        </div>
      </Layout>
    );
  }

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/admin/lessons')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Button>
          <Button onClick={() => navigate('/admin/lessons')}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Lesson
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">
              {language === 'de' ? lesson.title : lesson.titleEn}
            </CardTitle>
            <CardDescription className="text-base">
              {language === 'de' ? lesson.description : lesson.descriptionEn}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <img
              src={lesson.thumbnail}
              alt={language === 'de' ? lesson.title : lesson.titleEn}
              className="w-full h-64 object-cover rounded-md"
            />

            {lesson.videos && lesson.videos.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Videos ({lesson.videos.length})
                </h3>
                {lesson.videos.map((video, idx) => {
                  const videoId = extractYouTubeId(video.url);
                  return (
                    <div key={idx} className="space-y-2">
                      <h4 className="font-medium">{video.title}</h4>
                      {videoId && (
                        <div className="aspect-video w-full">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {lesson.documents && lesson.documents.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents ({lesson.documents.length})
                </h3>
                <div className="grid gap-3">
                  {lesson.documents.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <FileText className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground uppercase">{doc.type}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLessonDetail;
