import React from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Circle } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import EditPodcastDialog from "./EditPodcastDialog";

const ProfileUpcomingPodcastCard = ({
  title,
  description,
  category,
  imageUrl,
  isLive,
  startDate,
  upcomingPodcasts,
  setUpcomingPodcasts,
}) => {
  const deletePodcast = (name) => {
    setUpcomingPodcasts(
      upcomingPodcasts.filter((podcast) => podcast.title !== name)
    );
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="px-4 py-4">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <Image
          className="hidden md:block"
          width={1470}
          height={980}
          src={imageUrl}
          alt="Podcast"
          priority
        ></Image>
      </CardContent>
      <CardFooter className="flex-col px-4 pb-4">
        <div className="flex flex-col gap-4 items-center w-full justify-between">
          <div className="flex w-full justify-between">
            <Badge variant="outline">{category}</Badge>
            {!isLive && <Badge variant="outline">{startDate}</Badge>}
            <Circle
              fill={isLive ? "red" : "gray"}
              className={
                (isLive ? "text-[#FF0000] animate-pulse" : "text-[gray]") +
                " h-4 w-4"
              }
            />
          </div>

          <div className="flex  items-center gap-2">
            {!isLive && (
              <EditPodcastDialog
                title={title}
                description={description}
                category={category}
                imageUrl={imageUrl}
                isLive={isLive}
                startDate={startDate}
                upcomingPodcasts={upcomingPodcasts}
                setUpcomingPodcasts={setUpcomingPodcasts}
              />
            )}

            <Button size="sm" className={`${isLive ? "hidden" : ""}`}>
              Go Live
            </Button>
            <Button size="sm" className={`${!isLive ? "hidden" : ""}`}>
              Go To Podcast
            </Button>
            {!isLive && (
              <Button
                size="sm"
                onClick={() => deletePodcast(title)}
                variant="destructive"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileUpcomingPodcastCard;
