import { ChartOptions } from "chart.js";
import { level, levels, subject, subjects } from "./options";
export type Data = {
  labels: string[];
  datasets: {
    questions: number[];
    answers: number[];
  };
};

export const getData = (data: Data) => {
  return {
    labels: data.labels,
    datasets: [
      {
        label: "Questions",
        data: data.datasets.questions,
        backgroundColor: "#EF6965",
      },
      {
        label: "Réponses",
        data: data.datasets.answers,
        backgroundColor: "#6EC95D",
      },
    ],
  };
};

export const getOptions = (title: string): ChartOptions<"bar"> => {
  return {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },

        ticks: {
          callback: function (value, index, values) {
            // check if value is float return null otherwise return value
            if ((value as number) % 1 === 0) {
              return value;
            } else {
              return null;
            }
          },
        },
      },
    },

    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 24,
          weight: "normal",
        },
        color: "#EF6965",
        align: "start",
      },
    },
  };
};

type GetQuestionsAndAnswersPerMonthResponse = {
  answers: {
    [key: number]: number; // month index
  };
  questions: {
    [key: number]: number; // month index
  };
};

type GetQuestionsAndAnswersPerLevelResponse = {
  answers: {
    [key in string]: number;
  };
  questions: {
    [key in string]: number;
  };
};

type GetQuestionsAndAnswersPerSubjectResponse = {
  answers: {
    [key in string]: number;
  };
  questions: {
    [key in string]: number;
  };
};
// do the same thing for questions and answers in the same function
export const getLinearDataFromObjectPerMonth = (array?: { [key: number]: number }): number[] => {
  if (!array) return [];
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push(array[i] || 0);
  }
  data.unshift(...data.splice(data.length - 4, 4));
  data.pop();
  data.pop();
  return data;
};

export const getDataByMonth = (response: GetQuestionsAndAnswersPerMonthResponse): Data => {
  // declarer une variable qui contient les mois en commancant par septembre
  const answers = getLinearDataFromObjectPerMonth(response?.answers);
  const questions = getLinearDataFromObjectPerMonth(response?.questions);
  const months = ["Septembre", "Octobre", "Novembre", "Décembre", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin"];
  // splice from the last elements in the months array so that his length is equal to the length of the answers
  // remove from the end not the start
  const labels = months.splice(0, answers.length);
  return {
    labels,
    datasets: {
      questions,
      answers,
    },
  };
};

export const getDataByLevel = (response: GetQuestionsAndAnswersPerLevelResponse): Data => {
  // this function will get each level from the response answers and questions and map it to the level array
  console.log(response);
  const answers = Array(levels.length).fill(0);
  const questions = Array(levels.length).fill(0);
  Object.entries(response?.answers).map(([key, value]) => {
    const index = levels.indexOf(key as level);
    answers[index] = value;
  });
  Object.entries(response?.questions).map(([key, value]) => {
    const index = levels.indexOf(key as level);
    questions[index] = value;
  });
  return {
    labels: levels,
    datasets: {
      questions,
      answers,
    },
  };
};

export const getDataBySubject = (response: GetQuestionsAndAnswersPerSubjectResponse): Data => {
  // this function will get each level from the response answers and questions and map it to the level array
  const answers = Array(subjects.length).fill(0);
  const questions = Array(subjects.length).fill(0);
  Object.entries(response?.answers).map(([key, value]) => {
    const index = subjects.indexOf(key as subject);
    answers[index] = value;
  });
  Object.entries(response?.questions).map(([key, value]) => {
    const index = subjects.indexOf(key as subject);
    questions[index] = value;
  });
  return {
    labels: subjects,
    datasets: {
      questions,
      answers,
    },
  };
};
