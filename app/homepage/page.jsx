"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";
import SocketClient from "@/api/socketClient";

const getCategoryIdByName = (categoryName, categoriesList) => {
  const category = categoriesList.find((cat) => cat.name === categoryName);
  return category ? category.id : null;
};

const getCategoryNameById = (id, categoriesList) => {
  const category = categoriesList.find((cat) => cat.id === id);
  return category ? category.name : null;
};

const page = () => {
  const router = useRouter();
  const [searchFilter, setSearchFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [recentPodcasts, setRecentPodcasts] = useState([]);
  const [followingPodcasts, setFollowingPodcasts] = useState([]);
  const categoriesRef = useRef([]);
  const allPodcastsRef = useRef([]);
  const recentPodcastsRef = useRef([]);
  const followingPodcastsRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const socketRef = useRef();
  const [activeListeners, setActiveListeners] = useState({});

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    const livePodcasts = allPodcastsRef.current.filter((podcast) => {
      return podcast.is_live === true;
    });
    if (searchText === "" && searchFilter === "All") {
      setRecentPodcasts(recentPodcastsRef.current);
      return;
    }
    const filteredPodcasts = livePodcasts.filter((podcast) => {
      return (
        podcast.title.toLowerCase().includes(searchText.toLowerCase()) ||
        podcast.description.toLowerCase().includes(searchText.toLowerCase()) ||
        podcast.user.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    if (searchFilter === "All") {
      setRecentPodcasts(filteredPodcasts);
    } else {
      setRecentPodcasts(
        filteredPodcasts.filter((podcast) => {
          return (
            getCategoryNameById(podcast.cat_id, categoriesRef.current) ===
            searchFilter
          );
        })
      );
    }
  };

  const handleFilterChange = (filter) => {
    setSearchFilter(filter);
    const livePodcasts = allPodcastsRef.current.filter((podcast) => {
      return podcast.is_live === true;
    });
    if (filter === "All" && searchText === "") {
      setRecentPodcasts(recentPodcastsRef.current);
    } else if (filter === "All" && searchText !== "") {
      const filteredPodcasts = livePodcasts.filter((podcast) => {
        return (
          podcast.title.toLowerCase().includes(searchText.toLowerCase()) ||
          podcast.description
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          podcast.user.name.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setRecentPodcasts(filteredPodcasts);
    } else if (filter !== "All" && searchText === "") {
      setRecentPodcasts(
        livePodcasts.filter((podcast) => {
          return (
            getCategoryNameById(podcast.cat_id, categoriesRef.current) ===
            filter
          );
        })
      );
    } else if (filter !== "All" && searchText !== "") {
      const filteredPodcasts = livePodcasts.filter((podcast) => {
        return (
          podcast.title.toLowerCase().includes(searchText.toLowerCase()) ||
          podcast.description
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          podcast.user.name.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setRecentPodcasts(
        filteredPodcasts.filter((podcast) => {
          return (
            getCategoryNameById(podcast.cat_id, categoriesRef.current) ===
            filter
          );
        })
      );
    }
  };

  useEffect(() => {
    API.isLoggedIn().then((result) => {
      if (result.ok) {
        // Get podcasts active listeners
        SocketClient.getInstance().then((socket) => {
          socketRef.current = socket;
          socketRef.current.on("activeListeners", (users) => {
            setActiveListeners(users); // Update the client-side user list
          });
        });

        API.getCategories().then((result) => {
          if (result.ok) {
            result.json().then((data) => {
              const categoriesList = ["All"];
              categoriesList.push(...data.map((data) => data.name));
              categoriesRef.current = data;
              setCategories(categoriesList);

              // Get all podcasts
              API.getAllPodcasts().then((result) => {
                if (result.ok) {
                  result.json().then((data) => {
                    // check if current user has a live podcast
                    API.getProfile().then((result) => {
                      if (result.ok) {
                        result.json().then((profile) => {
                          for (const podcast of data.podcasts) {
                            if (
                              profile.id === podcast.user.id &&
                              podcast.is_live === true
                            ) {
                              toast.success("You have a live podcast");
                              router.push(`/podcast/${podcast.uuid}`);
                            }
                          }
                        });
                      }
                    });

                    setAllPodcasts(data.podcasts);
                    allPodcastsRef.current = data.podcasts;

                    // Get Most Recent Live Podcasts
                    API.getRecentLivePodcasts().then((result) => {
                      if (result.ok) {
                        result.json().then((data) => {
                          setRecentPodcasts(data.podcasts);
                          recentPodcastsRef.current = data.podcasts;

                          // Get following podcasts
                          API.getFollowingPodcasts().then((result) => {
                            if (result.ok) {
                              result.json().then((data) => {
                                setFollowingPodcasts(data.podcasts);
                                followingPodcastsRef.current = data.podcasts;
                                setLoaded(true);
                              });
                            } else {
                              toast.error("Failed to load following podcasts");
                            }
                          });
                        });
                      } else {
                        toast.error("Failed to load recent live podcasts");
                      }
                    });
                  });
                } else {
                  toast.error("Failed to load all podcasts");
                }
              });
            });
          } else {
            toast.error("Failed to load categories");
          }
        });
      } else {
        toast.error("Please login first");
        router.push("/");
      }
    });
  }, []);

  return !loaded ? (
    <LoadingScreen text="Loading..." />
  ) : (
    <div className="max-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Discover Podcasts */}
      <div className=" p-10 justify-center items-center max-h-[calc((100vh - 88px) / 2)]">
        {/* Title */}
        <h2 className="text-2xl font-bold my-4">Discover Live Podcasts</h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for Podcasts"
            className="pl-10 pr-4 py-2 w-full"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Search Filter Categories */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === searchFilter ? "default" : "outline"}
              className="hover:cursor-pointer min-w-fit"
              onClick={() => handleFilterChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Podcasts Carousel */}
        <div className="w-full hidden md:block px-4 md:px-10">
          {recentPodcasts.length === 0 ? (
            <>
              <h1 className="text-center text-lg font-bold text-gray-300 dark:text-gray-500">
                No Live Podcasts to Join At The Moment.
              </h1>
              <p className="text-center text-md text-gray-300 dark:text-gray-500">
                Create a live podcast to get started.
              </p>
            </>
          ) : (
            <Carousel className="w-full ">
              <CarouselContent className="-ml-1">
                {recentPodcasts.map((podcast, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/5"
                  >
                    <PodcastDiscoveryCard
                      title={podcast.title}
                      description={podcast.description}
                      host={podcast.user.name}
                      hostImage={podcast.user.profilePic}
                      category={getCategoryNameById(
                        podcast.cat_id,
                        categoriesRef.current
                      )}
                      imageUrl={podcast.podcastPic}
                      isLive={podcast.is_live}
                      uuid={podcast.uuid}
                      activeListeners={activeListeners}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
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
          {followingPodcasts.length === 0 ? (
            <>
              <h1 className="text-center text-lg font-bold text-gray-300 dark:text-gray-500">
                No Podcasts to display.
              </h1>
              <p className="text-center text-md text-gray-300 dark:text-gray-500">
                You don't follow anyone or people you follow haven't created
                Podcasts yet.
              </p>
            </>
          ) : (
            <Carousel className="w-full">
              <CarouselContent className="-ml-1">
                {followingPodcasts.map((podcast, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 lg:basis-1/4 xl:basis-1/5"
                  >
                    <PodcastDiscoveryCard
                      title={podcast.title}
                      description={podcast.description}
                      host={podcast.user.name}
                      hostImage={podcast.user.profilePic}
                      category={getCategoryNameById(
                        podcast.cat_id,
                        categoriesRef.current
                      )}
                      imageUrl={podcast.podcastPic}
                      isLive={podcast.is_live}
                      uuid={podcast.uuid}
                      activeListeners={activeListeners}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </div>

      {/* for smaller screens */}
      <div className="px-4 flex flex-col gap-4 md:hidden">
        {recentPodcasts.map((podcast, i) => (
          <PodcastDiscoveryCard
            key={i}
            title={podcast.title}
            description={podcast.description}
            host={podcast.user.name}
            hostImage={podcast.user.profilePic}
            category={getCategoryNameById(
              podcast.cat_id,
              categoriesRef.current
            )}
            imageUrl={podcast.podcastPic}
            isLive={podcast.is_live}
            uuid={podcast.uuid}
            activeListeners={activeListeners}
          />
        ))}
      </div>
      <Separator />
      <div className="px-4 flex flex-col gap-4 md:hidden">
        {/* Title */}
        <h2 className="text-2xl font-bold my-4">People you follow</h2>
        {followingPodcasts.map((podcast, i) => (
          <PodcastDiscoveryCard
            key={i}
            title={podcast.title}
            description={podcast.description}
            host={podcast.user.name}
            hostImage={podcast.user.profilePic}
            category={getCategoryNameById(
              podcast.cat_id,
              categoriesRef.current
            )}
            imageUrl={podcast.podcastPic}
            isLive={podcast.is_live}
            uuid={podcast.uuid}
            activeListeners={activeListeners}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
