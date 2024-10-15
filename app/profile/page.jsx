"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRoundPen } from "lucide-react";
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
import { useRouter, usePathname } from "next/navigation";
import API, { domain } from "@/api/endpoints";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";

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
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false);
  const categories = useRef([]);

  useEffect(() => {
    // check if user is logged in
    API.isLoggedIn().then((result) => {
      if (result.ok) {
        // Get Profile Data
        API.getProfile().then((result) => {
          if (result.ok) {
            const response = result.json();
            response.then((profile) => {
              // check if user already has a live podcast
              API.getAllPodcasts().then((res) => {
                if (res.ok) {
                  res.json().then((data) => {
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

              // Set Profile Data
              setName(profile.name);
              setUsername(profile.username);
              setEmail(profile.email);
              setDOB(new Date(profile.dob));
              setGender(profile.gender === true ? "Male" : "Female");
              setProfilePicture(
                profile.profilePic !== null
                  ? `${domain}/${profile.profilePic}`
                  : "https://avatar.iran.liara.run/public"
              );
              setPassword(profile.password);

              // Get followers list
              API.getFollowers().then((result) => {
                if (result.ok) {
                  result.json().then((data) => {
                    setFollowersList(
                      data.followersList.map((item) => {
                        return {
                          name: item.follower.name,
                          image: item.follower.profilePic,
                        };
                      })
                    );

                    // Get Followings List
                    API.getFollowing().then((result) => {
                      if (result.ok) {
                        result.json().then((data) => {
                          setFollowingsList(
                            data.followingList.map((item) => {
                              return {
                                name: item.followed_creator.name,
                                image: item.followed_creator.profilePic,
                              };
                            })
                          );

                          // Get Categories
                          API.getCategories().then((result) => {
                            if (result.ok) {
                              result.json().then((data) => {
                                categories.current = data;
                                // ONLY after we get categories
                                // Get Podcasts and Divide into Past/Upcoming with Renamed Fields
                                API.getUserPodcast().then((result) => {
                                  if (result.ok) {
                                    result.json().then((data) => {
                                      const currentTime = new Date();
                                      // Rename and map podcast fields to the new structure
                                      const renamePodcastFields = (podcast) => {
                                        return {
                                          id: podcast.id,
                                          title: podcast.title,
                                          description: podcast.description,
                                          category: getCategoryNameById(
                                            podcast.cat_id,
                                            categories.current
                                          ),
                                          imageUrl:
                                            podcast.podcastPic !== null
                                              ? `${domain}/${podcast.podcastPic}`
                                              : "https://placehold.co/1470x980/jpg", // Fallback if image is null
                                          isLive: podcast.is_live,
                                          startDate: new Date(
                                            podcast.start_date
                                          ),
                                          uuid: podcast.uuid,
                                          currentSocketID:
                                            podcast.current_socket_id,
                                        };
                                      };

                                      // Filter and map for past podcasts
                                      const pastPodcasts = data.podcasts
                                        .filter((podcast) => {
                                          const startDate = new Date(
                                            podcast.start_date
                                          );
                                          return (
                                            startDate < currentTime &&
                                            !podcast.is_live
                                          );
                                        })
                                        .map(renamePodcastFields);

                                      // Filter and map for upcoming/current podcasts
                                      const upcomingPodcasts = data.podcasts
                                        .filter((podcast) => {
                                          const startDate = new Date(
                                            podcast.start_date
                                          );
                                          return (
                                            startDate >= currentTime ||
                                            podcast.is_live
                                          );
                                        })
                                        .map(renamePodcastFields)
                                        .sort((a, b) => b.isLive - a.isLive);

                                      // Set state with the transformed data
                                      setPastPodcasts(pastPodcasts);
                                      setUpcomingPodcasts(upcomingPodcasts);

                                      setLoaded(true); // Mark data as fully loaded
                                    });
                                  } else {
                                    toast.error("Failed to load Podcasts Data");
                                  }
                                });
                              });
                            } else toast.error("Failed to load Categories");
                          });
                        });
                      } else {
                        toast.error("Failed to load Followings Data");
                      }
                    });
                  });
                } else toast.error("Failed to load Followers Data");
              });
            });
          } else toast.error("Failed to load User Data");
        });
      } else {
        toast.error("Please login first");
        router.push(`/?redirect=${encodeURIComponent(pathname)}`);
      }
    });
  }, []);

  const [profilePicture, setProfilePicture] = useState(
    "https://avatar.iran.liara.run/public"
  );
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [pastPodcasts, setPastPodcasts] = useState([]);
  const [upcomingPodcasts, setUpcomingPodcasts] = useState([]);

  const [followersList, setFollowersList] = useState([]);
  const [followingsList, setFollowingsList] = useState([]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("profilePicture", file);
      API.updateProfilePicture(data).then((result) => {
        if (result.ok) {
          toast.success("Profile Picture Updated");
        } else {
          toast.error("Failed to update Profile Picture");
        }
      });
      setProfilePictureFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };
  return !loaded ? (
    <LoadingScreen text="Loading Profile..." />
  ) : (
    <>
      <Navbar />
      {/* Profile Card */}
      <div className="h-[calc(100vh-3.5rem)]">
        <div className="w-full  px-4 md:px-10 py-4">
          <Card className="mx-auto max-w-[250px]">
            <CardHeader className="relative justify-center items-center">
              {/* Avatar Image */}
              <Avatar className="w-32 h-32 mb-2">
                <AvatarImage
                  className="object-cover"
                  src={
                    profilePicture
                      ? profilePicture
                      : "https://avatar.iran.liara.run/public"
                  }
                ></AvatarImage>
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
            {upcomingPodcasts.length === 0 ? (
              <>
                <h1 className="text-center text-lg font-bold text-gray-300 dark:text-gray-500">
                  No upcoming podcasts
                </h1>
                <p className="text-center text-md text-gray-300 dark:text-gray-500">
                  start creating podcasts to view them here
                </p>
              </>
            ) : (
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {upcomingPodcasts.map((podcast, i) => (
                    <CarouselItem
                      key={i}
                      className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                    >
                      <ProfileUpcomingPodcastCard
                        id={podcast.id}
                        title={podcast.title}
                        description={podcast.description}
                        category={podcast.category}
                        imageUrl={podcast.imageUrl}
                        isLive={podcast.isLive}
                        startDate={podcast.startDate}
                        uuid={podcast.uuid}
                        categories={categories.current}
                        upcomingPodcasts={upcomingPodcasts}
                        setUpcomingPodcasts={setUpcomingPodcasts}
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

        {/* Past Podcasts */}
        <div className="w-full p-4 md:p-10 flex flex-col gap-4">
          <h1 className="text-xl font-bold">Past Podcasts</h1>
          <div className="px-10">
            {pastPodcasts.length === 0 ? (
              <h1 className="text-center text-lg font-bold text-gray-300 dark:text-gray-500">
                No past podcasts
              </h1>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
