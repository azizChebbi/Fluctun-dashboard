import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { questionTypeObject, dateOrderObject, synonyms, reverseSynonyms, levelsObject } from "@utils/filter";
import FilterAccordian from "@atoms/FilterAccordian";
import CheckOptions from "@atoms/CheckOptions";
import refresh from "@icons/refresh.svg";
import { api } from "api";
import Date from "./Date";
import { Question } from "../types";
import useExistedLevels from "@hooks/useExistedLevels";

// =================================================
// ================= 2 WAYS BINDING ================
// =================================================

const generateObjectFromArrayOfStrings = (array: string[], value = false) => {
  return array.reduce((acc, key) => ({ ...acc, [key]: value }), {});
};

// =========================VS====================

export const generateArrayOfStringsFromObject = (object: Record<string, boolean>) => {
  return Object.entries(object).reduce(
    (acc, [key, value]) => (value ? [...acc, reverseSynonyms[key] || key] : acc),
    [] as string[]
  );
};

// =================================================
// =================== END =========================
// =================================================

const getOptions = (value: string | string[], object: Record<string, boolean>, initialState: any): any => {
  if (!value) return initialState;
  value = synonyms[value as string] || value;
  if (Array.isArray(value)) {
    const newObject = generateObjectFromArrayOfStrings(value, true);
    return { ...object, ...newObject };
  } else {
    return { ...object, [value]: true };
  }
};

interface IProps {
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  params: any;
  setParams: any;
}

const Filter: FC<IProps> = ({ setQuestions, setIsLoading, params, setParams }) => {
  // =================================================
  // ================= STATE ========================
  // =================================================
  const [type, setType] = useState(questionTypeObject);
  const [levels, setLevels] = useState(levelsObject);
  const [dateOrder, setDateOrder] = useState(dateOrderObject);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const existedLevels = useExistedLevels();

  // =================================================
  // ================= EFFECTS ======================
  // =================================================

  useEffect(() => {
    const { type, dateOrder, startDate, endDate, levels } = params;
    setType((prev) => getOptions(type, prev, questionTypeObject));
    setLevels((prev) => getOptions(levels, prev, generateObjectFromArrayOfStrings(existedLevels || [])));
    setDateOrder((prev) => getOptions(dateOrder, prev, dateOrderObject));
    setStartDate(startDate ? new window.Date(startDate) : null);
    setEndDate(endDate ? new window.Date(endDate) : null);
  }, [params]);

  useEffect(() => {
    const object = generateObjectFromArrayOfStrings(existedLevels || [], false);
    setLevels(getOptions(params.levels, object, object));
  }, [existedLevels]);

  // =================================================
  // ================= MUTATION =====================
  // =================================================

  const filterMuation = useMutation((params: any) => api.get("/questions", { params }), {
    onSuccess: (data) => {
      setQuestions(data.data.questions);
      setIsLoading(false);
    },
  });

  // =================================================
  // ================= HANDLERS =====================
  // =================================================

  const handleFilter = () => {
    setParams((prev: any) => {
      const newParams = { ...prev };
      filterMuation.mutate(newParams);
      return newParams;
    });
    filterMuation.mutate(params);
  };

  const handleReset = () => {
    setParams(() => {
      const newParams = {
        type: undefined,
        dateOrder: undefined,
        levels: undefined,
        startDate: undefined,
        endDate: undefined,
      };
      filterMuation.mutate(newParams);
      return newParams;
    });
  };

  // =================================================
  // ================= UI  ===========================
  // =================================================

  return (
    <div className=" pb-12">
      <p className=" my-12 text-center text-base text-orange underline underline-offset-1 md:text-xl">Les filtres</p>
      <div>
        <FilterAccordian title="Type" isExpanded>
          <CheckOptions state={type} setState={setType} setParams={setParams} query={"type"} />
        </FilterAccordian>
        <FilterAccordian title="Les Niveaux" isExpanded>
          <CheckOptions state={levels} setState={setLevels} setParams={setParams} query={"levels"} isMultiple />
        </FilterAccordian>
        <FilterAccordian title="Date">
          <Date
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setParams={setParams}
          />
          <CheckOptions state={dateOrder} setState={setDateOrder} setParams={setParams} query={"dateOrder"} />
        </FilterAccordian>
        <button
          type="button"
          onClick={handleFilter}
          className=" flex h-20 w-full items-center justify-center border-y border-[#E2E2E2] bg-[#FFF4F2] text-base font-medium text-orange md:text-lg "
          disabled={filterMuation.isLoading}
        >
          {filterMuation.isLoading ? <ClipLoader color="#F68E79" size="25px" /> : <p>Appliquer les filtres</p>}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className=" flex h-20 w-full items-center justify-center gap-2  py-6 px-4 text-base font-medium text-[#A0A0A0] md:text-lg "
        >
          <img src={refresh} />
          <span>Réinitialiser</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
