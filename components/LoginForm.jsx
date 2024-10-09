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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Sign In Credentials
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  // Sign Up Credentials
  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupGender, setSignupGender] = useState("");
  const [signupDate, setSignupDate] = useState();
  const [signupPassword, setSignupPassword] = useState("");

  const handleSignin = () => {
    console.log(signinEmail, signinPassword);
  };
  const handleSignup = () => {
    console.log(
      signupName,
      signupUsername,
      signupEmail,
      signupGender,
      signupDate,
      signupPassword
    );
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <Tabs defaultValue="signin" className="w-[400px]">
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
              <Label htmlFor="signin-email">Email</Label>
              <Input
                onChange={(e) => setSigninEmail(e.target.value)}
                id="signin-email"
                type="email"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signin-password">Password</Label>
              <div className="relative">
                <Input
                  onChange={(e) => setSigninPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  id="signin-password"
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
              <Label htmlFor="signup-name">Name</Label>
              <Input
                id="signup-name"
                type="text"
                onChange={(e) => setSignupName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signup-username">Username</Label>
              <Input
                id="signup-username"
                type="text"
                onChange={(e) => setSignupUsername(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-gender">Gender</Label>
              <Select onValueChange={setSignupGender} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !signupDate && "text-muted-foreground"
                    }`}
                  >
                    {signupDate ? (
                      format(signupDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={signupDate}
                    onSelect={(e) => setSignupDate(format(e, "yyyy-MM-dd"))}
                    disabled={(signupDate) =>
                      signupDate > new Date() ||
                      signupDate < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-1">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  onChange={(e) => setSignupPassword(e.target.value)}
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
