"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit, UserRoundPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProfilePastPodcastCard from "@/components/ProfilePastPodcastCard";
import ProfileUpcomingPodcastCard from "@/components/ProfileUpcomingPodcastCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditProfileDialog from "@/components/EditProfileDialog";
import ProfileList from "@/components/ProfileList";

const podcasts = [
  {
    title: "Live Tech Talk",
    description: "Stay updated with the latest in technology and gadgets.",
    host: "John Doe",
    listeners: "1.2k",
    category: "Technology",
    imageUrl: "https://placehold.co/1470x980/jpg",
    isLive: true,
    startDate: "2022-09-01",
  },
  {
    title: "Science Today",
    description: "Exploring the wonders of science and new discoveries.",
    host: "Jane Smith",
    listeners: "950",
    category: "Science",
    imageUrl: "https://placehold.co/1470x980/jpg",
    isLive: false,
    startDate: "2022-09-01",
  },
  {
    title: "Entertainment Weekly",
    description: "Your weekly dose of movies, music, and pop culture.",
    host: "Alice Johnson",
    listeners: "1.5k",
    category: "Entertainment",
    imageUrl: "https://placehold.co/1470x980/jpg",
    isLive: false,
    startDate: "2022-09-01",
  },
  {
    title: "Political Roundup",
    description: "A deep dive into the latest political news and events.",
    host: "Bob Williams",
    listeners: "800",
    category: "Politics",
    imageUrl: "https://placehold.co/1470x980/jpg",
    isLive: false,
    startDate: "2022-09-01",
  },
  {
    title: "Health & Wellness",
    description: "Tips for a healthier and happier life.",
    host: "Sarah Lee",
    listeners: "1.3k",
    category: "Health",
    imageUrl: "https://placehold.co/1470x980/jpg",
    isLive: false,
    startDate: "2022-09-01",
  },
  {
    title: "Business Buzz",
    description: "Insights into the business world and market trends.",
    host: "Michael Green",
    listeners: "1.1k",
    category: "Business",
    imageUrl: "https://placehold.co/1470x980/jpg",
    isLive: false,
    startDate: "2022-09-01",
  },
  {
    title: "History Uncovered",
    description: "Exploring the events and figures that shaped the world.",
    host: "Robert Black",
    listeners: "750",
    category: "History",
    imageUrl: "https://placehold.co/1470x980/jpg",
    isLive: false,
    startDate: "2022-09-01",
  },
  {
    title: "True Crime Chronicles",
    description: "Real-life crime stories and unsolved mysteries.",
    host: "Laura White",
    listeners: "2.0k",
    category: "True Crime",
    imageUrl: "https://placehold.co/1470x980/jpg",
    isLive: false,
    startDate: "2022-09-01",
  },
];

const page = () => {
  const [profilePicture, setProfilePicture] = useState(
    "https://avatar.iran.liara.run/public"
  );
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [name, setName] = useState("Abdelrahman Hany");
  const [username, setUsername] = useState("abduuhany");
  const [email, setEmail] = useState("abdu.hany@gmail.com");
  const [password, setPassword] = useState("123456");
  const [DOB, setDOB] = useState("2022-01-02");
  const [gender, setGender] = useState("Male");
  const [pastPodcasts, setPastPodcasts] = useState(podcasts);
  const [upcomingPodcasts, setUpcomingPodcasts] = useState(podcasts);

  const [followersList, setFollowersList] = useState([
    { name: "Follower 01", image: "https://avatar.iran.liara.run/public" },
    { name: "Follower 02", image: "https://avatar.iran.liara.run/public" },
    { name: "Follower 03", image: "https://avatar.iran.liara.run/public" },
  ]);
  const [followingsList, setFollowingsList] = useState([
    { name: "Following 01", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 02", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 03", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 04", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 05", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 06", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 07", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 08", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 09", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 10", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 11", image: "https://avatar.iran.liara.run/public" },
    { name: "Following 12", image: "https://avatar.iran.liara.run/public" },
  ]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };
  return (
    <>
      <Navbar />
      {/* Profile Card */}
      <div className="h-[calc(100vh-3.5rem)]">
        <div className="w-full  px-4 md:px-10 py-4">
          <Card className="mx-auto max-w-[250px]">
            <CardHeader className="relative justify-center items-center">
              {/* Avatar Image */}
              <Avatar className="w-32 h-32 mb-2">
                <AvatarImage src={profilePicture}></AvatarImage>
              </Avatar>
              {/* Change Profile Picture Button */}
              <Label className="absolute top-[120px] right-[70px] cursor-pointer">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <UserRoundPen className="h-5 w-5 mx-auto my-auto" />
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleProfilePictureChange}
                />
              </Label>

              {/* Name & Username */}
              <h1 className="text-xl font-bold">{name}</h1>
              <h2>@{username}</h2>
            </CardHeader>

            {/* Edit Profile Dialog */}
            <CardContent className="flex flex-col justify-center items-center gap-4">
              <EditProfileDialog
                name={name}
                setName={setName}
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                DOB={DOB}
                setDOB={setDOB}
                gender={gender}
                setGender={setGender}
              />
              {/* Followers & Following List */}
              <div className="flex w-full justify-around">
                <ProfileList listName="Followers" list={followersList} />
                <ProfileList listName="Following" list={followingsList} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current/Upcoming Podcasts */}
        <div className="w-full p-4 md:p-10 flex flex-col gap-4">
          <h1 className="text-xl font-bold">Current/Upcoming Podcasts</h1>
          <div className="px-10">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {upcomingPodcasts.map((podcast, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                  >
                    <ProfileUpcomingPodcastCard
                      title={podcast.title}
                      description={podcast.description}
                      host={podcast.host}
                      listeners={podcast.listeners}
                      category={podcast.category}
                      imageUrl={podcast.imageUrl}
                      isLive={podcast.isLive}
                      startDate={podcast.startDate}
                      upcomingPodcasts={upcomingPodcasts}
                      setUpcomingPodcasts={setUpcomingPodcasts}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        {/* Past Podcasts */}
        <div className="w-full p-4 md:p-10 flex flex-col gap-4">
          <h1 className="text-xl font-bold">Past Podcasts</h1>
          <div className="px-10">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {pastPodcasts.map((podcast, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                  >
                    <ProfilePastPodcastCard
                      title={podcast.title}
                      description={podcast.description}
                      host={podcast.host}
                      listeners={podcast.listeners}
                      category={podcast.category}
                      imageUrl={podcast.imageUrl}
                      startDate={podcast.startDate}
                      isLive={podcast.isLive}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
