import Navbar from "@/components/Navbar";
import HostControlsCard from "@/components/HostControlsCard";
import PodcastDetailsCard from "@/components/PodcastDetailsCard";
import { Card } from "@/components/ui/card";
import React from "react";
import ListenerControlsCard from "@/components/ListenerControlsCard";

const podCastDetails = {
  title: "Tech Talks",
  description:
    "This is a very good podcast about technology and anyone interested in joining should feel free to",
  HostName: "Abdulrahman Hany",
  Category: "Technology",
};

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
              <PodcastDetailsCard
                title={podCastDetails.title}
                description={podCastDetails.description}
                host={podCastDetails.HostName}
                category={podCastDetails.Category}
              />
            </div>

            {/* Podcast Controls */}
            <div className="p-2 grow">
              <ListenerControlsCard />
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
            <p className="font-bold">Speakers</p>
            <p className="font-bold">Listeners</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
