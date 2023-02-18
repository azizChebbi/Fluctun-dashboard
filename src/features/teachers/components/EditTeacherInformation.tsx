import Input from "@atoms/Input";
import React, { Dispatch, FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectOption from "@atoms/SelectOIption";
import { Action, EditTeacherState } from "@reducers/editTeacher";
import { subjectOptions } from "@utils/options";
import { teachcersFormSchema } from "@utils/validations";

const schema = teachcersFormSchema;
type FormData = yup.InferType<typeof schema>;

interface IProps {
  lastName: string;
  firstName: string;
  cin: string;
  number: number;
  email: string;
  subject: string;
  state: EditTeacherState;
  dispatch: Dispatch<Action>;
}

export const EditTeacherInformation: FC<IProps> = ({
  lastName,
  firstName,
  cin,
  number,
  email,
  subject,
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
      cin,
      email,
      number,
      subject: {
        label: subject,
        value: subject,
      },
    },
  });

  // ===================================================================
  // effect
  // ===================================================================

  useEffect(() => {
    const { firstName, lastName, cin, subject, email, number } = getValues();
    dispatch({
      type: "UPDATE_TEACHER",
      payload: {
        firstName,
        lastName,
        cin,
        subject: subject?.value,
        email,
        number,
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
            placeholder="Nom"
            registration={register("firstName")}
          />
        </div>
        <div className=" flex items-center mb-8">
          <p className=" text-blue font-medium w-48">CIN :</p>
          <Input
            errorMessage={errors.cin?.message}
            className={` border-[1px] border-[#AFAFAF] rounded-sm p-3`}
            placeholder="Nom"
            registration={register("cin")}
          />
        </div>

        <div className=" flex items-center mb-8">
          <p className=" text-blue font-medium w-48">Matiére :</p>
          <Controller
            name="subject"
            control={control}
            render={({ field }: { field: any }) => (
              <SelectOption
                {...field}
                ref={null}
                placeholder="Matiere"
                options={subjectOptions}
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
            placeholder="Nom"
            registration={register("email")}
          />
        </div>
        <div className=" flex items-center mb-8">
          <p className=" text-blue font-medium w-48">Numéro :</p>
          <Input
            errorMessage={errors.number?.message}
            className={` border-[1px] border-[#AFAFAF] rounded-sm p-3`}
            placeholder="Nom"
            registration={register("number")}
          />
        </div>
      </form>
    </div>
  );
};

// export default EditTeacherInformation;
