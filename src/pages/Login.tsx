import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded login - just navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Вхід до кабінету експерта</CardTitle>
            <CardDescription>
              Увійдіть до свого облікового запису та почніть роботу
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Електронна пошта</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <a href="#" className="text-sm text-primary hover:underline">
                Забули пароль?
              </a>
            </div>
            <Button type="submit" className="w-full h-12 text-base font-semibold">
              ВХІД
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Не маєте акаунту?{" "}
              <a href="#" className="text-primary hover:underline">
                Зареєструватися
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
