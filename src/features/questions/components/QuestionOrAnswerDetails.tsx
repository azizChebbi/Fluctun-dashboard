import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useMutation } from "react-query";
import usePayload from "@hooks/usePayload";
import Button from "@atoms/Button";
import { notifyError } from "@utils/notify";
import { getDetailedDateFormat } from "@utils/transformDate";
import { subject } from "@utils/options";
import Comment from "./Comment";
import { getDirection } from "./Question";
import { Comment as CommentType } from "../types";
import { api } from "api";
import { queryClient } from "context/Provider";

interface IProps {
  isQuestion: boolean;
  id: string;
  title?: string;
  teacherId: string | null;
  studentId: string | null;
  description: string;
  comments: CommentType[];
  teacher?: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  createdAt?: string;
  subject: string;
  postComment: () => void;
  onDelete: () => void;
}

const QuestionOrAnswerDetails: FC<IProps> = ({
  isQuestion,
  id,
  studentId,
  title,
  description,
  comments,
  createdAt,
  teacherId,
  teacher,
  subject,
}) => {
  // ========================================
  // =============== HANDLERS ===============
  // ========================================

  return (
    <>
      <div className={"my-6 rounded border border-[#E2E2E2] bg-[#F1F1F1]"}>
        {isQuestion && (
          <div className=" flex items-start justify-between gap-3 border-b border-[#E2E2E2]  p-4 md:p-8">
            <p className=" flex-1 font-medium text-blue md:text-xl">
              <span className=" text-orange">Question: </span>
              {title}
            </p>
            <p className=" mt-1 w-max text-xs text-[#A1A1A1] md:text-base">
              Publié: {getDetailedDateFormat(createdAt)}
            </p>
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className=" border-b border-[#E2E2E2] bg-white p-4 md:p-8"
          dir={getDirection(subject as subject)}
        />
        <div className=" p-4 md:p-8 md:pt-4">
          <div className=" flex flex-row-reverse items-start justify-between">
            {!isQuestion && (
              <div className=" mb-4 w-max items-center justify-between bg-[#EBF7FF] p-4 text-xs  md:text-base">
                <p className=" text-[#A1A1A1]">Publié le {getDetailedDateFormat(createdAt)}</p>
                <div className=" mt-2 flex items-center gap-2 md:gap-4">
                  <img
                    src={
                      teacher?.photo ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmatBzkPfadV3gbygHddFgNYbNzBbINaWqFamNP3zOCJyY-EZzJJZW3SjSpeYSGfSlsgI&usqp=CAU"
                    }
                    className=" h-9 w-9 rounded object-cover"
                  />
                  <p className=" max-w-[18ch] text-blue">{teacher?.firstName + " " + teacher?.lastName}</p>
                </div>
              </div>
            )}
          </div>

          {/* ======================================== */}
          {/* =============== COMMENTS =============== */}
          {/* ======================================== */}
          <div className=" md:mt-12">
            <p className=" text-lg font-medium text-blue md:text-xl">Commentaires:</p>
            <div className=" my-6">
              {comments.map((comment, index) => (
                <div
                  key={comment.id}
                  className={`my-4 pb-3 ${index < comments.length - 1 ? "border-b border-[#E2E2E2]" : ""}`}
                >
                  <Comment comment={comment} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionOrAnswerDetails;
