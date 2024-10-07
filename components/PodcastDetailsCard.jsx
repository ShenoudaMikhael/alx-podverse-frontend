import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const PodcastDetailsCard = ({
  title,
  description,
  host,
  category,
  imageurl,
}) => {
  return (
    <Card className="h-full p-2 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <h2 className="max-w-[90%]">{description}</h2>
      <div className="w-full">
        <div className="flex w-full items-center justify-around">
          <Avatar>
            <AvatarImage src={imageurl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{host}</p>
            <p className="text-sm text-muted-foreground">Host</p>
          </div>
          <Badge className="hidden md:block">{category}</Badge>
        </div>
      </div>
    </Card>
  );
};

export default PodcastDetailsCard;
