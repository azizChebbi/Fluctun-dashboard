import React, { FC } from "react";

interface IProps {
  url: string;
  bio: string | undefined;
  nbResponses?: number;
  nbQuestions?: number;
  isTeacher: boolean;
  editMode: boolean;
}

const Profile: FC<IProps> = ({
  url,
  bio,
  nbQuestions,
  nbResponses,
  isTeacher,
  editMode,
}) => {
  return (
    <div className=" relative border-r-2 border-[#F2F2F2] p-8 py-16">
      <div
        className={` ${
          editMode ? "block" : "hidden"
        } absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.6)]`}
      ></div>
      <div className=" rounded-[50%] w-max overflow-hidden m-auto mb-10">
        <img src={url} className=" w-60 h-60 object-cover" alt="teacher" />
      </div>
      <p className=" text-base text-text leading-6">{bio}</p>
      <div className=" mt-10">
        <p className=" text-blue font-medium mb-2">
          {isTeacher
            ? "Nombre totale des réponses :"
            : "Nombre totale des questions :"}
        </p>
        <p className=" text-blue text-sm">
          {isTeacher ? `${nbResponses} réponses` : `${nbQuestions} questions`}{" "}
        </p>
      </div>
    </div>
  );
};

export default Profile;
