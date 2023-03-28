import Loader from "@atoms/Loader";
import Chart from "@features/statistics/components/Chart";
import Counts from "@features/statistics/components/Counts";
import RankedTeachers from "@features/statistics/components/RankedTeachers";
import { getTeachers } from "@features/teachers/api";
import { FullTeacherData } from "@helpers/generateTables";
import { Teacher } from "@reducers/teachers";
import { getData, getDataByLevel, getDataByMonth, getDataBySubject } from "@utils/chart";
import { api } from "api";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export type TopTeacher = FullTeacherData & { nbQuestions: number };

const Statistiques = () => {
  const [rankedTeachers, setRankedTeachers] = useState<TopTeacher[]>([]);

  const getQuestionsAndAnswersPerMonthQuery = useQuery("questionsAndAnswersPerMonthQuery", () =>
    api.get("/questions/questionsAndAnswersPerMonth")
  );
  const getQuestionsAndAnswersPerLevelQuery = useQuery("questionsAndAnswersPerLevel", () =>
    api.get("/questions/questionsAndAnswersPerLevel")
  );
  const getQuestionsAndAnswersPerSubjectQuery = useQuery("questionsAndAnswersPerSubject", () =>
    api.get("/questions/questionsAndAnswersPerSubject")
  );
  const teachers = useQuery("teachers", getTeachers);
  const topTeachers = useQuery("top-teachers", () => api.get("/questions/top-teachers"));
  useEffect(() => {
    if (topTeachers.isSuccess && teachers.isSuccess) {
      const teachersWithNBQuestions: TopTeacher[] = teachers.data?.data.map((teacher: FullTeacherData) => {
        const teacherData = topTeachers.data?.data.find((t: any) => t[0] === teacher.id);
        return {
          ...teacher,
          nbQuestions: teacherData ? teacherData[1] : 0,
        };
      });
      teachersWithNBQuestions.sort((a, b) => b.nbQuestions - a.nbQuestions);
      setRankedTeachers(teachersWithNBQuestions);
    }
  }, [topTeachers.isSuccess, teachers.isSuccess]);
  return (
    <div className=" p-10">
      <Counts />
      <Loader isLoading={getQuestionsAndAnswersPerMonthQuery.isLoading}>
        <div className=" w-2/3">
          <Chart
            title="Nombre de questions et de réponses par mois"
            data={getDataByMonth(getQuestionsAndAnswersPerMonthQuery.data?.data)}
          />
        </div>
      </Loader>
      {getQuestionsAndAnswersPerLevelQuery.isSuccess && (
        <div className=" w-3/4">
          <Chart
            title="Nombre de questions et de réponses par niveau"
            data={getDataByLevel(getQuestionsAndAnswersPerLevelQuery.data?.data)}
          />
        </div>
      )}
      {getQuestionsAndAnswersPerSubjectQuery.isSuccess && (
        <div className=" w-3/4">
          <Chart
            title="Nombre de questions et de réponses par matiére"
            data={getDataBySubject(getQuestionsAndAnswersPerSubjectQuery.data?.data)}
          />
        </div>
      )}
      <div className=" w-1/2">
        <RankedTeachers teachers={rankedTeachers} />
      </div>
    </div>
  );
};

export default Statistiques;
