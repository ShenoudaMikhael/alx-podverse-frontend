"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";
import { Button } from "./ui/button";

const PodcastDiscoveryCard = ({
  title,
  description,
  host,
  listeners,
  category,
  imageUrl,
  isLive,
}) => {
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
        ></Image>
        <div className="flex items-center gap-3 mt-3">
          <Avatar>
            <AvatarImage src="https://avatar.iran.liara.run/public" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{host}</p>
            <p className="text-sm text-muted-foreground">
              {listeners} listeners
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col px-4 pb-4">
        <div className="flex items-center w-full justify-between">
          <Badge variant="outline">{category}</Badge>
          <Circle
            fill={isLive ? "red" : "gray"}
            className={
              (isLive ? "text-[#FF0000] animate-pulse" : "text-[gray]") +
              " h-4 w-4"
            }
          />
        </div>
        <Button size="sm" className="w-full mt-4">
          Tune In
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PodcastDiscoveryCard;
