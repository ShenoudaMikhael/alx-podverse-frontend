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

const EditPodcastDialog = ({
  title,
  description,
  category,
  imageUrl,
  isLive,
  upcomingPodcasts,
  setUpcomingPodcasts,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(category);
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);
  const [editPodcastDialogOpen, setEditPodcastDialogOpen] = useState(false);

  const handleSave = () => {};
  return (
    <Dialog
      open={editPodcastDialogOpen}
      onOpenChange={setEditPodcastDialogOpen}
    >
      <DialogTrigger asChild>
        <Button size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl max-w-[80vw] sm:max-w-[425px]">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-center">Edit podcast</DialogTitle>
        </DialogHeader>

        {/* Title field */}
        <div className="flex flex-col gap-4 py-4">
          <div>
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          {/* Description field */}
          <div>
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          {/* Category field */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Politics">Politics</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
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

export default EditPodcastDialog;
