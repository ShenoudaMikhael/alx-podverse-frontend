"use client";
import React, { useState, useEffect } from "react";
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
import { Image } from "lucide-react";
import { DateTimePicker } from "./DateTimePicker";
import API from "@/api/endpoints";
import { toast } from "sonner";

const getCategoryIdByName = (categoryName, categoriesList) => {
  const category = categoriesList.find((cat) => cat.name === categoryName);
  return category ? category.id : null;
};

const getCategoryNameById = (id, categoriesList) => {
  const category = categoriesList.find((cat) => cat.id === id);
  return category ? category.name : null;
};

const EditPodcastDialog = ({
  id,
  title,
  description,
  category,
  imageUrl,
  startDate,
  categories,
  upcomingPodcasts,
  setUpcomingPodcasts,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(
    getCategoryIdByName(category, categories)
  );
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);
  const [newImageObject, setNewImageObject] = useState(null);
  const [newImageName, setNewImageName] = useState("");
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [editPodcastDialogOpen, setEditPodcastDialogOpen] = useState(false);

  // Effect to reset state values to original props when the dialog opens
  useEffect(() => {
    if (!editPodcastDialogOpen) {
      setNewTitle(title);
      setNewDescription(description);
      setNewCategory(getCategoryIdByName(category, categories));
      setNewImageUrl(imageUrl);
      setNewImageObject(null);
      setNewImageName("");
      setNewStartDate(startDate);
    }
  }, [
    editPodcastDialogOpen,
    title,
    description,
    category,
    imageUrl,
    startDate,
    categories,
  ]);

  const handleSave = () => {
    const form = new FormData();
    form.append(
      "data",
      JSON.stringify({
        title: newTitle ? newTitle : title,
        description: newDescription ? newDescription : description,
        cat_id: newCategory ? newCategory : getCategoryIdByName(category),
        start_date: newStartDate ? newStartDate : startDate,
      })
    );

    if (newImageObject) {
      form.append("file", newImageObject);
    }
    API.updatePodcast(id, form).then((response) => {
      if (response.status === 200) {
        toast.success("Podcast updated successfully");
        setUpcomingPodcasts(
          upcomingPodcasts.map((podcast) =>
            podcast.title === title
              ? {
                  ...podcast,
                  title: newTitle ? newTitle : podcast.title,
                  description: newDescription
                    ? newDescription
                    : podcast.description,
                  category: newCategory
                    ? getCategoryNameById(newCategory, categories)
                    : podcast.category,
                  imageUrl: newImageUrl ? newImageUrl : podcast.imageUrl,
                  startDate: newStartDate ? newStartDate : podcast.startDate,
                }
              : podcast
          )
        );
        setEditPodcastDialogOpen(false);
      } else {
        toast.error("Failed to update podcast");
      }
    });
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
        <DialogHeader>
          <DialogTitle className="text-center">Edit podcast</DialogTitle>
          <DialogDescription>
            Make changes to your podcast here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div>
            <Label className="text-right">Title</Label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-right">Description</Label>
            <Input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-md">Start Date</Label>
            <DateTimePicker date={newStartDate} setDate={setNewStartDate} />
          </div>

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

        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPodcastDialog;
