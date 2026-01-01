import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import SplashCursor from "@/components/SplashCursor";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

const getRandomGradient = () => {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
    "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
    "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [gradient, setGradient] = useState(getRandomGradient());
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // No longer need useEffect for initial random gradient as it's set in useState
  // But if the user navigates away and back, it will re-randomize

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/login", {
        username: values.username,
        password: values.password,
        // The backend uses session cookies. If rememberMe is false, we should ensure the session is short.
      });

      await queryClient.invalidateQueries({ queryKey: ["/api/user"] });

      toast({
        title: "Welcome back, Geet!",
        description: ":)",
      });

      // 2. Smoothly navigate to the first page
      setLocation("/");
      // Use window.location.assign to force a hard navigation which resets the app state
      setTimeout(() => {
        window.location.assign("/");
      }, 100);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Invalid credentials. Are you really Geet?",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden transition-colors duration-1000"
      style={{ background: gradient }}
    >
      <div className="absolute inset-0 z-0">
        <SplashCursor TRANSPARENT={true} BACK_COLOR={{ r: 0, g: 0, b: 0 }} />
      </div>

      <Card className="w-full max-w-md mx-4 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl relative z-10 hover:bg-white/5 transition-colors duration-500">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-white tracking-tight">
            Something Special ? Yeah :)
          </CardTitle>
          <p className="text-center text-white/70 text-sm">
            Please identify yourself
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Who are you?"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="The secret code"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-purple-900"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium leading-none text-white/70 cursor-pointer">
                        Stay logged in
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-white text-purple-900 hover:bg-white/90 font-bold shadow-lg transition-all duration-300 hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Unlock Surprise"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
