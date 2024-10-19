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
import { useRouter } from "next/navigation";
import API from "@/api/endpoints";

const ProfileUpcomingPodcastCard = ({
  id,
  title,
  description,
  category,
  imageUrl,
  isLive,
  startDate,
  uuid,
  categories,
  upcomingPodcasts,
  setUpcomingPodcasts,
}) => {
  const router = useRouter();
  const deletePodcast = (id) => {
    API.deletePodcast(id).then((response) => {
      if (response.ok) {
        router.refresh();
      }
    });
    setUpcomingPodcasts(
      upcomingPodcasts.filter((podcast) => podcast.id !== id)
    );
  };

  const handleGoLive = () => {
    const form = new FormData();
    form.append(
      "data",
      JSON.stringify({ is_live: true, start_date: new Date().toISOString() })
    );
    API.updatePodcast(id, form).then((response) => {
      if (response.ok) {
        router.push(`/podcast/${uuid}`);
      }
    });
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="px-4 py-4">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <Image
          className="hidden md:block h-[232px] object-cover"
          width={1470}
          height={980}
          src={imageUrl}
          alt="Podcast"
          priority
          unoptimized
        ></Image>
      </CardContent>
      <CardFooter className="flex-col px-4 pb-4">
        <div className="flex flex-col gap-4 items-center w-full justify-between">
          <Badge variant="outline">{category}</Badge>
          <div className="flex w-full justify-between items-center">
            {!isLive && (
              <div className="flex flex-col gap-1">
                <Badge variant="outline">
                  {startDate.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Badge>
                <Badge variant="outline">
                  {startDate.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Badge>
              </div>
            )}
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
                id={id}
                title={title}
                description={description}
                category={category}
                imageUrl={imageUrl}
                isLive={isLive}
                startDate={startDate}
                uuid={uuid}
                categories={categories}
                upcomingPodcasts={upcomingPodcasts}
                setUpcomingPodcasts={setUpcomingPodcasts}
              />
            )}

            <Button
              size="sm"
              onClick={handleGoLive}
              className={`${isLive ? "hidden" : ""}`}
            >
              Go Live
            </Button>
            <Button
              size="sm"
              onClick={() => router.push(`/podcast/${uuid}`)}
              className={`${!isLive ? "hidden" : ""}`}
            >
              Go To Podcast
            </Button>
            {!isLive && (
              <Button
                size="sm"
                onClick={() => deletePodcast(id)}
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
