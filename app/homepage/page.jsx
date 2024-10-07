"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PodcastDiscoveryCard from "@/components/PodcastDiscoveryCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const page = () => {
  const [searchFilter, setSearchFilter] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Science",
    "Entertainment",
    "Politics",
    "Sports",
    "Others",
  ];
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

  return (
    <div className="max-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Discover Podcasts */}
      <div className=" p-10 justify-center items-center max-h-[calc((100vh - 88px) / 2)]">
        {/* Title */}
        <h2 className="text-2xl font-bold my-4">Discover Podcasts</h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for Podcasts"
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>

        {/* Search Filter Categories */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === searchFilter ? "default" : "outline"}
              className="hover:cursor-pointer"
              onClick={() => {
                setSearchFilter(category);
              }}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Podcasts Carousel */}
        <div className="w-full hidden md:block px-4 md:px-10">
          <Carousel className="w-full ">
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

      {/* Divider */}
      <Separator className="hidden md:block" />

      {/* People you follow Podcasts */}
      <div className="p-10 justify-center hidden md:block items-center max-h-[calc((100vh - 88px) / 2)]">
        {/* Title */}
        <h2 className="text-2xl font-bold my-4">People you follow</h2>

        {/* Friends Podcasts Carousel */}
        <div className="w-full px-4 md:px-10">
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

      {/* for smaller screens */}
      <div className="px-4 flex flex-col gap-4 md:hidden">
        {podcasts.map((podcast, i) => (
          <PodcastDiscoveryCard
            key={i}
            title={podcast.title}
            description={podcast.description}
            host={podcast.host}
            listeners={podcast.listeners}
            category={podcast.category}
            imageUrl={podcast.imageUrl}
            isLive={podcast.isLive}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
