import React from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Calendar, Circle } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const ProfilePastPodcastCard = ({
  title,
  description,
  category,
  imageUrl,
  startDate,
}) => {
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
        <div className="flex items-center w-full justify-between">
          <Badge variant="outline">{category}</Badge>
          <div className="text-xs flex items-center gap-2">
            <Calendar />
            {startDate.toLocaleDateString("en-US")}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfilePastPodcastCard;
