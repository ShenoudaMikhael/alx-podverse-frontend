"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Mic, MicOff } from "lucide-react";

const ListenerControlsCard = () => {
  const [isMute, setIsMute] = useState(false);
  return (
    <Card className="h-full p-2 flex flex-col justify-around">
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
        <Button variant="destructive">Leave Quietly</Button>
      </div>
      <Separator className="my-2" />
      <Button className="w-full">Request Mic</Button>
    </Card>
  );
};

export default ListenerControlsCard;
