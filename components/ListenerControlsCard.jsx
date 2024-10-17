"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Mic, MicOff, Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";

const ListenerControlsCard = ({ userAudio }) => {
  const router = useRouter();
  const [isMute, setIsMute] = useState(false);
  const [startListeningFlag, setStartListeningFlag] = useState(false);
  const [userAudioStream, setUserAudioStream] = useState(userAudio);

  useEffect(() => {
    if (!userAudio) {
      return;
    } else {
      setUserAudioStream(userAudio);
    }

    // You can now safely use userAudioStream in this component.
  }, [userAudio]);

  const handleStartListening = () => {
    userAudio.current.play();
    setStartListeningFlag(true);
  };

  const handleMuteStream = () => {
    if (isMute) {
      userAudioStream.current.muted = false;
      setIsMute(false);
    } else {
      userAudioStream.current.muted = true;
      setIsMute(true);
    }
  };

  return (
    <Card className="h-full p-4 flex flex-col justify-around">
      <p>Controls</p>
      {startListeningFlag ? (
        <div className="flex flex-row justify-around">
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleMuteStream()}
            className="rounded-full"
          >
            {isMute ? <Play /> : <Pause />}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => router.push("/homepage")}
          >
            Leave Quietly
          </Button>
        </div>
      ) : (
        <div className="flex flex-row justify-around">
          <Button
            onClick={handleStartListening}
            className={`relative max-w-[250px] text-white bg-red-500 rounded-full text-base font-medium transition-all duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 shadow-md`}
          >
            <span className="absolute inset-0 rounded-full bg-red-400 opacity-50 blur-md animate-subtle-pulse"></span>
            <span className="relative flex items-center z-10">
              Click to Start Listening
            </span>
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ListenerControlsCard;
