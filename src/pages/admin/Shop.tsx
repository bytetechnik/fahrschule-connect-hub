import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Euro } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct, Product, getStudents } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

const AdminShop = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [products, setProducts] = useState(getProducts());
  const [students] = useState(getStudents());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    type: 'theory-app' as 'theory-app' | 'driving-lesson' | 'theory-exam' | 'practical-exam',
    basePriceByYear: [{ year: '2023', price: 0 }],
    customPrices: [] as { studentId: string; price: number }[]
  });

  const resetForm = () => {
    setFormData({
      name: '',
      nameEn: '',
      description: '',
      descriptionEn: '',
      type: 'theory-app',
      basePriceByYear: [{ year: '2023', price: 0 }],
      customPrices: []
    });
    setEditingProduct(null);
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        nameEn: product.nameEn,
        description: product.description,
        descriptionEn: product.descriptionEn,
        type: product.type,
        basePriceByYear: product.basePriceByYear,
        customPrices: product.customPrices || []
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.nameEn || !formData.basePriceByYear.length) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      toast({
        title: t('success'),
        description: "Product updated successfully"
      });
    } else {
      createProduct(formData);
      toast({
        title: t('success'),
        description: "Product created successfully"
      });
    }

    setProducts(getProducts());
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteProductId) {
      deleteProduct(deleteProductId);
      setProducts(getProducts());
      toast({
        title: t('success'),
        description: "Product deleted successfully"
      });
      setDeleteProductId(null);
    }
  };

  const addYearPrice = () => {
    setFormData({
      ...formData,
      basePriceByYear: [...formData.basePriceByYear, { year: new Date().getFullYear().toString(), price: 0 }]
    });
  };

  const updateYearPrice = (index: number, field: 'year' | 'price', value: string | number) => {
    const updated = [...formData.basePriceByYear];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, basePriceByYear: updated });
  };

  const removeYearPrice = (index: number) => {
    const updated = formData.basePriceByYear.filter((_, i) => i !== index);
    setFormData({ ...formData, basePriceByYear: updated });
  };

  const addCustomPrice = () => {
    if (students.length === 0) return;
    setFormData({
      ...formData,
      customPrices: [...formData.customPrices, { studentId: students[0].id, price: 0 }]
    });
  };

  const updateCustomPrice = (index: number, field: 'studentId' | 'price', value: string | number) => {
    const updated = [...formData.customPrices];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, customPrices: updated });
  };

  const removeCustomPrice = (index: number) => {
    const updated = formData.customPrices.filter((_, i) => i !== index);
    setFormData({ ...formData, customPrices: updated });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('shop')}</h1>
            <p className="text-muted-foreground">Manage shop products and pricing</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name (DE) *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nameEn">Name (EN) *</Label>
                    <Input
                      id="nameEn"
                      value={formData.nameEn}
                      onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="description">Description (DE)</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="descriptionEn">Description (EN)</Label>
                    <Input
                      id="descriptionEn"
                      value={formData.descriptionEn}
                      onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theory-app">Theory App</SelectItem>
                      <SelectItem value="driving-lesson">Driving Lesson (45 min)</SelectItem>
                      <SelectItem value="theory-exam">Theory Exam</SelectItem>
                      <SelectItem value="practical-exam">Practical Exam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Base Prices by Year *</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addYearPrice}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.basePriceByYear.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Year"
                        value={item.year}
                        onChange={(e) => updateYearPrice(index, 'year', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => updateYearPrice(index, 'price', parseFloat(e.target.value) || 0)}
                      />
                      {formData.basePriceByYear.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeYearPrice(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Custom Student Prices (Optional)</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addCustomPrice}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.customPrices.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Select 
                        value={item.studentId} 
                        onValueChange={(value) => updateCustomPrice(index, 'studentId', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => updateCustomPrice(index, 'price', parseFloat(e.target.value) || 0)}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeCustomPrice(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {t('cancelBtn')}
                  </Button>
                  <Button type="submit">
                    {editingProduct ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => handleOpenDialog(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setDeleteProductId(product.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Base Prices by Year:</p>
                    {product.basePriceByYear.map((price, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{price.year}:</span>
                        <span className="font-medium flex items-center">
                          <Euro className="h-3 w-3 mr-1" />
                          {price.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  {product.customPrices && product.customPrices.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Custom Prices:</p>
                      <p className="text-xs text-muted-foreground">
                        {product.customPrices.length} student(s) with custom pricing
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this product. This action cannot be undone.
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

export default AdminShop;
