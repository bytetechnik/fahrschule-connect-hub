import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { getLessons, createLesson, updateLesson, deleteLesson, Lesson } from '@/lib/mockData';
import { useState } from 'react';
import { Pencil, Trash2, Plus, FileText, Video, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminLessons = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [lessons, setLessons] = useState<Lesson[]>(getLessons());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [deletingLessonId, setDeletingLessonId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: '',
    videoUrl: '',
    thumbnail: '',
    videos: [] as { title: string; url: string }[],
    documents: [] as { name: string; url: string; type: string }[]
  });

  const handleAdd = () => {
    setEditingLesson(null);
    setFormData({
      title: '',
      titleEn: '',
      description: '',
      descriptionEn: '',
      videoUrl: '',
      thumbnail: '',
      videos: [],
      documents: []
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormData({
      title: lesson.title,
      titleEn: lesson.titleEn,
      description: lesson.description,
      descriptionEn: lesson.descriptionEn,
      videoUrl: lesson.videoUrl,
      thumbnail: lesson.thumbnail,
      videos: lesson.videos || [],
      documents: lesson.documents || []
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingLessonId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingLessonId) {
      deleteLesson(deletingLessonId);
      setLessons(getLessons());
      toast({
        title: "Lesson deleted",
        description: "The lesson has been successfully deleted.",
      });
    }
    setIsDeleteDialogOpen(false);
    setDeletingLessonId(null);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.titleEn) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingLesson) {
      updateLesson(editingLesson.id, formData);
      toast({
        title: "Lesson updated",
        description: "The lesson has been successfully updated.",
      });
    } else {
      createLesson(formData);
      toast({
        title: "Lesson created",
        description: "The new lesson has been successfully created.",
      });
    }

    setLessons(getLessons());
    setIsDialogOpen(false);
  };

  const addVideo = () => {
    setFormData({
      ...formData,
      videos: [...formData.videos, { title: '', url: '' }]
    });
  };

  const updateVideo = (index: number, field: 'title' | 'url', value: string) => {
    const newVideos = [...formData.videos];
    newVideos[index][field] = value;
    setFormData({ ...formData, videos: newVideos });
  };

  const removeVideo = (index: number) => {
    setFormData({
      ...formData,
      videos: formData.videos.filter((_, i) => i !== index)
    });
  };

  const addDocument = () => {
    setFormData({
      ...formData,
      documents: [...formData.documents, { name: '', url: '', type: 'pdf' }]
    });
  };

  const updateDocument = (index: number, field: 'name' | 'url' | 'type', value: string) => {
    const newDocuments = [...formData.documents];
    newDocuments[index][field] = value;
    setFormData({ ...formData, documents: newDocuments });
  };

  const removeDocument = (index: number) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((_, i) => i !== index)
    });
  };

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('recordedLessons')}</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage theory lesson content</p>
          </div>
          <Button onClick={handleAdd} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/admin/lessons/${lesson.id}`)}>
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base md:text-lg truncate">{language === 'de' ? lesson.title : lesson.titleEn}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {language === 'de' ? lesson.description : lesson.descriptionEn}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <img 
                  src={lesson.thumbnail} 
                  alt={language === 'de' ? lesson.title : lesson.titleEn}
                  className="w-full h-32 md:h-40 object-cover rounded-md"
                />
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 min-w-[100px]"
                    onClick={(e) => { e.stopPropagation(); navigate(`/admin/lessons/${lesson.id}`); }}
                  >
                    <Eye className="mr-1 md:mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); handleEdit(lesson); }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); handleDelete(lesson.id); }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingLesson ? 'Edit Lesson' : 'Add New Lesson'}</DialogTitle>
              <DialogDescription>
                {editingLesson ? 'Update lesson details' : 'Create a new theory lesson'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title (German) *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleEn">Title (English) *</Label>
                  <Input
                    id="titleEn"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description (German)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descriptionEn">Description (English)</Label>
                  <Textarea
                    id="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">Main Video URL (YouTube)</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Additional Videos</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addVideo}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                </div>
                {formData.videos.map((video, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Video title"
                        value={video.title}
                        onChange={(e) => updateVideo(index, 'title', e.target.value)}
                      />
                      <Input
                        placeholder="YouTube URL"
                        value={video.url}
                        onChange={(e) => updateVideo(index, 'url', e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeVideo(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Documents</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addDocument}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                </div>
                {formData.documents.map((doc, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Document name"
                        value={doc.name}
                        onChange={(e) => updateDocument(index, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Document URL"
                        value={doc.url}
                        onChange={(e) => updateDocument(index, 'url', e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeDocument(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingLesson ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the lesson.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default AdminLessons;
