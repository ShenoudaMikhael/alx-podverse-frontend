import Navbar from "@/components/Navbar";
import PodcastDetailsCard from "@/components/PodcastDetailsCard";
import { Card } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4 md:p-10 h-[calc(100vh-3.5rem)] w-full flex flex-col md:flex-row ">
        {/* Podcast Details and Controls & Live Chat */}
        <div className=" flex flex-grow flex-col ">
          <div className=" flex flex-col md:flex-row">
            {/* Podcast Details */}
            <div className="p-2 w-full md:max-w-[60%]">
              <PodcastDetailsCard />
            </div>
            {/* Podcast Controls */}
            <div className="p-2 grow">
              <Card className="h-full p-2">Podcast Controls</Card>
            </div>
          </div>
          {/* Live Chat */}
          <div className="p-2 grow">
            <Card className="h-full p-2">Live Chat</Card>
          </div>
        </div>

        {/* Users List */}
        <div className="md:w-[30%] lg:w-[20%] hidden md:block p-2">
          <Card className="h-full p-2">
            <p>Speakers</p>
            <p>Listeners</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
