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
  const [newPassword, setNewPassword] = useState(password);
  const [newDOB, setNewDOB] = useState(DOB);
  const [newGender, setNewGender] = useState(gender);
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);

  const handleSave = () => {
    console.log(newDOB);
    setName(newName);
    setUsername(newUsername);
    setEmail(newEmail);
    setPassword(newPassword);
    setDOB(newDOB);
    setGender(newGender);
    setEditProfileDialogOpen(false);
    console.log("Profile updated");
  };
  return (
    <Dialog
      open={editProfileDialogOpen}
      onOpenChange={setEditProfileDialogOpen}
    >
      <DialogTrigger asChild>
        <Button size="sm" className="relative font-light flex gap-2">
          <p>Edit profile</p>
          <Edit className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Edit profile"
        className="rounded-xl max-w-[80vw] sm:max-w-[425px]"
      >
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-center">Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {/* Name field */}
        <div className="flex flex-col gap-4 py-4">
          <div>
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          {/* Username field */}
          <div>
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={`@${newUsername}`}
              onChange={(e) => setNewUsername(e.target.value.replace("@", ""))}
            />
          </div>

          {/* Email field */}
          <div>
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              disabled
              id="email"
              value={newEmail}
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* DOB field */}
          <div>
            <Label htmlFor="dob" className="text-right">
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              value={newDOB}
              onChange={(e) => setNewDOB(e.target.value)}
            />
          </div>

          {/* Gender field */}
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={newGender} onValueChange={setNewGender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Save button */}
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
