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
import { UploadIcon } from "lucide-react";

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

  const handleSave = () => {
    setUpcomingPodcasts(
      upcomingPodcasts.map((podcast) =>
        podcast.title === title
          ? {
              ...podcast,
              title: newTitle,
              description: newDescription,
              category: newCategory,
              imageUrl: newImageUrl,
            }
          : podcast
      )
    );
    setEditPodcastDialogOpen(false);
  };
  const handlePodcastImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
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
          <DialogDescription>
            Make changes to your podcast here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        {/* Title field */}
        <div className="flex flex-col gap-4 py-4">
          <div>
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              defaultValue={title}
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
              defaultValue={description}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          {/* Category field */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select defaultValue={category} onValueChange={setNewCategory}>
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
          <div>
            <Label htmlFor="podcastpicture">
              <div className="cursor-pointer border-2 border-dashed p-4">
                Upload New Picture
              </div>
              <Input
                id="podcastpicture"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handlePodcastImageChange}
              />
            </Label>
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
