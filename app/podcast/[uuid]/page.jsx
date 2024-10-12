"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HostControlsCard from "@/components/HostControlsCard";
import PodcastDetailsCard from "@/components/PodcastDetailsCard";
import { Card } from "@/components/ui/card";
import ListenerControlsCard from "@/components/ListenerControlsCard";
import ListUser from "@/components/ListUser";
import LiveChat from "@/components/LiveChat";
import { ScrollArea } from "@/components/ui/scroll-area";
import API from "@/api/endpoints";
import Cookies from "js-cookie";
import SocketClient from "@/api/socketClient";

// const podCastDetails = {
//     title: "Tech Talks",
//     description:
//         "This is a very good podcast about technology and anyone interested in joining should feel free to",
//     HostName: "Abdulrahman Hany",
//     Category: "Technology",
// };

const page = ({ params }) => {
    const [isLoaded, setIsLoaded] = useState(null);
    const [podcastId, setPodcastId] = useState(null);
    const [podCastDetails, setPodCastDetails] = useState(null);
    const [userId, setuserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isHost, setIsHost] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [host, setHost] = useState(false);

    // const host = {
    //     name: "Abdulrahman Hany",
    //     email: "5a9kz@example.com",
    //     image: "https://i.pravatar.cc/500?img=2",
    // };


    useEffect(() => {

        const socket = SocketClient.getInstance();
        setPodcastId(params.uuid);
        API.postPodcast(params.uuid, socket.id).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                    setPodCastDetails(
                        {
                            title: data.podcast.title,
                            description: data.podcast.description,
                            HostName: data.podcast.user.name,
                            Category: data.podcast.cat.name,
                        }

                    );
                    setuserId(data.user_id);
                    setUserName(data.me)
                    setIsHost(data.podcast.user_id == data.user_id);

                    // TODO:
                    setIsLive(data.podcast.is_live)
                    // setIsLive(true);


                    setHost({
                        email: data.podcast.user.email,
                        name: data.podcast.user.name,
                        image: data.podcast.user.image,
                    })


                    setIsLoaded(true);
                    // if (data.podcast.is_live) {
                    console.log("Here");
                    //socket chat.
                    console.log(socket.id)
                    socket.emit('join-podcast', params.uuid)

                    // }



                })
            } else if (response.status === 404) location.href = '/';
            else if (response.status === 401) location.href = '/';
        })


    }, [])


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

    return (!isLoaded ? <><h1>Loading...!</h1></> : (!isLive ? <><h1>havn\'t started yet...!</h1></> :
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
                        <LiveChat room={podcastId} uname={userName.name} />
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
    )
    );
};

export default page;
