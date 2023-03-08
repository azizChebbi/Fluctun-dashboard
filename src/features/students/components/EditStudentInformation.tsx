import Input from "@atoms/Input";
import React, { Dispatch, FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectOption from "@atoms/SelectOIption";
import { levelOptions } from "@utils/options";
import { studentFormSchema } from "@utils/validations";
import { EditStudentState, Action } from "@reducers/editStudent";

const schema = studentFormSchema;
type FormData = yup.InferType<typeof schema>;

interface IProps {
  lastName: string;
  firstName: string;
  code: string;
  email: string;
  level: string;
  state: EditStudentState;
  dispatch: Dispatch<Action>;
}

export const EditStudentInformation: FC<IProps> = ({
  lastName,
  firstName,
  code,
  email,
  level,
  dispatch,
}) => {
  // ===================================================================
  // state
  // ===================================================================
  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    getValues,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      lastName,
      firstName,
      code,
      email,
      level: {
        label: level,
        value: level,
      },
    },
  });

  // ===================================================================
  // effect
  // ===================================================================

  useEffect(() => {
    const { firstName, lastName, code, level, email } = getValues();
    dispatch({
      type: "UPDATE_STUDENT",
      payload: {
        firstName,
        lastName,
        code,
        level: level?.value,
        email,
        isValid,
      },
    });
  }, [getValues()]);

  // ===================================================================
  // handler
  // ===================================================================

  const onSubmit = (data: FormData) => console.log(data);

  // ===================================================================
  // ui
  // ===================================================================
  return (
    <div className="mt-16 mb-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex items-center mb-8">
          <p className=" text-blue font-medium w-48">Nom :</p>
          <Input
            errorMessage={errors.lastName?.message}
            className={` border-[1px] border-[#AFAFAF] rounded-sm p-3`}
            placeholder="Nom"
            registration={register("lastName")}
          />
        </div>
        <div className=" flex items-center mb-8">
          <p className=" text-blue font-medium w-48">Prénom :</p>
          <Input
            errorMessage={errors.firstName?.message}
            className={` border-[1px] border-[#AFAFAF] rounded-sm p-3`}
            placeholder="Prénom"
            registration={register("firstName")}
          />
        </div>
        <div className=" flex items-center mb-8">
          <p className=" text-blue font-medium w-48">Code :</p>
          <Input
            errorMessage={errors.code?.message}
            className={` border-[1px] border-[#AFAFAF] rounded-sm p-3`}
            placeholder="Code"
            registration={register("code")}
          />
        </div>

        <div className=" flex items-center mb-8">
          <p className=" text-blue font-medium w-48">Matiére :</p>
          <Controller
            name="level"
            control={control}
            render={({ field }: { field: any }) => (
              <SelectOption
                {...field}
                ref={null}
                placeholder="Niveau"
                options={levelOptions}
                controlStyle={{
                  borderWidth: "1px",
                  borderColor: "#AFAFAF",
                  borderRadius: "2px",
                }}
              />
            )}
          />
        </div>
        <div className=" flex items-center mb-8">
          <p className=" text-blue font-medium w-48">Email :</p>
          <Input
            errorMessage={errors.email?.message}
            className={` border-[1px] border-[#AFAFAF] rounded-sm p-3`}
            placeholder="Email"
            registration={register("email")}
          />
        </div>
      </form>
    </div>
  );
};

// export default EditStudentInformation;
