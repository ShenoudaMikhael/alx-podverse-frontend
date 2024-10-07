import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const PodcastDetailsCard = () => {
  return (
    <Card className="h-full p-2 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-2xl font-bold">Podcast Title</h1>
      <h2 className="max-w-[90%]">
        This is a very good podcast about technology and anyone interested in
        joining should feel free to
      </h2>
      <div className="w-full">
        <div className="flex w-full items-center justify-around">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Abdulrahman Hany</p>
            <p className="text-sm text-muted-foreground">Host</p>
          </div>
          <Badge className="hidden md:block">Technology</Badge>
        </div>
      </div>
    </Card>
  );
};

export default PodcastDetailsCard;
