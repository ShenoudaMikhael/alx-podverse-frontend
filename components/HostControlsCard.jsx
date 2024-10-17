"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Mic, MicOff } from "lucide-react";

const HostControlsCard = ({ audioTrack, endPodcast }) => {
  const [isMute, setIsMute] = useState(false);

  useEffect(() => {
    if (!audioTrack) {
      console.log("No audioTrack available yet");
      return;
    }
    console.log("Audio track received in child:", audioTrack);
    // You can now safely use audioTrack in this component.
  }, [audioTrack]);

  const handleMute = () => {
    if (audioTrack) {
      if (isMute) {
        audioTrack.enabled = true;
        setIsMute(false);
      } else {
        audioTrack.enabled = false;
        setIsMute(true);
      }
    }
  };
  return (
    <Card className="h-full p-4 flex flex-col justify-around">
      <p>Controls</p>
      <div className="flex flex-row justify-around">
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleMute()}
          className="rounded-full"
        >
          {isMute ? <MicOff /> : <Mic />}
        </Button>
        <Button variant="destructive" onClick={endPodcast}>
          End Podcast
        </Button>
      </div>
    </Card>
  );
};

export default HostControlsCard;
