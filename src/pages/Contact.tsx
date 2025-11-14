import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Clock, MessageSquare, CheckCircle } from "lucide-react";
import { products } from "@/data/products";

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    product: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t('contact.toastErrorTitle'),
        description: t('contact.toastErrorRequired'),
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t('contact.toastErrorTitle'),
        description: t('contact.toastErrorEmail'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: t('contact.toastSuccessTitle'),
      description: t('contact.toastSuccessDesc'),
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      product: "",
      message: ""
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold">
              {t('contact.pageTitle')} <span className="gradient-text">{t('contact.pageTitleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.pageSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {t('contact.formLabelName')} <span className="text-destructive">{t('contact.formRequired')}</span>
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: (e.target as HTMLInputElement).value })}
                        placeholder={t('contact.placeholderName')}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t('contact.formLabelEmail')} <span className="text-destructive">{t('contact.formRequired')}</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: (e.target as HTMLInputElement).value })}
                        placeholder={t('contact.placeholderEmail')}
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      {t('contact.formLabelCompany')}
                    </label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: (e.target as HTMLInputElement).value })}
                      placeholder={t('contact.placeholderCompany')}
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label htmlFor="product" className="block text-sm font-medium mb-2">
                      {t('contact.formLabelProduct')}
                    </label>
                    <Select value={formData.product} onValueChange={(value) => setFormData({ ...formData, product: value })}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder={t('contact.placeholderProduct')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">{t('contact.generalInquiry') || t('contact.generalInquiry')}</SelectItem>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('contact.formLabelMessage')} <span className="text-destructive">{t('contact.formRequired')}</span>
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: (e.target as HTMLTextAreaElement).value })}
                      placeholder={t('contact.placeholderMessage')}
                      rows={6}
                      required
                      className="bg-background resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('contact.buttonSending') : t('contact.buttonSend')}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('contact.emailCardTitle')}</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {t('contact.emailCardDesc')}
                </p>
                <a
                  href={`mailto:${t('contact.emailAddress')}`}
                  className="text-primary hover:underline font-medium"
                >
                  {t('contact.emailAddress')}
                </a>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('contact.supportCardTitle')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('contact.supportHoursWeekday')}
                  <br />
                  {t('contact.supportHoursWeekend')}
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t('contact.chatCardTitle')}</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {t('contact.chatCardDesc')}
                </p>
                <Button variant="outline" className="w-full">
                  {t('contact.chatButton')}
                </Button>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <CheckCircle className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">{t('contact.responseCardTitle')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('contact.responseCardDesc')}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
