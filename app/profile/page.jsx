"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit, UserRoundPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PodcastDiscoveryCard from "@/components/PodcastDiscoveryCard";
import ProfilePastPodcastCard from "@/components/ProfilePastPodcastCard";

const podcasts = [
  {
    title: "Live Tech Talk",
    description: "Stay updated with the latest in technology and gadgets.",
    host: "John Doe",
    listeners: "1.2k",
    category: "Technology",
    imageUrl: "https://placehold.co/1470x980/jpg",
    isLive: true,
  },
  {
    title: "Science Today",
    description: "Exploring the wonders of science and new discoveries.",
    host: "Jane Smith",
    listeners: "950",
    category: "Science",
    imageUrl: "https://placehold.co/1470x980/jpg",
  },
  {
    title: "Entertainment Weekly",
    description: "Your weekly dose of movies, music, and pop culture.",
    host: "Alice Johnson",
    listeners: "1.5k",
    category: "Entertainment",
    imageUrl: "https://placehold.co/1470x980/jpg",
  },
  {
    title: "Political Roundup",
    description: "A deep dive into the latest political news and events.",
    host: "Bob Williams",
    listeners: "800",
    category: "Politics",
    imageUrl: "https://placehold.co/1470x980/jpg",
  },
  {
    title: "Health & Wellness",
    description: "Tips for a healthier and happier life.",
    host: "Sarah Lee",
    listeners: "1.3k",
    category: "Health",
    imageUrl: "https://placehold.co/1470x980/jpg",
  },
  {
    title: "Business Buzz",
    description: "Insights into the business world and market trends.",
    host: "Michael Green",
    listeners: "1.1k",
    category: "Business",
    imageUrl: "https://placehold.co/1470x980/jpg",
  },
  {
    title: "History Uncovered",
    description: "Exploring the events and figures that shaped the world.",
    host: "Robert Black",
    listeners: "750",
    category: "History",
    imageUrl: "https://placehold.co/1470x980/jpg",
  },
  {
    title: "True Crime Chronicles",
    description: "Real-life crime stories and unsolved mysteries.",
    host: "Laura White",
    listeners: "2.0k",
    category: "True Crime",
    imageUrl: "https://placehold.co/1470x980/jpg",
  },
];

const page = () => {
  return (
    <>
      <Navbar />
      {/* Profile Card */}
      <div className="h-[calc(100vh-3.5rem)]">
        <div className="w-full  px-4 md:px-10 py-4">
          <Card className="mx-auto max-w-[250px]">
            <CardHeader className="relative flex justify-center items-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src="https://avatar.iran.liara.run/public"></AvatarImage>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute rounded-full top-[120px] right-[70px]"
              >
                <UserRoundPen className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
              <h1 className="text-xl font-bold">Name</h1>
              <h2>@username</h2>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center gap-4">
              <Button size="sm" className="relative font-light flex gap-2">
                <p>Edit profile</p>
                <Edit className="h-5 w-5" />
              </Button>
              <div className="flex w-full justify-around">
                <div className="text-center">
                  <p>300</p>
                  <p>Followers</p>
                </div>
                <div className="text-center">
                  <p>300</p>
                  <p>Following</p>
                </div>
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
                {podcasts.map((podcast, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/5"
                  >
                    <PodcastDiscoveryCard
                      title={podcast.title}
                      description={podcast.description}
                      host={podcast.host}
                      listeners={podcast.listeners}
                      category={podcast.category}
                      imageUrl={podcast.imageUrl}
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
        {/* Past Podcasts */}
        <div className="w-full p-4 md:p-10 flex flex-col gap-4">
          <h1 className="text-xl font-bold">Past Podcasts</h1>
          <div className="px-10">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {podcasts.map((podcast, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/5"
                  >
                    <ProfilePastPodcastCard
                      title={podcast.title}
                      description={podcast.description}
                      host={podcast.host}
                      listeners={podcast.listeners}
                      category={podcast.category}
                      imageUrl={podcast.imageUrl}
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
