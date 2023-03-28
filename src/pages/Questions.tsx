import React, { useState } from "react";
import useUrlState from "@ahooksjs/use-url-state";
import { useMutation } from "react-query";
import { Question as QuestionType } from "@features/questions/types";
import QuestionsList from "@features/questions/components/QuestionsList";
import QuestionSkeleton from "@features/questions/components/QuestionSkeleton";
import Filter from "@features/questions/components/Filter";
import { api } from "api";

const Questions = () => {
  const [open, setOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [params, setParams] = useUrlState(undefined, {
    parseOptions: {
      arrayFormat: "comma",
    },
    stringifyOptions: {
      arrayFormat: "comma",
    },
  });

  const filterMuation = useMutation((params: any) => api.get("/questions", { params }), {
    onSuccess: (data) => {
      setQuestions(data.data.questions);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  React.useEffect(() => {
    filterMuation.mutate(params);
  }, []);
  return (
    <div className="grid h-full grid-rows-[1fr] md:grid-cols-[1fr_280px]">
      <div className=" overflow-scroll border-[#AFAFAF]  px-3 md:border-r md:p-12 md:px-6 md:py-6">
        <div className=" mb-12 mt-6 flex items-center justify-between">
          <h1 className=" text-2xl font-semibold text-[#303030] md:text-3xl">Questions</h1>
          <button
            className=" block rounded-[2px] bg-orange p-2 px-4 text-center text-sm font-medium text-white md:hidden "
            onClick={() => setOpen(true)}
          >
            Filtrer
          </button>
        </div>
        {isLoading ? [0, 1, 2, 3].map((i) => <QuestionSkeleton key={i} />) : <QuestionsList questions={questions} />}
      </div>
      <div className=" hidden overflow-scroll  md:block">
        <Filter setQuestions={setQuestions} setIsLoading={setIsLoading} params={params} setParams={setParams} />
      </div>
    </div>
  );
};

// plus récent et plus ancien

export default Questions;
