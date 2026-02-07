import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { API_PATHS } from '../../utils/apipath';
import { validateEmail } from '../../utils/helper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import GoogleOAuthButton from '@/components/Auth/GoogleOAuthButton';
import SpinnerLoader from '@/components/Loader/SpinnerLoader';
import { AlertCircle } from 'lucide-react';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl}${API_PATHS.AUTH.LOGIN}`,
        { email, password },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success === false) {
        setError(response.data.message || "Login failed.");
        return;
      }
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none bg-background md:bg-card md:border md:border-border">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full font-bold" disabled={loading}>
            {loading ? <SpinnerLoader /> : "LOGIN"}
          </Button>
        </form>

        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-muted-foreground text-xs uppercase tracking-widest">Or continue with</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <GoogleOAuthButton text="Google" />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            className="text-primary font-medium hover:underline"
            onClick={() => setCurrentPage("signUp")}
          >
            Sign Up
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;