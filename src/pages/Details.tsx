import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import CheckIcon from "@mui/icons-material/Check";
import QuestionOrAnswerDetails from "@features/questions/components/QuestionOrAnswerDetails";
import usePayload from "@hooks/usePayload";
import Back from "@atoms/Back";
import FullPageSpinner from "./FullPageSpinner";
import { api } from "api";

type Comment = {
  id: string;
  text: string;
  createdAt: string;
  lastUpdatedAt: string;
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
  } | null;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
  } | null;
};

type Answer = {
  id: string;
  description: string;
  createdAt: string;
  lastUpdatedAt: string;
  comments: Comment[];
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
};

type GetQuestionResponse = {
  id: string;
  studentId: string;
  question: string;
  description: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  answers: Answer[];
};

const getQuestionById = (id: string | undefined): Promise<{ data: GetQuestionResponse }> => {
  return api.get(`/questions/${id}`);
};

const Description = () => {
  // =======================================
  // ============== STATE ==================
  // =======================================
  const [answer, setAnswer] = useState<string>("");

  // =======================================
  // ============== HOOKS ==================
  // =======================================
  const { id } = useParams<{ id: string }>();
  console.log(id);

  // =======================================
  // ========= MUTATION AND QUERIES ========
  // =======================================
  const { data, isLoading, isError } = useQuery(["question", id], () => getQuestionById(id), {
    retry: false,
  });

  // =======================================
  // ============== UI ================
  // =======================================

  if (isLoading) return <FullPageSpinner />;
  if (isError || !id) return <Navigate to="/questions" replace={true} />;
  return (
    <div className=" m-auto px-6 py-12 md:w-3/4">
      <Back />
      <QuestionOrAnswerDetails
        isQuestion={true}
        id={id}
        teacherId={null}
        studentId={data?.data.studentId || null}
        title={data?.data.question}
        description={data?.data.description || ""}
        comments={data?.data.comments || []}
        createdAt={data?.data.createdAt || ""}
        subject={data?.data.subject || ""}
        postComment={() => null}
        onDelete={() => null}
      />
      {data?.data?.answers.length ? (
        <p className=" my-12 flex items-center justify-center gap-2 text-xl text-[#50B848]">
          Les réponses <CheckIcon sx={{ color: "#50B848", fontSize: 26 }} />
        </p>
      ) : null}
      {data?.data?.answers?.map((answer) => (
        <QuestionOrAnswerDetails
          key={answer.id}
          isQuestion={false}
          id={answer.id}
          teacherId={answer.teacher.id || null}
          studentId={null}
          teacher={answer.teacher}
          description={answer.description || ""}
          subject={data?.data.subject || ""}
          comments={answer.comments || []}
          createdAt={answer.createdAt || ""}
          postComment={() => null}
          onDelete={() => null}
        />
      ))}
    </div>
  );
};

export default Description;
