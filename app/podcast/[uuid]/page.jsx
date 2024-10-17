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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { clashDisplay } from "@/app/fonts/fonts";

// const podCastDetails = {
//     title: "Tech Talks",
//     description:
//         "This is a very good podcast about technology and anyone interested in joining should feel free to",
//     HostName: "Abdulrahman Hany",
//     Category: "Technology",
// };

const Page = ({ params }) => {
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(null);
  const [podcastId, setPodcastId] = useState(null);
  const [podCastDetails, setPodCastDetails] = useState(null);
  const podCastDetailsRef = useRef(null);
  const [userId, setuserId] = useState(null);
  const userIdRef = useRef(null);
  const [userName, setUserName] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const isHostRef = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [host, setHost] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const activeUsersRef = useRef([]);

  const socketRef = useRef();
  const streamRef = useRef();

  const allPeersRef = useRef({});
  const myAudio = useRef();
  const callRef = useRef(false);
  const myId = useRef("");

  //used in listner code
  const connectionRef = useRef();

  const userAudio = useRef();
  // const myId = useRef();
  const broadcastId = useRef();
  const audioTrackRef = useRef();
  const [audioTrack, setAudioTrack] = useState(null);

  useEffect(() => {
    (async () => {
      const isLoggedIn = await API.isLoggedIn();

      if (!isLoggedIn.ok) {
        router.replace("/");
      }
      socketRef.current = await SocketClient.getInstance();
      myId.current = socketRef.current.id;
      socketRef.current.on("activeUsers", (users) => {
        activeUsersRef.current = users;
        setActiveUsers(users); // Update the client-side user list
      });

      setPodcastId(params.uuid);
      const postPodcast = await API.postPodcast(
        params.uuid,
        "socketRef.current.id"
      );
      if (!postPodcast.ok) {
        if (postPodcast.status === 404) router.replace("/404");
        if (postPodcast.status === 401) router.replace("/");
      }
      const postPodcastData = await postPodcast.json();

      setPodCastDetails({
        title: postPodcastData.podcast.title,
        description: postPodcastData.podcast.description,
        HostName: postPodcastData.podcast.user.name,
        Category: postPodcastData.podcast.cat.name,
        user_id: postPodcastData.podcast.user_id,
        image: postPodcastData.podcast.user.profilePic,
      });
      podCastDetailsRef.current = {
        id: postPodcastData.podcast.id,
        title: postPodcastData.podcast.title,
        description: postPodcastData.podcast.description,
        HostName: postPodcastData.podcast.user.name,
        Category: postPodcastData.podcast.cat.name,
        user_id: postPodcastData.podcast.user_id,
        image: postPodcastData.podcast.user.profilePic,
      };

      setuserId(postPodcastData.user_id);
      userIdRef.current = postPodcastData.user_id;
      setUserName(postPodcastData.me);
      setIsHost(postPodcastData.podcast.user_id === postPodcastData.user_id);
      isHostRef.current =
        postPodcastData.podcast.user_id === postPodcastData.user_id;
      setIsLive(postPodcastData.podcast.is_live);

      setHost({
        id: postPodcastData.podcast.user.id,
        email: postPodcastData.podcast.user.email,
        name: postPodcastData.podcast.user.name,
        username: postPodcastData.podcast.user.username,
        image: postPodcastData.podcast.user.profilePic,
      });

      setIsLoaded(true);
      const connectToListener = async () => {
        console.log("I am host");
        //get stream
        // streamRef.current = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })

        socketRef.current.on(
          "connect-to-broadcaster",
          ({ from, signalData, userToCall }) => {
            //
            // callRef.current = { from, signalData, userToCall };
            console.log("connect-to-broadcaster host");
            if (allPeersRef.current[from]) {
              console.log("allPeersRef.current[from]");
              allPeersRef.current[from].signal(signalData); // Ensure the peer connection is still valid
            } else {
              console.log("allPeersRef.current[from] else");

              // If there's no existing connection, create a new peer for the broadcaster
              allPeersRef.current[from] = new window.SimplePeer({
                initiator: false,
                trickle: false,
                stream: streamRef.current,
              });
              console.log(from);
              allPeersRef.current[from].on("signal", (data) => {
                console.log(data);
                socketRef.current.emit("connect-listner", {
                  signal: data,
                  to: from,
                });
              });
              allPeersRef.current[from].on("close", () => {
                allPeersRef.current[from].destroy();
                delete allPeersRef.current[from];
                // Cleanup logic for the listener (e.g., stop media streams, reset UI)
                callRef.current = false;
              });

              allPeersRef.current[from].on("error", (err) => {
                console.error("Connection error:", err);
              });
              allPeersRef.current[from].signal(signalData);
            }
            console.log("shake-listener host");
            socketRef.current.emit("shake-listener", {
              from,
              broadcaster: myId.current,
            });
          }
        );
      };
      const connectToBroadcaster = () => {
        const peer = new window.SimplePeer({ initiator: true, trickle: false });

        peer.on("signal", (data) => {
          socketRef.current.emit("connect-to-broadcaster", {
            userToCall: broadcastId.current,
            signalData: data,
            from: myId.current,
          });
        });
        peer.on("stream", (currentStream) => {
          userAudio.current.srcObject = currentStream;
        });
        peer.on("close", () => {
          connectionRef.current = null;
          userAudio.current.srcObject = null;
        });

        peer.on("error", (err) => {
          console.error("error Connection error:", err);
        });

        peer.on("destroyed", (err) => {
          console.error("destroyed Connection error:", err);
        });
        // Manually end the call
        socketRef.current.on("connect-listner", ({ signal, to }) => {
          if (!peer.destroyed) {
            peer.signal(signal);
          } else {
            console.warn("Attempted to signal a destroyed peer on listener.");
          }

          // peer.signal(signal);
        });
        // connectionRef.current = peer;
      };

      if (postPodcastData.podcast.is_live)
        socketRef.current.emit("join-podcast", params.uuid);

      // Use params.uuid to avoid undefined value for podcastId usestate hook.

      // connectToBroadcaster();
      socketRef.current.on("connect-to-me", ({ broadcasterId }) => {
        broadcastId.current = broadcasterId;
        connectToBroadcaster();
      });

      if (isHostRef.current) {
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });

        socketRef.current.on("listener-connected", (listenerId) => {
          console.log("listener-connected", listenerId);
          if (!allPeersRef.current[listenerId]) {
            socketRef.current.emit("connect-to-me", {
              listenerId,
              broadcasterId: myId.current,
            });
            // broadcastId.current = broadcasterId
            //     connectToBroadcaster()
          }
        });
        setAudioTrack(streamRef.current.getAudioTracks()[0]);

        socketRef.current.on("listener-left", (listenerId) => {
          console.log("listener-left", listenerId);
          broadcastId.current = null;
          // allPeersRef.current[listenerId].destroy()
          // allPeersRef.current[listenerId] = null;
        });
        await connectToListener();
      } else {
        socketRef.current.on("broadcaster-connected", (broadcasterId) => {
          console.log("broadcaster-connected", broadcasterId);
          if (!broadcastId.current) {
            broadcastId.current = broadcasterId;
            connectToBroadcaster();
          }
        });

        socketRef.current.on("broadcaster-left", (broadcasterId) => {
          console.log("broadcaster-left", broadcasterId);
          broadcastId.current = null;
        });

        socketRef.current.on("podcast-ended", () => {
          // Move listenres.
          router.push("/");
        });
      }
    })();

    return () => {
      Object.values(allPeersRef.current).forEach((peer) => {
        peer.destroy();
      });
      allPeersRef.current = {};
      socketRef.current.off("activeUsers");
      socketRef.current.off("connect-listner");
      socketRef.current.off("connect-to-me");
      socketRef.current.off("connect-to-broadcaster");

      socketRef.current.off("broadcaster-connected");
      socketRef.current.off("broadcaster-left");

      socketRef.current.off("listener-left");
      socketRef.current.off("listener-connected");
      socketRef.current.off("podcast-ended");
    };
  }, [params.uuid, router]);

  const endPodcast = async () => {
    const form = new FormData();
    form.append("data", JSON.stringify({ is_live: "0" }));
    // update the is_live => false
    const response = await API.updatePodcast(
      podCastDetailsRef.current.id,
      form
    );
    if (response.ok) {
      // emit podcast ended
      socketRef.current.emit("podcast-ended", params.uuid);
      toast.success("Podcast Ended Successfully");
      router.push("/homepage");
    } else {
      toast.error("Podcast Ended Failed");
    }
  };
  return !isLoaded ? (
    <LoadingScreen text="Loading..." />
  ) : !isLive ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <h1 className={`${clashDisplay.className} text-2xl`}>
        Podcast isn&apos;t live
      </h1>
    </div>
  ) : (
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
              {isHost ? (
                <HostControlsCard
                  audioTrack={audioTrack}
                  endPodcast={endPodcast}
                />
              ) : (
                <ListenerControlsCard userAudio={userAudio} />
              )}
            </div>
          </div>

          {/* Live Chat */}
          <div className="p-2 grow">
            <LiveChat room={podcastId} uname={userName.username} />
          </div>
        </div>

        {/* Users List */}
        <div className="md:w-[30%] lg:w-[20%] hidden md:block p-2">
          <ScrollArea className="border rounded-xl h-full p-4">
            <div className="flex flex-col gap-3">
              <p className="font-bold">Speakers</p>
              <ListUser
                id={host.id}
                myId={userName.id}
                name={host.username}
                imageUrl={host.image}
              />
              <p className="font-bold">Listeners</p>
              {/* Filter out the host from active listeners */}
              {activeUsers
                .filter((user) => user.id !== host.id)
                .map((listener, index) => (
                  <ListUser
                    key={index}
                    id={listener.id}
                    myId={userName.id}
                    name={listener.username}
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

export default Page;
