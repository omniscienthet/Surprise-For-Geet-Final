import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import Welcome from "@/pages/welcome";
import Intro from "@/pages/intro";
import Landing from "@/pages/landing";
import CounterPage from "@/pages/counter";
import BirthdayWish from "@/pages/birthday-wish";
import RememberPage from "@/pages/remember";
import GalleryPage from "@/pages/gallery";
import AuthPage from "@/pages/auth-page";
import { useEffect } from "react";

// Auth Guard Component
function ProtectedRoute({
  component: Component,
}: {
  component: React.ComponentType;
}) {
  const [, setLocation] = useLocation();
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/user"],
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={AuthPage} />
      {/* Protect all other routes */}
      <Route
        path="/"
        component={() => <ProtectedRoute component={Welcome} />}
      />
      <Route
        path="/intro"
        component={() => <ProtectedRoute component={Intro} />}
      />
      <Route
        path="/main"
        component={() => <ProtectedRoute component={Landing} />}
      />
      <Route
        path="/counter"
        component={() => <ProtectedRoute component={CounterPage} />}
      />
      <Route
        path="/birthday-wish"
        component={() => <ProtectedRoute component={BirthdayWish} />}
      />
      <Route
        path="/remember"
        component={() => <ProtectedRoute component={RememberPage} />}
      />
      <Route
        path="/gallery"
        component={() => <ProtectedRoute component={GalleryPage} />}
      />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
