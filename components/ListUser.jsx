"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import API, { domain } from "@/api/endpoints";
import { Button } from "./ui/button";
import { UserMinus, UserPlus } from "lucide-react";

const ListUser = ({ id, myId, name, imageUrl }) => {
  const [followingFlag, setFollowingFlag] = useState(false);

  const isFollowing = (id, list) => {
    console.log(list);
    for (let i = 0; i < list.length; i++) {
      if (list[i].followed_creator_id === id) {
        return true;
      }
    }
    return false;
  };

  const handleFollow = async (id) => {
    API.followUser(id).then((res) => {
      if (res.ok) {
        setFollowingFlag(true);
      } else {
        toast.error("Failed to follow user");
      }
    });
  };
  const handleUnfollow = async (id) => {
    API.unfollowUser(id).then((res) => {
      if (res.ok) {
        setFollowingFlag(false);
      } else {
        toast.error("Failed to unfollow user");
      }
    });
  };

  useEffect(() => {
    console.log(myId, id);
    API.getFollowing().then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(isFollowing(id, data.followingList));
          isFollowing(id, data.followingList)
            ? setFollowingFlag(true)
            : setFollowingFlag(false);
        });
      }
    });
  }, [id, myId]);
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage
          className="w-full h-full object-cover"
          src={
            imageUrl
              ? `${domain}/${imageUrl}`
              : "https://avatar.iran.liara.run/public"
          }
        />
      </Avatar>
      <p className="text-sm">{name}</p>
      {myId !== id && (
        <Button
          variant="ghost"
          size="icon"
          className={
            followingFlag
              ? "h-7 w-7 text-red-500 hover:dark:bg-red-900 hover:bg-red-500 hover:text-white"
              : "h-7 w-7 text-green-500 hover:dark:bg-green-900 hover:bg-green-500 hover:text-white"
          }
        >
          {followingFlag ? (
            <UserMinus onClick={() => handleUnfollow(id)} className="h-4 w-4" />
          ) : (
            <UserPlus onClick={() => handleFollow(id)} className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
};

export default ListUser;
