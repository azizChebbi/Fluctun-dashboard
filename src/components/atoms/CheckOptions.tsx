import React, { Dispatch, FC, SetStateAction } from "react";
import Checkbox from "@mui/material/Checkbox";
import { generateArrayOfStringsFromObject } from "@features/questions/components/Filter";

interface IProps {
  state: any;
  setState: Dispatch<SetStateAction<any>>;
  setParams?: Dispatch<SetStateAction<any>>;
  query?: "type" | "levels" | "dateOrder" | "startDate" | "endDate";
  isMultiple?: boolean;
}

const CheckOptions: FC<IProps> = ({ state, setState, setParams, query, isMultiple }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: any) => {
      const newState = prev;
      if (!isMultiple) {
        Object.keys(newState).forEach((key) => (newState[key] = false));
      }
      const newObject = {
        ...newState,
        [event.target.name]: event.target.checked,
      };
      if (setParams && query) {
        setParams((params: any) => ({ ...params, [query]: generateArrayOfStringsFromObject(newObject) }));
      }

      return newObject;
    });
  };

  return (
    <div>
      {state &&
        Object.entries(state).map(([key, value]) => {
          return (
            <div className="flex items-center gap-2" key={key}>
              <Checkbox
                checked={value as boolean}
                onChange={handleChange}
                name={key}
                sx={{
                  color: "#AFAFAF",
                  "&.Mui-checked": {
                    color: "#F68E79",
                  },
                  "& .MuiSvgIcon-root": { fontSize: 20 },
                }}
              />
              <p className=" text-lg text-[#868686]">{key}</p>
            </div>
          );
        })}
    </div>
  );
};

export default CheckOptions;
