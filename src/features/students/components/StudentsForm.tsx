import Input from "@atoms/Input";
import React, { Dispatch, FC, useState, useEffect, useId } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectOption from "@atoms/SelectOIption";
import usePayload from "@hooks/usePayload";
import { Action, AddStudentsState } from "@reducers/students";
import { studentFormSchema } from "@utils/validations";
import { levelOptions } from "@utils/options";

const schema = studentFormSchema;

type FormData = yup.InferType<typeof schema>;

interface IProps {
  setStudentsIDS: React.Dispatch<React.SetStateAction<string[]>>;
  state: AddStudentsState;
  dispatch: Dispatch<Action>;
  id: string;
}

const StudentsForm: FC<IProps> = ({ setStudentsIDS, state, dispatch, id }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const { instituteId } = usePayload();

  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    getValues,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onDelete = async (e: any) => {
    e.preventDefault();
    // await deleteTeacherFromState();
    setStudentsIDS((prevState) => {
      const arr = prevState;
      const ind = arr.lastIndexOf(id);
      arr.splice(ind, 1);
      return [...arr];
    });
  };

  useEffect(() => {
    const { firstName, lastName, code, level } = getValues();
    dispatch({
      type: "UPDATE_STUDENT",
      payload: {
        id,
        firstName,
        lastName,
        code,
        level: level?.value,
        isValid,
        instituteId,
      },
    });
  }, [getValues()]);

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={` relative flex items-center justify-between w-full gap-8 border-t-[1px] border-b-[1px] border-[#F2F2F2] p-4 px-24 ${
        focused ? "border-black" : ""
      }`}
    >
      <Input
        placeholder="Nom"
        errorMessage={errors.lastName?.message}
        className={` border-0`}
        registration={register("lastName")}
      />

      <Input
        placeholder="Prénom"
        errorMessage={errors.firstName?.message}
        className={`border-0`}
        registration={register("firstName")}
      />
      <Input
        placeholder="Code d'inscription"
        errorMessage={errors.code?.message}
        className={`border-0`}
        registration={register("code")}
      />
      <div className=" flex-1">
        <Controller
          name="level"
          control={control}
          render={({ field }: { field: any }) => (
            <SelectOption
              {...field}
              ref={null}
              placeholder="Niveau"
              options={levelOptions}
              controlStyle={{ borderWidth: "0px" }}
              className={`${errors.level ? " text-red-500" : ""} w-1/2`}
            />
          )}
        />
      </div>

      <button
        className=" absolute top-1/2 transform -translate-y-1/2 right-12"
        onClick={onDelete}
      >
        <Tooltip title="Effacer">
          <DeleteOutlineOutlinedIcon sx={{ color: "#C5C5C5" }} />
        </Tooltip>
      </button>
    </form>
  );
};

export default StudentsForm;

/**
 * inputs
 * onDelete
 *
 */
