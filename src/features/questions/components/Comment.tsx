import { Avatar } from "@mui/material";
import React, { FC } from "react";
import profilePicture from "@images/profile.svg";
import { getDetailedDateFormat } from "@utils/transformDate";
import { Comment as CommentType } from "../types";

interface IProps {
  comment: CommentType;
}

const Comment: FC<IProps> = ({ comment }) => {
  return (
    <>
      <div className=" flex items-start gap-3 p-4">
        <Avatar
          sx={{ width: 30, height: 30 }}
          alt="Emery"
          src={comment.student?.photo || comment.teacher?.photo || profilePicture}
        />
        <p className=" mt-[2px] flex-1 text-base font-light text-blue md:text-lg">{comment.text}</p>
      </div>
      <div className=" flex flex-row-reverse items-center justify-between px-12">
        <p className="text-sm font-light text-[#A1A1A1] md:text-base">{getDetailedDateFormat(comment.createdAt)}</p>
      </div>
    </>
  );
};

export default Comment;
