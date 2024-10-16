import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import API, { domain } from "@/api/endpoints";

const ProfileList = ({ listName, setFollowingsList, list }) => {
  // Unfollow user
  const handleUnfollow = (id) => {
    API.unfollowUser(id).then((res) => {
      if (res.ok) {
        setFollowingsList((prev) => {
          return prev.filter((user) => user.id !== id);
        });
      } else {
        toast.error("Failed to unfollow user");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-center cursor-pointer">
          <p className="text-xl font-bold">{list.length}</p>
          <p>{listName}</p>
        </div>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Followers or Following list"
        className="rounded-xl max-w-[80vw] sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>{listName} List</DialogTitle>
          <DialogDescription>
            {listName === "Following"
              ? "People you follow"
              : "People following you"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col gap-2">
            {list.map((follower, i) => (
              <div className="flex justify-between" key={i}>
                <div className="flex items-center gap-2">
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      className="w-full h-full object-cover"
                      src={
                        follower.image === null
                          ? "https://avatar.iran.liara.run/public"
                          : `${domain}/${follower.image}`
                      }
                    />
                  </Avatar>
                  <p>{follower.name}</p>
                </div>
                {listName === "Following" && (
                  <Button
                    onClick={() => handleUnfollow(follower.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-500"
                  >
                    Unfollow
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileList;
