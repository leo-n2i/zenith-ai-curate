import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { LogOut, User, Mail, Calendar, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully',
    });
    navigate('/login');
  };

  const userName = user?.user_metadata?.name || 'User';
  const userEmail = user?.email || '';
  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10">
        <nav className="border-b border-border/50 glass-effect">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                <span className="text-background font-extrabold text-xl font-montserrat">T</span>
              </div>
              <span className="font-extrabold text-2xl gradient-text font-montserrat tracking-tight">TagerAi</span>
            </div>

            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-primary/20 hover:bg-primary/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="animate-fade-in">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Dashboard
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 font-montserrat">
                Welcome back, <span className="gradient-text">{userName}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage your account and explore AI solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 font-montserrat">Profile</h3>
                    <p className="text-muted-foreground text-sm mb-2">Your account information</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-semibold">Name:</span> {userName}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">User ID:</span> {user?.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 font-montserrat">Email</h3>
                    <p className="text-muted-foreground text-sm mb-2">Your contact information</p>
                    <p className="text-sm break-all">{userEmail}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 font-montserrat">Member Since</h3>
                    <p className="text-muted-foreground text-sm mb-2">Account creation date</p>
                    <p className="text-sm">{createdAt}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 font-montserrat">Account Status</h3>
                    <p className="text-muted-foreground text-sm mb-2">Current membership</p>
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                      Active
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4 font-montserrat">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    onClick={() => navigate('/products')}
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    Browse Products
                  </Button>
                  <Button
                    onClick={() => navigate('/bundles')}
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    View Bundles
                  </Button>
                  <Button
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
