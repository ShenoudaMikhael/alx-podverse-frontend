"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/select";
import { Edit } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EditProfileDialog = ({
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  DOB,
  setDOB,
  gender,
  setGender,
}) => {
  const [newName, setNewName] = useState(name);
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newDOB, setNewDOB] = useState(DOB);
  const [newGender, setNewGender] = useState(gender);
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    setName(newName);
    setUsername(newUsername);
    setEmail(newEmail);
    setDOB(newDOB);
    setGender(newGender);
    setEditProfileDialogOpen(false);
    console.log(newName, newUsername, newEmail, newGender, newDOB);
    console.log("Profile updated");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Password changed");
  };
  return (
    <Dialog
      open={editProfileDialogOpen}
      onOpenChange={setEditProfileDialogOpen}
    >
      <DialogTrigger asChild>
        <Button size="sm" className="font-light flex gap-2">
          <Edit className="h-5 w-5" />
          <p>Edit profile</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Edit profile"
        className="rounded-xl sm:max-w-[425px]"
      >
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-center">Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account Details</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            {/* Name field */}
            <div className="flex flex-col gap-4 py-4">
              <div>
                <Label className="text-right">Name</Label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              {/* Username field */}
              <div>
                <Label className="text-right">Username</Label>
                <Input
                  value={`@${newUsername}`}
                  onChange={(e) =>
                    setNewUsername(e.target.value.replace("@", ""))
                  }
                />
              </div>

              {/* Email field */}
              <div>
                <Label className="text-right">Email</Label>
                <Input disabled value={newEmail} className="col-span-3" />
              </div>

              {/* DOB field */}
              <div>
                <Label className="text-right">Date of Birth</Label>
                <Input
                  type="date"
                  value={newDOB}
                  onChange={(e) => setNewDOB(e.target.value)}
                />
              </div>

              {/* Gender field */}
              <div>
                <Label>Gender</Label>
                <Select value={newGender} onValueChange={setNewGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Save button */}
              <Button onClick={handleSave}>Save changes</Button>
            </div>
          </TabsContent>
          <TabsContent value="password">
            {/* Password field */}
            <div className="flex flex-col gap-4 py-4">
              <div>
                <Label className="text-right">Old Password</Label>
                <Input
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-right">New Password</Label>
                <Input
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-right">Confirm New Password</Label>
                <Input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button onClick={handlePasswordChange}>Change Password</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
