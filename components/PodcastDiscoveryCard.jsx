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
import { useRouter } from "next/navigation";
import { domain } from "@/api/endpoints";

const PodcastDiscoveryCard = ({
  title,
  description,
  host,
  hostImage,
  category,
  imageUrl,
  isLive,
  uuid,
  activeListeners,
}) => {
  const router = useRouter();
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
          src={
            imageUrl
              ? `${domain}/${imageUrl}`
              : "https://placehold.co/1470x980/jpg"
          }
          alt="Podcast"
          priority
        ></Image>
        <div className="flex items-center gap-3 mt-3">
          <Avatar>
            <AvatarImage
              className="object-cover"
              src={
                hostImage
                  ? `${domain}/${hostImage}`
                  : "https://avatar.iran.liara.run/public"
              }
            />
          </Avatar>
          <div>
            <p className="text-sm font-medium">{host}</p>
            <p className="text-sm text-muted-foreground">
              {activeListeners[uuid] ? activeListeners[uuid].length : 0}{" "}
              listeners
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
        <Button
          onClick={() => {
            if (isLive) {
              router.push(`/podcast/${uuid}`);
            }
          }}
          disabled={!isLive}
          size="sm"
          className="w-full mt-4"
        >
          Tune In
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PodcastDiscoveryCard;
