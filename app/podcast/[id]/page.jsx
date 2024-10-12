"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HostControlsCard from "@/components/HostControlsCard";
import PodcastDetailsCard from "@/components/PodcastDetailsCard";
import { Card } from "@/components/ui/card";
import ListenerControlsCard from "@/components/ListenerControlsCard";
import ListUser from "@/components/ListUser";
import LiveChat from "@/components/LiveChat";
import { ScrollArea } from "@/components/ui/scroll-area";

const podCastDetails = {
    title: "Tech Talks",
    description:
        "This is a very good podcast about technology and anyone interested in joining should feel free to",
    HostName: "Abdulrahman Hany",
    Category: "Technology",
};

const page = ({ params }) => {
    console.log('params', params)
    const [podcastId, setPodcastId] = useState(null);
    setPodcastId(params.id);


    const [isHost, setIsHost] = useState(false);
    const host = {
        name: "Abdulrahman Hany",
        email: "5a9kz@example.com",
        image: "https://i.pravatar.cc/500?img=2",
    };
    const listeners = [
        { name: "User 1", image: "https://i.pravatar.cc/500?img=3" },
        { name: "User 2", image: "https://i.pravatar.cc/500?img=4" },
        { name: "User 3", image: "https://i.pravatar.cc/500?img=5" },
        { name: "User 4", image: "https://i.pravatar.cc/500?img=6" },
        { name: "User 5", image: "https://i.pravatar.cc/500?img=7" },
        { name: "User 6", image: "https://i.pravatar.cc/500?img=8" },
        { name: "User 7", image: "https://i.pravatar.cc/500?img=9" },
        { name: "User 8", image: "https://i.pravatar.cc/500?img=10" },
        { name: "User 9", image: "https://i.pravatar.cc/500?img=11" },
        { name: "User 10", image: "https://i.pravatar.cc/500?img=12" },
        { name: "User 11", image: "https://i.pravatar.cc/500?img=13" },
        { name: "User 12", image: "https://i.pravatar.cc/500?img=14" },
    ];

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
                                imageurl={host.image}
                            />
                        </div>

                        {/* Podcast Controls */}
                        <div className="p-2 grow">
                            {isHost ? <HostControlsCard /> : <ListenerControlsCard />}
                        </div>
                    </div>

                    {/* Live Chat */}
                    <div className="p-2 grow">
                        <LiveChat />
                    </div>
                </div>

                {/* Users List */}
                <div className="md:w-[30%] lg:w-[20%] hidden md:block p-2">
                    <ScrollArea className="border rounded-xl h-full p-4">
                        <div className="flex flex-col gap-3">
                            <p className="font-bold">Speakers</p>
                            <ListUser name={host.name} imageUrl={host.image} />
                            <p className="font-bold">Listeners</p>
                            {listeners.map((listener, index) => (
                                <ListUser
                                    key={index}
                                    name={listener.name}
                                    imageUrl={listener.image}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default page;
