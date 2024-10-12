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
import { CalendarIcon, Edit } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { toast } from "sonner";
import API from "@/api/endpoints";

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

  // Save original values when the dialog opens
  const handleDialogOpenChange = (isOpen) => {
    if (isOpen) {
      // If opening, store the original values
      setNewName(name);
      setNewUsername(username);
      setNewEmail(email);
      setNewDOB(DOB);
      setNewGender(gender);
    } else {
      // If closing, reset to original values (discard unsaved changes)
      setNewName(name);
      setNewUsername(username);
      setNewEmail(email);
      setNewDOB(DOB);
      setNewGender(gender);
    }
    setEditProfileDialogOpen(isOpen);
  };

  const handleSave = async () => {
    setName(newName);
    setUsername(newUsername);
    setEmail(newEmail);
    setDOB(newDOB);
    setGender(newGender);
    setEditProfileDialogOpen(false);
    const response = await API.updateProfile({
      name: newName === "" ? name : newName,
      username: newUsername === "" ? username : newUsername,
      email: newEmail === "" ? email : newEmail,
      dob: newDOB === "" ? DOB : newDOB,
      gender: newGender === "" ? gender : newGender === "Male" ? "1" : "0",
    });
    if (response.ok) {
      toast.success("Profile updated successfully", {
        duration: 3000,
      });
      setEditProfileDialogOpen(false);
    } else {
      toast.error("Failed to update profile", {
        duration: 3000,
      });
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const response = await API.updatePassword(oldPassword, newPassword);
      if (response.ok) {
        toast.success("Password changed successfully");
      } else {
        toast.error("Failed to change password");
      }
      setEditProfileDialogOpen(false);
    }
  };
  return (
    <Dialog
      open={editProfileDialogOpen}
      onOpenChange={handleDialogOpenChange} // Handle dialog open/close
    >
      <DialogTrigger asChild>
        <Button size="sm" className="font-light flex gap-2">
          <Edit className="h-5 w-5" />
          <p>Edit profile</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Edit profile"
        className="rounded-xl max-w-[95vw] sm:max-w-[425px]"
      >
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-center">Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account Details</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>

          {/* Account details tab */}
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

              {/* Date of Birth field */}
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !newDOB && "text-muted-foreground"
                      } `}
                    >
                      {newDOB ? (
                        format(newDOB, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newDOB}
                      onSelect={(e) => setNewDOB(format(e, "yyyy-MM-dd"))}
                      disabled={(newDOB) =>
                        newDOB > new Date() || newDOB < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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

          {/* Password tab */}
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
