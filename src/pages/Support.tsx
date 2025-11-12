import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Mail, MessageSquare, BookOpen, HelpCircle, Send } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';

const Support = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'general',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement ticket submission to Supabase or email service
      console.log('Support ticket:', {
        user_email: user?.email,
        subject: formData.subject,
        message: formData.message,
        category: formData.category,
        timestamp: new Date().toISOString(),
      });

      toast.success('Support ticket submitted! We\'ll get back to you soon.');
      setFormData({
        subject: '',
        message: '',
        category: 'general',
      });
    } catch (error) {
      toast.error('Failed to submit support ticket');
      console.error('Support submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. Follow the instructions sent to your email.',
    },
    {
      question: 'How do I upgrade my plan?',
      answer: 'Visit the Billing section in your dashboard to view available plans and upgrade your subscription anytime.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and other digital payment methods through Stripe.',
    },
    {
      question: 'How can I cancel my subscription?',
      answer: 'You can cancel your subscription anytime from the Billing section. Your access will continue until the end of your billing period.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 14-day free trial for new users. No credit card required to start.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee if you\'re not satisfied with our service.',
    },
  ];

  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of using YourOps.ai',
      link: '#',
      icon: BookOpen,
    },
    {
      title: 'API Documentation',
      description: 'Integrate YourOps.ai with your applications',
      link: '#',
      icon: HelpCircle,
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      link: '#',
      icon: MessageSquare,
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users and share knowledge',
      link: '#',
      icon: Mail,
    },
  ];

  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-background">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-montserrat font-bold text-foreground mb-2">
                Support Center
              </h1>
              <p className="text-grey-light font-montserrat">
                We're here to help. Find answers or contact our support team.
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="contact" className="font-montserrat">
                  Contact Us
                </TabsTrigger>
                <TabsTrigger value="faq" className="font-montserrat">
                  FAQ
                </TabsTrigger>
                <TabsTrigger value="resources" className="font-montserrat">
                  Resources
                </TabsTrigger>
              </TabsList>

              {/* Contact Us Tab */}
              <TabsContent value="contact" className="space-y-6">
                <Card className="bg-grey-dark border-grey-dark">
                  <CardHeader>
                    <CardTitle className="font-montserrat">Submit a Support Ticket</CardTitle>
                    <CardDescription className="font-montserrat">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Category */}
                      <div className="space-y-2">
                        <Label htmlFor="category" className="font-montserrat">
                          Category
                        </Label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-grey-dark text-foreground font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="billing">Billing Issue</option>
                          <option value="technical">Technical Issue</option>
                          <option value="feature">Feature Request</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="font-montserrat">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief description of your issue"
                          className="bg-background border-grey-dark font-montserrat"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="font-montserrat">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please provide as much detail as possible..."
                          rows={6}
                          className="bg-background border-grey-dark font-montserrat resize-none"
                        />
                      </div>

                      {/* Contact Info Display */}
                      <div className="p-4 bg-background rounded-lg border border-grey-dark">
                        <p className="text-sm text-grey-light font-montserrat mb-1">
                          We'll respond to:
                        </p>
                        <p className="font-montserrat text-foreground font-medium">
                          {user?.email}
                        </p>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 font-montserrat font-semibold"
                      >
                        {loading ? (
                          'Submitting...'
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Support Ticket
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-4">
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="bg-grey-dark border-grey-dark hover:border-primary/50 transition-colors">
                      <CardContent className="pt-6">
                        <details className="space-y-2">
                          <summary className="font-montserrat font-semibold text-foreground cursor-pointer hover:text-primary transition-colors">
                            {faq.question}
                          </summary>
                          <p className="text-grey-light font-montserrat pt-2">
                            {faq.answer}
                          </p>
                        </details>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => {
                    const IconComponent = resource.icon;
                    return (
                      <Card key={index} className="bg-grey-dark border-grey-dark hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-montserrat font-semibold text-foreground mb-1">
                                {resource.title}
                              </h3>
                              <p className="text-sm text-grey-light font-montserrat mb-3">
                                {resource.description}
                              </p>
                              <a
                                href={resource.link}
                                className="text-primary font-montserrat font-medium text-sm hover:underline"
                              >
                                Learn more →
                              </a>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>

            {/* Contact Info Footer */}
            <Card className="mt-8 bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-montserrat font-semibold text-foreground mb-2">
                      Email Support
                    </h3>
                    <a href="mailto:support@yourops.ai" className="text-primary font-montserrat hover:underline">
                      support@yourops.ai
                    </a>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-foreground mb-2">
                      Response Time
                    </h3>
                    <p className="text-grey-light font-montserrat">
                      24 hours or less
                    </p>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-foreground mb-2">
                      Availability
                    </h3>
                    <p className="text-grey-light font-montserrat">
                      Monday - Friday, 9 AM - 6 PM UTC
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
