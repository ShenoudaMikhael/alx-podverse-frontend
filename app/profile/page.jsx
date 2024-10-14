"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
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

// const podcasts = [
//   {
//     title: "Live Tech Talk",
//     description: "Stay updated with the latest in technology and gadgets.",
//     host: "John Doe",
//     listeners: "1.2k",
//     category: "Technology",
//     imageUrl: "https://placehold.co/1470x980/jpg",
//     isLive: true,
//     startDate: "2022-09-01",
//   },
//   {
//     title: "Science Today",
//     description: "Exploring the wonders of science and new discoveries.",
//     host: "Jane Smith",
//     listeners: "950",
//     category: "Science",
//     imageUrl: "https://placehold.co/1470x980/jpg",
//     isLive: false,
//     startDate: "2022-09-01",
//   },
//   {
//     title: "Entertainment Weekly",
//     description: "Your weekly dose of movies, music, and pop culture.",
//     host: "Alice Johnson",
//     listeners: "1.5k",
//     category: "Entertainment",
//     imageUrl: "https://placehold.co/1470x980/jpg",
//     isLive: false,
//     startDate: "2022-09-01",
//   },
//   {
//     title: "Political Roundup",
//     description: "A deep dive into the latest political news and events.",
//     host: "Bob Williams",
//     listeners: "800",
//     category: "Politics",
//     imageUrl: "https://placehold.co/1470x980/jpg",
//     isLive: false,
//     startDate: "2022-09-01",
//   },
//   {
//     title: "Health & Wellness",
//     description: "Tips for a healthier and happier life.",
//     host: "Sarah Lee",
//     listeners: "1.3k",
//     category: "Health",
//     imageUrl: "https://placehold.co/1470x980/jpg",
//     isLive: false,
//     startDate: "2022-09-01",
//   },
//   {
//     title: "Business Buzz",
//     description: "Insights into the business world and market trends.",
//     host: "Michael Green",
//     listeners: "1.1k",
//     category: "Business",
//     imageUrl: "https://placehold.co/1470x980/jpg",
//     isLive: false,
//     startDate: "2022-09-01",
//   },
//   {
//     title: "History Uncovered",
//     description: "Exploring the events and figures that shaped the world.",
//     host: "Robert Black",
//     listeners: "750",
//     category: "History",
//     imageUrl: "https://placehold.co/1470x980/jpg",
//     isLive: false,
//     startDate: "2022-09-01",
//   },
//   {
//     title: "True Crime Chronicles",
//     description: "Real-life crime stories and unsolved mysteries.",
//     host: "Laura White",
//     listeners: "2.0k",
//     category: "True Crime",
//     imageUrl: "https://placehold.co/1470x980/jpg",
//     isLive: false,
//     startDate: "2022-09-01",
//   },
// ];

const getCategoryName = (catID, categoriesList) => {
  for (let i = 0; i < categoriesList.length; i++) {
    if (categoriesList[i].id === catID) {
      return categoriesList[i].name;
    }
  }
};

const page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let categories = [];
    // check if user is logged in
    API.isLoggedIn().then((result) => {
      if (result.ok) {
        // Get Profile Data
        API.getProfile().then((result) => {
          if (result.ok) {
            const response = result.json();
            response.then((data) => {
              setName(data.name);
              setUsername(data.username);
              setEmail(data.email);
              setDOB(new Date(data.dob));
              setGender(data.gender === true ? "Male" : "Female");
              setProfilePicture(
                data.profilePic !== null
                  ? `${domain}/${data.profilePic}`
                  : "https://avatar.iran.liara.run/public"
              );
              setPassword(data.password);

              // Get followers list
              API.getFollowers().then((result) => {
                if (result.ok) {
                  result.json().then((data) => {
                    setFollowersList(
                      data.followersList.map((item) => {
                        return {
                          name: item.follower.name,
                          image: item.follower.profilePic
                            ? item.follower.profilePic
                            : "https://avatar.iran.liara.run/public",
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
                                name: item.follower.name,
                                image: item.follower.profilePic
                                  ? item.follower.profilePic
                                  : "https://avatar.iran.liara.run/public",
                              };
                            })
                          );

                          // Get Categories
                          API.getCategories().then((result) => {
                            if (result.ok) {
                              result.json().then((data) => {
                                categories = data;
                              });
                            } else toast.error("Failed to load Categories");
                          });

                          // Get Podcasts and Divide into Past/Upcoming with Renamed Fields
                          API.getUserPodcast().then((result) => {
                            if (result.ok) {
                              result.json().then((data) => {
                                const currentTime = new Date();

                                // Rename and map podcast fields to the new structure
                                const renamePodcastFields = (podcast) => {
                                  return {
                                    title: podcast.title,
                                    description: podcast.description,
                                    category: getCategoryName(
                                      podcast.cat_id,
                                      categories
                                    ),
                                    imageUrl:
                                      podcast.podcastPic !== null
                                        ? `${domain}/${podcast.podcastPic}`
                                        : "https://placehold.co/1470x980/jpg", // Fallback if image is null
                                    isLive: podcast.is_live,
                                    startDate: new Date(
                                      podcast.start_date
                                    ).toLocaleDateString(),
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
                                  .map(renamePodcastFields);

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
        console.log(pathname);
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
