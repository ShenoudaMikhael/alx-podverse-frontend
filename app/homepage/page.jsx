"use client";
import React, { useEffect, useState } from "react";
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
import API from "@/api/endpoints";

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
  const discoverPodcasts = [
    {
      title: "Morning News",
      description: "Stay updated with the latest news and current events.",
      host: "Emily Davis",
      listeners: "1.8k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "The Daily Brief",
      description: "A daily dose of news, analysis, and commentary.",
      host: "David Lee",
      listeners: "1.4k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "Tech Talk Daily",
      description: "The latest tech news, trends, and innovations.",
      host: "Samantha Brown",
      listeners: "1.6k",
      category: "Technology",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "The Science Hour",
      description: "Exploring the wonders of science and new discoveries.",
      host: "Dr. Maria Rodriguez",
      listeners: "1.2k",
      category: "Science",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "Entertainment Tonight",
      description: "Your daily dose of movies, music, and pop culture.",
      host: "Ryan Thompson",
      listeners: "1.9k",
      category: "Entertainment",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "The Political Pulse",
      description: "A deep dive into the latest political news and events.",
      host: "Senator James Wilson",
      listeners: "1.5k",
      category: "Politics",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "Wellness Wednesday",
      description: "Tips for a healthier and happier life.",
      host: "Dr. Sophia Patel",
      listeners: "1.7k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "Business Insights",
      description: "Insights into the business world and market trends.",
      host: "CEO Mark Davis",
      listeners: "1.3k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "History Revisited",
      description: "Exploring the events and figures that shaped the world.",
      host: "Professor John Taylor",
      listeners: "1.1k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
  ];
  const followersPodcasts = [
    {
      title: "Crime Scene Investigation",
      description: "Real-life crime stories and unsolved mysteries.",
      host: "Detective James Martin",
      listeners: "2.2k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: false,
    },
    {
      title: "The Morning Show",
      description: "Start your day with news, entertainment, and more.",
      host: "Tom Harris",
      listeners: "2.5k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "The Tech Report",
      description: "The latest tech news, trends, and innovations.",
      host: "Samantha Brown",
      listeners: "1.8k",
      category: "Technology",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: false,
    },
    {
      title: "Science in Action",
      description: "Exploring the wonders of science and new discoveries.",
      host: "Dr. Maria Rodriguez",
      listeners: "1.4k",
      category: "Science",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "Entertainment Weekly",
      description: "Your weekly dose of movies, music, and pop culture.",
      host: "Ryan Thompson",
      listeners: "2.1k",
      category: "Entertainment",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: false,
    },
    {
      title: "The Political Roundup",
      description: "A deep dive into the latest political news and events.",
      host: "Senator James Wilson",
      listeners: "1.9k",
      category: "Politics",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "Health and Wellness",
      description: "Tips for a healthier and happier life.",
      host: "Dr. Sophia Patel",
      listeners: "1.6k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: false,
    },
    {
      title: "Business Today",
      description: "Insights into the business world and market trends.",
      host: "CEO Mark Davis",
      listeners: "1.8k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
    {
      title: "History Uncovered",
      description: "Exploring the events and figures that shaped the world.",
      host: "Professor John Taylor",
      listeners: "1.5k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: false,
    },
    {
      title: "True Crime Chronicles",
      description: "Real-life crime stories and unsolved mysteries.",
      host: "Detective James Martin",
      listeners: "2.4k",
      category: "Others",
      imageUrl: "https://placehold.co/1470x980/jpg",
      isLive: true,
    },
  ];

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
  },[])















  return !loaded ? <><h1>Loading</h1></> : (
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
              {discoverPodcasts.map((podcast, i) => (
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
              {followersPodcasts.map((podcast, i) => (
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
        {discoverPodcasts.map((podcast, i) => (
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
