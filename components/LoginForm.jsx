"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import googleIcon from "./icons/google";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";
import API from "@/api/endpoints";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DatePicker } from "./DatePicker";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Sign In Credentials
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signinEmailError, setSigninEmailError] = useState("");
  const [signinPasswordError, setSigninPasswordError] = useState("");

  // Sign Up Credentials
  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupGender, setSignupGender] = useState("");
  const [signupDate, setSignupDate] = useState();
  const [signupPassword, setSignupPassword] = useState("");
  const [signupNameError, setSignupNameError] = useState("");
  const [signupUsernameError, setSignupUsernameError] = useState("");
  const [signupEmailError, setSignupEmailError] = useState("");
  const [signupGenderError, setSignupGenderError] = useState("");
  const [signupDateError, setSignupDateError] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");

  //  Validator functions
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSignin = async () => {
    let isValid = true;

    if (!signinEmail || !validateEmail(signinEmail)) {
      setSigninEmailError("Invalid email address");
      isValid = false;
    } else {
      setSigninEmailError("");
    }

    if (!signinPassword || !validatePassword(signinPassword)) {
      setSigninPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setSigninPasswordError("");
    }

    if (isValid) {
      const loginResponse = await API.login(signinEmail, signinPassword);
      if (loginResponse.ok) {
        // setting the token in cookies
        const token = await loginResponse.json();
        Cookies.set("token", token.token, { expires: 7 });
        toast.success("Logged in successfully", {
          duration: 3000,
        });
        router.push("/homepage");
      } else {
        // failed to log in
        toast.error("Invalid email or password", {
          duration: 3000,
        });
      }
    }
  };

  const handleSignup = async () => {
    let isValid = true;

    if (!signupName || signupName.trim() === "") {
      setSignupNameError("Name is required");
      isValid = false;
    } else {
      setSignupNameError("");
    }

    if (!signupUsername || signupUsername.trim() === "") {
      setSignupUsernameError("Username is required");
      isValid = false;
    } else {
      setSignupUsernameError("");
    }

    if (!signupEmail || !validateEmail(signupEmail)) {
      setSignupEmailError("Invalid email address");
      isValid = false;
    } else {
      setSignupEmailError("");
    }

    if (!signupGender) {
      setSignupGenderError("Gender is required");
      isValid = false;
    } else {
      setSignupGenderError("");
    }

    if (!signupDate) {
      setSignupDateError("Date of birth is required");
      isValid = false;
    } else {
      setSignupDateError("");
    }

    if (!signupPassword || !validatePassword(signupPassword)) {
      setSignupPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setSignupPasswordError("");
    }

    // if all fields are valid
    if (isValid) {
      // Creating a new user in backend
      const signupResponse = await API.register({
        name: signupName,
        username: signupUsername,
        email: signupEmail,
        gender: signupGender === "Male" ? "1" : "0",
        dob: signupDate,
        password: signupPassword,
      });

      // Signing in with new user credentials in backend
      console.log(signupResponse.status);
      if (signupResponse.status === 201) {
        const loginResponse = await API.login(signupEmail, signupPassword);
        if (loginResponse.ok) {
          // setting the token in cookies
          const { token } = await loginResponse.json();
          Cookies.set("token", token, { expires: 7 });
          toast.success("Welcome to Podverse", {
            duration: 3000,
          });
          router.push("/homepage");
        } else {
          // Failed to log in
          toast.error("Failed to log in", {
            duration: 3000,
          });
        }
      } else {
        // Failed to create user
        toast.error("Failed to create user", {
          duration: 3000,
        });
        console.log("Failed to create user");
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Tabs defaultValue="signin" className="w-full max-w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      {/* Sign In */}
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                onChange={(e) => setSigninEmail(e.target.value)}
                type="email"
                className={signinEmailError ? "border-red-500" : ""}
              />
              {signinEmailError && (
                <div className="text-red-500 text-xs">{signinEmailError}</div>
              )}
            </div>
            <div className="space-y-1">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  onChange={(e) => setSigninPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className={signinPasswordError ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {signinPasswordError && (
                <div className="text-red-500 text-xs">
                  {signinPasswordError}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={() => handleSignin()}>
              Sign In
            </Button>
            <div className="relative my-4 w-full">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                or continue with
              </span>
            </div>
            <Button variant="outline" className="w-full">
              {googleIcon}
              Sign in with Google
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* SIGN UP */}
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Enter Details Below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                type="text"
                onChange={(e) => setSignupName(e.target.value)}
                className={signupNameError ? "border-red-500" : ""}
              />
              {signupNameError && (
                <div className="text-red-500 text-xs">{signupNameError}</div>
              )}
            </div>
            <div className="space-y-1">
              <Label>Username</Label>
              <Input
                type="text"
                onChange={(e) => setSignupUsername(e.target.value)}
                className={signupUsernameError ? "border-red-500" : ""}
              />
              {signupUsernameError && (
                <div className="text-red-500 text-xs">
                  {signupUsernameError}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                onChange={(e) => setSignupEmail(e.target.value)}
                className={signupEmailError ? "border-red-500" : ""}
              />
              {signupEmailError && (
                <div className="text-red-500 text-xs">{signupEmailError}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                onValueChange={setSignupGender}
                required
                className={signupGenderError ? "border-red-500" : ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              {signupGenderError && (
                <div className="text-red-500 text-xs">{signupGenderError}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <DatePicker date={signupDate} setDate={setSignupDate} />
              {signupDateError && (
                <div className="text-red-500 text-xs">{signupDateError}</div>
              )}
            </div>
            <div className="space-y-1">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className={signupPasswordError ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {signupPasswordError && (
                <div className="text-red-500 text-xs">
                  {signupPasswordError}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={() => handleSignup()}>
              Sign Up
            </Button>
            <div className="relative my-4 w-full">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                or continue with
              </span>
            </div>
            <Button variant="outline" className="w-full">
              {googleIcon}
              Sign up with Google
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
