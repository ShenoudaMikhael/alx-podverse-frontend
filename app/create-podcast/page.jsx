"use client";
import API from "@/api/endpoints";
import { DateTimePicker } from "@/components/DateTimePicker";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    categoryID: "",
  });

  useEffect(() => {
    console.log("use effect called..!");
    API.isLoggedIn().then((result) => {
      if (result.ok) {
        // check if user already has a live podcast
        API.getAllPodcasts().then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              API.getProfile().then((res) => {
                if (res.ok) {
                  res.json().then((profile) => {
                    for (const podcast of data.podcasts) {
                      if (
                        profile.id === podcast.user.id &&
                        podcast.is_live === true
                      ) {
                        toast.success("You already have a live podcast");
                        router.push(`/podcast/${podcast.uuid}`);
                      }
                    }
                  });
                }
              });
            });
          }
        });

        // get categories
        API.getCategories().then((result) => {
          if (result.ok) {
            result.json().then((data) => {
              setCategoriesList(data);
            });
          }
        });
        setLoaded(true);
      } else {
        router.push(`/?redirect=${encodeURIComponent(pathname)}`);
      }
    });
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [goLiveNow, setGoLiveNow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryID, setCategoryID] = useState();
  const [imageObject, setImageObject] = useState(null);
  const imageObjectRef = useRef();
  const [imageName, setImageName] = useState("");

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      imageObjectRef.current = selectedFile;
      setImageObject(selectedFile);
      setImageName(selectedFile.name); // Update file name state
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: "",
      description: "",
      categoryID: "",
    };

    if (title.trim() === "") {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (description.trim() === "") {
      newErrors.description = "Description is required";
      valid = false;
    }

    if (!categoryID) {
      newErrors.categoryID = "Please select a category";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitForm = () => {
    // Run form validation
    if (!validateForm()) {
      return;
    }

    console.log(imageObjectRef.current);
    const data = new FormData();

    data.append(
      "data",
      JSON.stringify({
        title,
        description,
        start_date: startDate,
        cat_id: categoryID,
        is_live: goLiveNow,
        imageName: imageName,
      })
    );
    data.append("file", imageObject);
    console.log(data);

    API.createPodcast(data).then(async (response) => {
      //handle correct response
      console.log(response);
      const result = await response.json();
      console.log(result);
      if (goLiveNow) {
        router.push(`/podcast/${result.podcast.uuid}`);
      } else {
        router.push("/homepage");
      }
    });
  };

  return !loaded ? (
    <LoadingScreen text="Loading..." />
  ) : (
    <div className="min-h-screen">
      <Navbar />
      <div className="h-[calc(100vh-3.5rem)] p-10">
        <div className="flex flex-col gap-6 justify-center h-full max-w-[500px] mx-auto">
          <h1 className="text-3xl font-bold text-center">Create New Podcast</h1>

          {/* Title Field with Validation */}
          <div>
            <Label className="text-md">Title *</Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description Field with Validation */}
          <div>
            <Label className="text-md">Description *</Label>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Category Field with Validation */}
          <div>
            <Label className="text-md">Category *</Label>
            <Select onValueChange={(value) => setCategoryID(value)}>
              <SelectTrigger
                className={errors.categoryID ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesList.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryID && (
              <p className="text-red-500 text-sm">{errors.categoryID}</p>
            )}
          </div>

          {/* Start Date Picker */}
          <div>
            <Label className="text-md">Start Date</Label>
            <div className="flex items-center gap-2 my-2">
              <Checkbox
                checked={goLiveNow}
                onCheckedChange={(goLiveNow) => {
                  setGoLiveNow(goLiveNow);
                }}
              />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Go Live Now
              </label>
            </div>
            <DateTimePicker
              date={startDate}
              setDate={setStartDate}
              disabled={goLiveNow}
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <Label>
              Podcast Picture
              <div className="flex items-center gap-2 cursor-pointer border-2 border-dashed p-4">
                <Image />
                {imageName === "" ? "Upload New Picture" : imageName}
              </div>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </Label>
          </div>

          {/* Submit Button */}
          <Button onClick={submitForm}>Save changes</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
