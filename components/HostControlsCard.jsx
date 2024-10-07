"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Mic, MicOff } from "lucide-react";

const HostControlsCard = () => {
  const [isMute, setIsMute] = useState(false);
  return (
    <Card className="h-full p-4 flex flex-col justify-around">
      <p>Controls</p>
      <div className="flex flex-row justify-around">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsMute(!isMute)}
          className="rounded-full"
        >
          {isMute ? <MicOff /> : <Mic />}
        </Button>
        <Button variant="destructive">End Podcast</Button>
      </div>
      <Separator className="my-2" />
      <Button className="w-full">Promote/Demote Speakers</Button>
    </Card>
  );
};

export default HostControlsCard;
