import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { UserContext } from '../../context/userContext';
import { API_PATHS } from '../../utils/apipath';
import { validateEmail } from '../../utils/helper';
import { uploadImage } from '../../utils/uploadImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import GoogleOAuthButton from '@/components/Auth/GoogleOAuthButton';
import SpinnerLoader from '@/components/Loader/SpinnerLoader';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { AlertCircle } from 'lucide-react';

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName) { setError("Please enter full name."); return; }
    if (!validateEmail(email)) { setError("Please enter a valid email address."); return; }
    if (!password) { setError("Please enter the password"); return; }

    setError("");
    setLoading(true);

    try {
      let profileImageUrl = "";
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imgUrl || "";
      }

      const response = await axios.post(`${baseUrl}${API_PATHS.AUTH.REGISTER}`,
        { name: fullName, email, password, profileImageUrl },
        { withCredentials: true }
      );

      if (response.data.success === false) {
        setError(response.data.message || "Registration failed.");
        return;
      }
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none bg-background md:bg-card md:border md:border-border">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join our community of engineers mastering their craft.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="flex justify-center mb-6">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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
            {loading ? <SpinnerLoader /> : "CREATE ACCOUNT"}
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
          Already have an account?{" "}
          <button
            className="text-primary font-medium hover:underline"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUp;