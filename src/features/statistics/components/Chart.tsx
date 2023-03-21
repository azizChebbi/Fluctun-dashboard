import React, { FC } from "react";
import {
  Chart as ChartJS,
  ChartOptions,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Data, getData, getOptions } from "@utils/chart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IProps {
  title: string;
  data: Data;
}

const Chart: FC<IProps> = ({ title, data }) => {
  return (
    <div className=" bg-white p-6 py-12 my-12 border border-[#E2E2E2] rounded">
      <Bar options={getOptions(title)} data={getData(data)} />
    </div>
  );
};

export default Chart;
