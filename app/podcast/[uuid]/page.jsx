"use client";
import React, { useEffect, useRef, useState } from "react";
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
    const userIdRef = useRef(null);
    const [userName, setUserName] = useState(null);
    const [isHost, setIsHost] = useState(false);
    const isHostRef = useRef(false);
    const [isLive, setIsLive] = useState(false);
    const [host, setHost] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);


    const socketRef = useRef();
    const streamRef = useRef();

    const allPeersRef = useRef({});
    const myAudio = useRef()
    const callRef = useRef();
    const myId = useRef('');
    const connectionRef = useRef();



    const userAudio = useRef();
    // const myId = useRef();
    const broadcastId = useRef();
    // const callRef = useRef(false);
    // const connectionRef = useRef();
    // const host = {
    //     name: "Abdulrahman Hany",
    //     email: "5a9kz@example.com",
    //     image: "https://i.pravatar.cc/500?img=2",
    // };


    useEffect(() => {
        SocketClient.getInstance().then(socket => {
            console.log(socket);
            console.log(socket.id);
            socketRef.current = socket
            myId.current = socketRef.current.id;


            setPodcastId(params.uuid);
            console.log('myId', myId.current);
            API.postPodcast(params.uuid, socketRef.current.id).then(response => {
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
                        userIdRef.current = data.user_id;
                        setUserName(data.me)
                        setIsHost(data.podcast.user_id == data.user_id);
                        isHostRef.current = data.podcast.user_id == data.user_id;
                        // TODO:
                        setIsLive(data.podcast.is_live)
                        // setIsLive(true);


                        setHost({
                            email: data.podcast.user.email,
                            name: data.podcast.user.name,
                            image: data.podcast.user.image,
                        })


                        setIsLoaded(true);
                        if (data.podcast.is_live) {
                            console.log("podcast is live");
                            //socket chat.
                            console.log(socketRef.current.id)
                            // join broadcast room
                            socketRef.current.emit('join-podcast', params.uuid)

                        }

                        if (data.podcast.user_id !== data.user_id) {
                            console.log('I am a listener');
                            // socketRef.current.on('get-broadcast-id', (broadcaster) => {
                            // console.log('get-broadcast-id', broadcaster)
                            broadcastId.current = data.podcast.current_socket_id
                            connectToBroadcaster()

                            // });
                            socketRef.current.on('connect-listner', ({ signal, to }) => {
                                console.log('connect-listner', signal, to);
                                connectionRef.current.signal(signal);

                            });

                            socketRef.current.on('me', (id) => {

                                console.log('fired:me', myId.current);
                            });
                        } else {
                            console.log('I am a broadcaster');
                            console.log('socketRef.current.id', socketRef.current.id)
                            socketRef.current.on('connect-to-broadcaster', ({ from, signalData, userToCall }) => {
                                console.log('connect-to-broadcaster');
                                callRef.current = { from, signalData, userToCall };

                                allPeersRef.current[from].signal(signalData);

                            });

                            speaker()

                        }
                        socketRef.current.on('activeUsers', (users) => {
                            setActiveUsers(users);  // Update the client-side user list
                        });

                        return () => {
                            socketRef.current.off('activeUsers');
                        };

                    })
                } else if (response.status === 404) location.href = '/';
                else if (response.status === 401) location.href = '/';
            })
        });

    }, [])
    const connectToBroadcaster = () => {

        if (callRef.current === true) return
        const socket = SocketClient.getInstance();

        const peer = new window.SimplePeer({ initiator: true, trickle: false });
        peer.on('signal', (data) => {
            console.log("there is signal")
            console.log({ userToCall: broadcastId.current, signalData: data, from: myId.current })
            socketRef.current.emit('connect-to-broadcaster', { userToCall: broadcastId.current, signalData: data, from: myId.current });
        });
        peer.on('stream', (currentStream) => {
            console.log('currentStream', currentStream);
            userAudio.current.srcObject = currentStream;
        });
        peer.on('close', () => {
            console.log('Disconnected from the broadcaster');
            // Cleanup logic for the listener (e.g., stop media streams, reset UI)
        });

        peer.on('error', err => {
            console.error('Connection error:', err);
        });

        peer.on('destroyed', err => {
            console.error('Connection error:', err);
        });
        // Manually end the call

        connectionRef.current = peer;
        callRef.current = true;
    }
    // For Host
    useEffect(() => {
        if (isHostRef.current) {
            const socket = SocketClient.getInstance();

            if (isHostRef.current) {
                for (const listener in activeUsers) {
                    console.log(userIdRef.current, activeUsers[listener].id)
                    if (userIdRef.current !== activeUsers[listener].id) {
                        console.log(activeUsers[listener]);
                        const listenerId = activeUsers[listener].socketId;
                        allPeersRef.current[listenerId] = new window.SimplePeer({ initiator: false, trickle: false, stream: streamRef.current });


                        allPeersRef.current[listenerId].on('signal', (data) => {
                            console.log('signal data', data);
                            socketRef.current.emit('connect-listner', { signal: data, to: callRef.current.from });
                        })
                        allPeersRef.current[listenerId].on('close', () => {
                            console.log('Disconnected from the broadcaster');
                            // Cleanup logic for the listener (e.g., stop media streams, reset UI)
                        });

                        allPeersRef.current[listenerId].on('error', err => {
                            console.error('Connection error:', err);
                        });
                        socketRef.current.emit('shake-listener', { listenerId, broadcaster: myId.current, });
                    }


                }
            }
        }
    }, [activeUsers])
    const speaker = () => {

        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            .then((currentStream) => {
                streamRef.current = currentStream


            });

        // socketRef.current.on('get-broadcast-id', ({ listenerId }) => {

        // })






    }

    // const listeners = [
    //     { name: "User 1", image: "https://i.pravatar.cc/500?img=3" },
    //     { name: "User 2", image: "https://i.pravatar.cc/500?img=4" },
    //     { name: "User 3", image: "https://i.pravatar.cc/500?img=5" },
    //     { name: "User 4", image: "https://i.pravatar.cc/500?img=6" },
    //     { name: "User 5", image: "https://i.pravatar.cc/500?img=7" },
    //     { name: "User 6", image: "https://i.pravatar.cc/500?img=8" },
    //     { name: "User 7", image: "https://i.pravatar.cc/500?img=9" },
    //     { name: "User 8", image: "https://i.pravatar.cc/500?img=10" },
    //     { name: "User 9", image: "https://i.pravatar.cc/500?img=11" },
    //     { name: "User 10", image: "https://i.pravatar.cc/500?img=12" },
    //     { name: "User 11", image: "https://i.pravatar.cc/500?img=13" },
    //     { name: "User 12", image: "https://i.pravatar.cc/500?img=14" },
    // ];

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
                            <audio playsInline ref={userAudio} autoPlay width="600" />
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
                            {activeUsers.map((listener, index) => (
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
