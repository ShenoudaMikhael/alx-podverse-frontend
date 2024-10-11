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
import { CalendarIcon, UploadIcon, Image } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

const EditPodcastDialog = ({
  title,
  description,
  category,
  imageUrl,
  startDate,
  upcomingPodcasts,
  setUpcomingPodcasts,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(category);
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);
  const [newImageObject, setNewImageObject] = useState(null);
  const [newImageName, setNewImageName] = useState("");
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [editPodcastDialogOpen, setEditPodcastDialogOpen] = useState(false);

  const handleSave = () => {
    setUpcomingPodcasts(
      upcomingPodcasts.map((podcast) =>
        podcast.title === title
          ? {
              ...podcast,
              title: newTitle ? newTitle : podcast.title,
              description: newDescription
                ? newDescription
                : podcast.description,
              category: newCategory ? newCategory : podcast.category,
              imageUrl: newImageUrl ? newImageUrl : podcast.imageUrl,
              startDate: newStartDate ? newStartDate : podcast.startDate,
            }
          : podcast
      )
    );
    setEditPodcastDialogOpen(false);
  };

  const handlePodcastImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImageUrl(URL.createObjectURL(file));
      setNewImageObject(file);
      setNewImageName(file.name);
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
            <Label className="text-right">Title</Label>
            <Input
              defaultValue={title}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          {/* Description field */}
          <div>
            <Label className="text-right">Description</Label>
            <Input
              defaultValue={description}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          {/* Category field */}
          <div>
            <Label>Category</Label>
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

          {/* Start Date field */}
          <div>
            <Label className="text-md">Start Date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !newStartDate && "text-muted-foreground"
                  } `}
                >
                  {newStartDate ? newStartDate : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newStartDate}
                  onSelect={(e) => setNewStartDate(format(e, "yyyy-MM-dd"))}
                  disabled={(newStartDate) =>
                    newStartDate < new Date() ||
                    newStartDate < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Image field */}
          <div>
            <Label>
              Podcast Picture
              <div className="flex items-center gap-2 cursor-pointer border-2 border-dashed p-4">
                <Image />
                {newImageName === "" ? "Upload New Picture" : newImageName}
              </div>
              <Input
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
