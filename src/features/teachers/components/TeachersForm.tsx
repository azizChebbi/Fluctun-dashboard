import Input from "@atoms/Input";
import React, {
  Dispatch,
  FC,
  useState,
  useEffect,
  useId,
  useCallback,
} from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectOption from "@atoms/SelectOIption";
import { Action, AddTeachersState } from "@reducers/teachers";
import usePayload from "@hooks/usePayload";
import { teachcersFormSchema } from "@utils/validations";
import { subjectOptions } from "@utils/options";

const schema = teachcersFormSchema;
type FormData = yup.InferType<typeof schema>;

interface IProps {
  setTeachersIDS: React.Dispatch<React.SetStateAction<string[]>>;
  state: AddTeachersState;
  dispatch: Dispatch<Action>;
  id: string;
}

export const TeachersForm: FC<IProps> = ({
  setTeachersIDS,
  state,
  dispatch,
  id,
}) => {
  //======================================================
  // state
  //======================================================
  const [focused, setFocused] = useState<boolean>(false);
  const { instituteId } = usePayload();
  console.log(instituteId);

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

  //======================================================
  // effect
  //======================================================

  useEffect(() => {
    console.log(getValues());
    const { firstName, lastName, cin, subject, email, number } = getValues();
    dispatch({
      type: "UPDATE_TEACHER",
      payload: {
        id,
        firstName,
        lastName,
        cin,
        subject: subject?.value,
        email,
        number,
        isValid,
        instituteId,
      },
    });
  }, [getValues()]);

  //======================================================
  // handlers
  //======================================================

  const onDelete = async (e: any) => {
    e.preventDefault();
    // await deleteTeacherFromState();
    setTeachersIDS((prevState) => {
      const arr = prevState;
      const ind = arr.lastIndexOf(id);
      arr.splice(ind, 1);
      return [...arr];
    });
  };

  const onSubmit = (data: FormData) => console.log(data);

  //======================================================
  // ui
  //======================================================

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
        placeholder="Cin"
        errorMessage={errors.cin?.message}
        className={`border-0`}
        registration={register("cin")}
      />
      <div className=" flex-1">
        <Controller
          name="subject"
          control={control}
          render={({ field }: { field: any }) => (
            <SelectOption
              {...field}
              ref={null}
              placeholder="Matiere"
              options={subjectOptions}
              controlStyle={{ borderWidth: "0px" }}
              className={`${errors.subject ? " text-red-500" : ""}`}
            />
          )}
        />
      </div>
      <Input
        type="email"
        placeholder="Email"
        className={`border-0`}
        errorMessage={errors.email?.message}
        registration={register("email")}
      />
      <Input
        placeholder="Numéro"
        className={`border-0`}
        errorMessage={errors.number?.message}
        registration={register("number")}
      />
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

// export default TeachersForm;
