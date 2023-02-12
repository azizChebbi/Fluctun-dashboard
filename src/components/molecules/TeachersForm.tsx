import Input from "@atoms/Input";
import React, { Dispatch, FC, useState, useEffect, useId } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectOption from "@atoms/SelectOIption";
import { Action, AddTeachersState } from "@reducers/teachers";
import usePayload from "@hooks/usePayload";

const schema = yup
  .object({
    firstName: yup.string().min(3).required(),
    lastName: yup.string().min(3).required(),
    cin: yup
      .string()
      .matches(/^\d+$/)
      .min(8)
      .max(8)
      .required("Cin contains only numbers"),
    subject: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required(),
    email: yup.string().email().required(),
    number: yup
      .number()
      .min(10000000, "Numéro doit étre valide")
      .max(99999999, "Numéro doit étre valide")
      .required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface IProps {
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  state: AddTeachersState;
  dispatch: Dispatch<Action>;
  setCounter: Dispatch<React.SetStateAction<number>>;
}

const TeachersForm: FC<IProps> = ({ setData, state, dispatch, setCounter }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const id = useId();
  const { instituteId } = usePayload();

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    register,
    getValues,
    watch,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = watch((data) => {
      console.log(data, isValid);
      const {
        firstName = "",
        lastName = "",
        cin = "",
        subject = "",
        email = "",
        number = 0,
      } = data;
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
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isValid, watch]);

  useEffect(() => {
    setData((prev) => {
      let arr = prev;
      const index = arr.indexOf(id);
      if (index == -1) {
        return [...prev, id];
      }
      return [...prev];
    });
  }, [id]);

  useEffect(() => {
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
  }, [isValid]);

  const onSubmit = (data: FormData) => console.log(data);
  const onDelete = (e: any) => {
    e.preventDefault();
    const { firstName, lastName, cin, subject, email, number } = getValues();
    dispatch({
      type: "DELETE_TEACHER",
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
    setCounter((counter) => counter - 1);
    setData((prevState) => {
      const arr = prevState;
      const ind = arr.lastIndexOf(id);
      arr.splice(ind, 1);
      return [...arr];
    });
  };

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
        register={register}
        name="lastName"
        className={`${errors.lastName ? " text-red-500" : ""}`}
      />

      <Input
        placeholder="Prénom"
        register={register}
        name="firstName"
        className={`${errors.firstName ? " text-red-500" : ""}`}
      />
      <Input
        placeholder="Cin"
        register={register}
        name="cin"
        className={`${errors.cin ? " text-red-500" : ""}`}
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
              options={[
                { value: "mathémathique", label: "Mathémathique" },
                { value: "Sscience", label: "Science" },
                { value: "physique", label: "Physique" },
              ]}
              className={`${errors.subject ? " text-red-500" : ""}`}
            />
          )}
        />
      </div>
      <Input
        type="email"
        placeholder="Email"
        className={`${errors.email ? " text-red-500" : ""}`}
        register={register}
        name="email"
      />
      <Input
        placeholder="Numéro"
        className={`${errors.number ? " text-red-500" : ""}`}
        register={register}
        name="number"
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

export default TeachersForm;
