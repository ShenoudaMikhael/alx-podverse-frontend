"use client";
import API from "@/api/endpoints";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Image, UserRoundPen } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const page = () => {

  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    console.log('use effect called..!');
    API.isLoggedIn().then(result => {
      if (result.ok) {
        setLoaded(true)
      } else {
        location.href = '/';
      }
    })
  }, [])





  const [startDate, setStartDate] = useState(new Date('2024', '9', '20').toLocaleDateString());
  const [goLiveNow, setGoLiveNow] = useState(false);
  const [title, setTitle] = useState("Test");
  const [description, setDescription] = useState("test");
  const [category, setCategory] = useState("test");
  const [imageObject, setImageObject] = useState(null);
  const imageObjectRef = useRef();
  const [imageName, setImageName] = useState("");

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    imageObjectRef.current = selectedFile;
    setImageObject(selectedFile);
    setImageName(selectedFile.name); // Update file name state
  };


  const submitForm = () => {
    console.log(imageObjectRef.current)
    const data = new FormData();

    data.append('data', JSON.stringify({
      title,
      description,
      start_date: startDate,
      cat_id: 1,
      is_live: goLiveNow,
      imageName: imageName
    }));
    data.append('file', imageObject);
    console.log(data)

    API.createPodcast(data).then(async (response) => {
      //handle correct response
      console.log(response);
      const result = await response.json()

      if (goLiveNow) {
        location.href = `/podcast/${result.podcast.uuid}`
      }

    })

  }



  return !loaded ? <><h1>Loading...</h1></> : (
    <div className="min-h-screen">
      <Navbar />
      <div className="h-[calc(100vh-3.5rem)] p-10">
        <div className="flex flex-col gap-6 justify-center h-full max-w-[500px] mx-auto">
          <h1 className="text-3xl font-bold text-center">Create New Podcast</h1>
          <div>
            <Label className="text-md">Title *</Label>
            <Input onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Description field */}
          <div>
            <Label className="text-md">Description *</Label>
            <Input onChange={(e) => setDescription(e.target.value)} />
          </div>
          {/* Category field */}
          <div>
            <Label className="text-md">Category *</Label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
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

            <Popover>
              <PopoverTrigger disabled={goLiveNow} asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!startDate && "text-muted-foreground"
                    } `}
                >
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(e) => setStartDate(format(e, "yyyy-MM-dd"))}
                  disabled={(startDate) =>
                    startDate > new Date() || startDate < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
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
                className="sr-only"
                onChange={handleImageUpload}
              />
            </Label>
          </div>
          <Button
            onClick={submitForm}
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
