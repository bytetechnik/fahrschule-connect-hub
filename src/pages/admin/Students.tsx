import { useState } from 'react';
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
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockTeachers, getProgress, mockLessons, getStudents, createStudent, updateStudent, deleteStudent, Student, getStudentProcessByStudentId, updateStudentProcess } from '@/lib/mockData';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const AdminStudents = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [students, setStudents] = useState(getStudents());
  const progress = getProgress();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteStudentId, setDeleteStudentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    teacherId: '',
    validityDate: '',
    status: 'active' as 'active' | 'expired',
    progress: 0,
    licenseClass: '',
    joiningDate: ''
  });
  const [processForm, setProcessForm] = useState({
    currentStep: 'prerequisites' as 'prerequisites' | 'registration' | 'theory' | 'practical',
    prerequisites: {
      firstAidCertificate: false,
      biometricPhotos: false,
      eyeTest: false,
    },
    registrationDone: false,
    theoryDone: false,
    practicalDone: false,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      teacherId: '',
      validityDate: '',
      status: 'active',
      progress: 0,
      licenseClass: '',
      joiningDate: ''
    });
    setEditingStudent(null);
    setProcessForm({
      currentStep: 'prerequisites',
      prerequisites: {
        firstAidCertificate: false,
        biometricPhotos: false,
        eyeTest: false,
      },
      registrationDone: false,
      theoryDone: false,
      practicalDone: false,
    });
  };

  const handleOpenDialog = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      setFormData({
        name: student.name,
        email: student.email,
        teacherId: student.teacherId,
        validityDate: student.validityDate,
        status: student.status,
        progress: student.progress,
        licenseClass: student.licenseClass,
        joiningDate: student.joiningDate
      });
      const proc = getStudentProcessByStudentId(student.id);
      const current = proc?.currentStep || 'prerequisites';
      setProcessForm({
        currentStep: current,
        prerequisites: {
          firstAidCertificate: Boolean(proc?.prerequisites?.firstAidCertificate),
          biometricPhotos: Boolean(proc?.prerequisites?.biometricPhotos),
          eyeTest: Boolean(proc?.prerequisites?.eyeTest),
        },
        registrationDone: current !== 'prerequisites',
        theoryDone: current === 'theory' || current === 'practical',
        practicalDone: current === 'practical',
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.teacherId || !formData.validityDate || !formData.licenseClass || !formData.joiningDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
      updateStudentProcess(editingStudent.id, processForm);
      toast({
        title: t('success'),
        description: "Student updated successfully"
      });
    } else {
      const created = createStudent(formData);
      updateStudentProcess(created.id, processForm);
      toast({
        title: t('success'),
        description: "Student created successfully"
      });
    }

    setStudents(getStudents());
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteStudentId) {
      deleteStudent(deleteStudentId);
      setStudents(getStudents());
      toast({
        title: t('success'),
        description: "Student deleted successfully"
      });
      setDeleteStudentId(null);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('students')}</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage and monitor student accounts</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="licenseClass">License Class *</Label>
                  <Select value={formData.licenseClass} onValueChange={(value) => setFormData({ ...formData, licenseClass: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select license class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM - Mopeds</SelectItem>
                      <SelectItem value="A1">A1 - Light Motorcycles</SelectItem>
                      <SelectItem value="A2">A2 - Medium Motorcycles</SelectItem>
                      <SelectItem value="A">A - Heavy Motorcycles</SelectItem>
                      <SelectItem value="B">B - Cars (up to 3.5t)</SelectItem>
                      <SelectItem value="BE">BE - Car with Trailer</SelectItem>
                      <SelectItem value="C1">C1 - Medium Trucks</SelectItem>
                      <SelectItem value="C1E">C1E - Medium Truck with Trailer</SelectItem>
                      <SelectItem value="C">C - Heavy Trucks</SelectItem>
                      <SelectItem value="CE">CE - Heavy Truck with Trailer</SelectItem>
                      <SelectItem value="D1">D1 - Minibus</SelectItem>
                      <SelectItem value="D1E">D1E - Minibus with Trailer</SelectItem>
                      <SelectItem value="D">D - Bus</SelectItem>
                      <SelectItem value="DE">DE - Bus with Trailer</SelectItem>
                      <SelectItem value="L">L - Agricultural Tractors</SelectItem>
                      <SelectItem value="T">T - Fast Agricultural Tractors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="teacher">Assigned Teacher *</Label>
                  <Select value={formData.teacherId} onValueChange={(value) => setFormData({ ...formData, teacherId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="joiningDate">Joining Date *</Label>
                  <Input
                    id="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="validityDate">Validity Date *</Label>
                  <Input
                    id="validityDate"
                    type="date"
                    value={formData.validityDate}
                    onChange={(e) => setFormData({ ...formData, validityDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'active' | 'expired') => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Driving School Process</p>
                  <div className="grid gap-3">
                    <div className="mt-1">
                      <Label className="mb-2 block">Process Steps</Label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={processForm.registrationDone}
                            onCheckedChange={(checked) => {
                              const registrationDone = Boolean(checked);
                              const theoryDone = registrationDone ? processForm.theoryDone : false;
                              const practicalDone = registrationDone ? processForm.practicalDone : false;
                              const nextStep = practicalDone
                                ? 'practical'
                                : theoryDone
                                  ? 'theory'
                                  : registrationDone
                                    ? 'registration'
                                    : 'prerequisites';
                              setProcessForm({ ...processForm, registrationDone, theoryDone, practicalDone, currentStep: nextStep });
                            }}
                          />
                          <span>Registration completed</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={processForm.theoryDone}
                            onCheckedChange={(checked) => {
                              const theoryDone = Boolean(checked);
                              const registrationDone = theoryDone ? true : processForm.registrationDone;
                              const practicalDone = theoryDone ? processForm.practicalDone : false;
                              const nextStep = practicalDone
                                ? 'practical'
                                : theoryDone
                                  ? 'theory'
                                  : registrationDone
                                    ? 'registration'
                                    : 'prerequisites';
                              setProcessForm({ ...processForm, registrationDone, theoryDone, practicalDone, currentStep: nextStep });
                            }}
                          />
                          <span>Theory class completed</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={processForm.practicalDone}
                            onCheckedChange={(checked) => {
                              const practicalDone = Boolean(checked);
                              const theoryDone = practicalDone ? true : processForm.theoryDone;
                              const registrationDone = practicalDone ? true : processForm.registrationDone;
                              const nextStep = practicalDone
                                ? 'practical'
                                : theoryDone
                                  ? 'theory'
                                  : registrationDone
                                    ? 'registration'
                                    : 'prerequisites';
                              setProcessForm({ ...processForm, registrationDone, theoryDone, practicalDone, currentStep: nextStep });
                            }}
                          />
                          <span>Practical class completed</span>
                        </label>
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {t('cancelBtn')}
                  </Button>
                  <Button type="submit">
                    {editingStudent ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {students.map((student) => {
            const teacher = mockTeachers.find(t => t.id === student.teacherId);
            const completedLessons = progress.filter(
              p => p.studentId === student.id && p.completed
            ).length;
            const process = getStudentProcessByStudentId(student.id);
            const currentStepLabel = (() => {
              switch (process?.currentStep) {
                case 'prerequisites': return 'Prerequisites';
                case 'registration': return 'Registration';
                case 'theory': return 'Theory Class';
                case 'practical': return 'Practical Class';
                default: return '—';
              }
            })();
            
            return (
              <Card key={student.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="truncate">{student.name}</CardTitle>
                      <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={student.status === 'active' ? 'default' : 'destructive'}>
                        {student.status}
                      </Badge>
                      <Button size="icon" variant="ghost" onClick={() => handleOpenDialog(student)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeleteStudentId(student.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">License Class</p>
                      <p className="text-sm md:text-base font-medium truncate">{student.licenseClass}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">{t('teacher')}</p>
                      <p className="text-sm md:text-base font-medium truncate">{teacher?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">{t('completedLessons')}</p>
                      <p className="text-sm md:text-base font-medium">{completedLessons} / {mockLessons.length}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">{t('progress')}</p>
                      <p className="text-sm md:text-base font-medium">{student.progress}%</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">{t('accountValidity')}</p>
                      <p className="text-sm md:text-base font-medium truncate">{student.validityDate}</p>
                    </div>
                    
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <AlertDialog open={!!deleteStudentId} onOpenChange={() => setDeleteStudentId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this student and all associated data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancelBtn')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default AdminStudents;
