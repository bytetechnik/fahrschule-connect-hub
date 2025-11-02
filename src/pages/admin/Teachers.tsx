import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { getStudents, getTeachers, createTeacher, updateTeacher, deleteTeacher, type Teacher, type Student } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const AdminTeachers = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', status: 'active' as 'active' | 'inactive' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setTeachers(getTeachers());
    setStudents(getStudents());
  };

  const handleAdd = () => {
    if (isProcessing) return;
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: t('error'),
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }
    try {
      setIsProcessing(true);
      createTeacher(formData);
      loadData();
      setIsAddDialogOpen(false);
      setFormData({ name: '', email: '', status: 'active' });
      toast({
        title: t('success'),
        description: 'Teacher added successfully',
      });
    } catch (err) {
      toast({
        title: t('error'),
        description: 'Failed to add teacher. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = () => {
    if (!selectedTeacher) return;
    if (isProcessing) return;
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: t('error'),
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }
    try {
      setIsProcessing(true);
      updateTeacher(selectedTeacher.id, formData);
      loadData();
      setIsEditDialogOpen(false);
      setSelectedTeacher(null);
      setFormData({ name: '', email: '', status: 'active' });
      toast({
        title: t('success'),
        description: 'Teacher updated successfully',
      });
    } catch (err) {
      toast({
        title: t('error'),
        description: 'Failed to update teacher. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = () => {
    if (!selectedTeacher) return;
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      deleteTeacher(selectedTeacher.id);
      loadData();
      setIsDeleteDialogOpen(false);
      setSelectedTeacher(null);
      toast({
        title: t('success'),
        description: 'Teacher deleted successfully',
      });
    } catch (err) {
      toast({
        title: t('error'),
        description: 'Failed to delete teacher. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const openEditDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setFormData({ name: teacher.name, email: teacher.email, status: teacher.status });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('teachers')}</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage driving instructors</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setFormData({ name: '', email: '', status: 'active' })} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter teacher name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  {t('cancelBtn')}
                </Button>
                <Button onClick={handleAdd}>Add Teacher</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {teachers.map((teacher) => {
            const assignedStudents = students.filter(s => s.teacherId === teacher.id);
            
            return (
              <Card key={teacher.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="truncate">{teacher.name}</CardTitle>
                      <p className="text-sm text-muted-foreground truncate">{teacher.email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                        {teacher.status}
                      </Badge>
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(teacher)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(teacher)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('assignedStudents')}: {assignedStudents.length}</p>
                    </div>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {assignedStudents.map((student) => (
                        <div key={student.id} className="flex items-center justify-between text-sm gap-2">
                          <span className="truncate flex-1">{student.name}</span>
                          <span className="text-muted-foreground shrink-0">{student.progress}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter teacher name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('cancelBtn')}
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedTeacher?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancelBtn')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default AdminTeachers;
