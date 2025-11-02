import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { 
  getPracticalLessonTopics, 
  createPracticalLessonTopic, 
  updatePracticalLessonTopic, 
  deletePracticalLessonTopic,
  PracticalLessonTopic 
} from '@/lib/mockData';
import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPracticalLessons = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [topics, setTopics] = useState<PracticalLessonTopic[]>(getPracticalLessonTopics());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<PracticalLessonTopic | null>(null);
  const [deletingTopicId, setDeletingTopicId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    category: 'other' as PracticalLessonTopic['category']
  });

  const categoryLabels: Record<PracticalLessonTopic['category'], { de: string; en: string }> = {
    grundfahraufgabe: { de: 'Grundfahraufgabe', en: 'Basic Driving Exercise' },
    sonderfahrt: { de: 'Sonderfahrt', en: 'Special Driving Lesson' },
    stadtfahrt: { de: 'Stadtfahrt', en: 'City Driving' },
    autobahn: { de: 'Autobahn', en: 'Highway' },
    ueberland: { de: 'Überland', en: 'Country Road' },
    beleuchtung: { de: 'Beleuchtung', en: 'Lighting/Night' },
    parken: { de: 'Parken', en: 'Parking' },
    other: { de: 'Sonstiges', en: 'Other' }
  };

  const handleAdd = () => {
    setEditingTopic(null);
    setFormData({
      name: '',
      nameEn: '',
      description: '',
      descriptionEn: '',
      category: 'other'
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (topic: PracticalLessonTopic) => {
    setEditingTopic(topic);
    setFormData({
      name: topic.name,
      nameEn: topic.nameEn,
      description: topic.description,
      descriptionEn: topic.descriptionEn,
      category: topic.category
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingTopicId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingTopicId) {
      deletePracticalLessonTopic(deletingTopicId);
      setTopics(getPracticalLessonTopics());
      toast({
        title: t('success'),
        description: t('topicDeletedSuccessfully'),
      });
    }
    setIsDeleteDialogOpen(false);
    setDeletingTopicId(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.nameEn) {
      toast({
        title: t('error'),
        description: t('pleaseFillAllFields'),
        variant: "destructive",
      });
      return;
    }

    if (editingTopic) {
      updatePracticalLessonTopic(editingTopic.id, formData);
      toast({
        title: t('success'),
        description: t('topicUpdatedSuccessfully'),
      });
    } else {
      createPracticalLessonTopic(formData);
      toast({
        title: t('success'),
        description: t('topicCreatedSuccessfully'),
      });
    }

    setTopics(getPracticalLessonTopics());
    setIsDialogOpen(false);
  };

  const topicsByCategory = topics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = [];
    }
    acc[topic.category].push(topic);
    return acc;
  }, {} as Record<PracticalLessonTopic['category'], PracticalLessonTopic[]>);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('practicalLessonsTopics')}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{t('managePracticalLessonsTopics')}</p>
          </div>
          <Button onClick={handleAdd} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            {t('addTopic')}
          </Button>
        </div>

        <div className="space-y-6">
          {Object.entries(topicsByCategory).map(([category, categoryTopics]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>
                  {language === 'de' 
                    ? categoryLabels[category as PracticalLessonTopic['category']].de
                    : categoryLabels[category as PracticalLessonTopic['category']].en
                  }
                </CardTitle>
                <CardDescription>
                  {categoryTopics.length} {categoryTopics.length === 1 ? t('topic') : t('topics')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryTopics.map((topic) => (
                    <Card key={topic.id} className="relative">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {language === 'de' ? topic.name : topic.nameEn}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {language === 'de' ? topic.description : topic.descriptionEn}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(topic)}
                            className="flex-1"
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            {t('edit')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(topic.id)}
                            className="flex-1"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t('delete')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTopic ? t('editTopic') : t('addNewTopic')}
              </DialogTitle>
              <DialogDescription>
                {editingTopic ? t('updateTopicDetails') : t('createNewPracticalLessonTopic')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('nameGerman')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameEn">{t('nameEnglish')} *</Label>
                  <Input
                    id="nameEn"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description">{t('descriptionGerman')}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descriptionEn">{t('descriptionEnglish')}</Label>
                  <Textarea
                    id="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">{t('category')} *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as PracticalLessonTopic['category'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([key, labels]) => (
                      <SelectItem key={key} value={key}>
                        {language === 'de' ? labels.de : labels.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {t('cancelBtn')}
              </Button>
              <Button onClick={handleSubmit}>
                {editingTopic ? t('save') : t('create')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('cannotUndoAction')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancelBtn')}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>{t('delete')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default AdminPracticalLessons;

