import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

const ListUser = ({ name, imageUrl }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={imageUrl} />
      </Avatar>
      <p className="text-sm">{name}</p>
    </div>
  );
};

export default ListUser;
