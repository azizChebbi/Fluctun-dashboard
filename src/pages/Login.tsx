import React, { useState } from "react";
import logo from "@icons/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Auth, useAuth } from "context/auth-context";
import "react-toastify/dist/ReactToastify.css";
import { loginSchema } from "@utils/validations";
import { useMutation } from "react-query";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = loginSchema;

const Login = () => {
  // ==================================================
  // state
  // ==================================================

  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth() as unknown as Auth;
  useMutation;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  // ==================================================
  // handler
  // ==================================================
  const onSubmit = (data: IFormInputs) => login(data);

  // ==================================================
  // ui
  // ==================================================
  return (
    <div className=" w-full min-h-screen">
      <div className="  py-10 border-b-2 border-[#AFAFAF]">
        <div className=" flex items-center justify-between w-10/12 m-auto">
          <img src={logo} alt="logo" />
          <p className=" text-[#757575] text-lg font-medium">
            Vous avez déjà un compte FlucTun ?
          </p>
        </div>
      </div>
      <div className=" text-center w-2/5 m-auto mt-10 py-20 px-10 border-2 border-g300 rounded-xl">
        <p className=" text-3xl text-blue font-medium mb-14">
          Bienvenue chez FlucTun
        </p>
        <form
          className=" w-11/12 m-auto text-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" mb-5">
            <label className=" text-lg text-g400 font-semibold">EMAIL</label>
            <br />
            <input
              type={"email"}
              className={`ipt text-xl ${
                errors.email?.message && "border-red-500"
              }`}
              placeholder="example@domain.com"
              {...register("email")}
            />
            <p className=" text-red-500 text-sm mt-2">
              {errors.email?.message}
            </p>
          </div>
          <div>
            <label className=" text-lg text-g400 font-semibold">PASSWORD</label>
            <br />
            <div className=" relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`ipt pr-10 text-xl ${
                  errors.password?.message && "border-red-500"
                }`}
                placeholder="*************"
                {...register("password")}
              />

              <button
                className=" absolute top-[55%] right-4 -translate-y-1/2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.71376 13.1538L3.62911 12.2555C2.62685 11.3662 1.83937 10.2658 1.32474 9.03557C2.62415 5.82826 6.20873 3.34212 9.60127 3.34212C10.4743 3.3535 11.3394 3.5074 12.1617 3.79759L13.1538 2.81073C12.029 2.34091 10.8224 2.09168 9.60127 2.0769C7.51487 2.15444 5.49718 2.83448 3.79759 4.03297C2.098 5.23147 0.790998 6.89587 0.0381339 8.82048C-0.0127113 8.95947 -0.0127113 9.11166 0.0381339 9.25065C0.606704 10.7417 1.52345 12.079 2.71376 13.1538Z"
                    fill="#949CB5"
                  />
                  <path
                    d="M7.13712 8.82643C7.18195 8.21039 7.44761 7.63102 7.88553 7.19427C8.32344 6.75751 8.90436 6.49256 9.52204 6.44786L10.6887 5.27786C10.035 5.10618 9.34751 5.10841 8.6949 5.28433C8.04228 5.46024 7.4473 5.8037 6.96927 6.28045C6.49125 6.75721 6.14687 7.35061 5.97049 8.00149C5.7941 8.65237 5.79187 9.33799 5.964 9.99L7.13712 8.82643ZM19.3453 8.78143C18.6062 6.86135 17.3201 5.1988 15.6455 3.99857L18.7394 0.906429L17.8306 0L0.691406 17.0936L1.60025 18L4.88757 14.7214C6.35325 15.579 8.01635 16.0441 9.71541 16.0714C11.8164 15.9926 13.8482 15.3016 15.5596 14.0837C17.2711 12.8657 18.5872 11.1744 19.3453 9.21857C19.3965 9.07733 19.3965 8.92267 19.3453 8.78143ZM12.2937 9C12.291 9.45007 12.1699 9.89154 11.9425 10.2803C11.7151 10.669 11.3894 10.9915 10.9979 11.2153C10.6064 11.4392 10.1628 11.5566 9.71154 11.556C9.26027 11.5553 8.81708 11.4365 8.42627 11.2114L11.9327 7.71429C12.1645 8.10368 12.289 8.54721 12.2937 9ZM9.71541 14.7857C8.36314 14.7622 7.0365 14.4137 5.84798 13.77L7.48519 12.1371C8.22989 12.6525 9.13242 12.8906 10.0352 12.8099C10.938 12.7292 11.7837 12.3348 12.4246 11.6955C13.0655 11.0563 13.461 10.2129 13.5419 9.31251C13.6228 8.41213 13.3841 7.512 12.8674 6.76929L14.7173 4.92429C16.1963 5.93677 17.3529 7.35134 18.0497 9C16.7412 12.2593 13.1316 14.7857 9.71541 14.7857Z"
                    fill="#949CB5"
                  />
                </svg>
              </button>
            </div>
            <p className=" text-red-500 text-sm mt-2">
              {errors.password?.message}
            </p>
          </div>
          <div className=" flex justify-center items-center w-full mt-10">
            <button
              type="submit"
              className=" text-lg bg-blue rounded-3xl text-white text-center font-medium w-[200px] mt-2 ml-auto mr-auto py-3"
            >
              Login
            </button>
          </div>
          <p className=" text-blue text-xs underline underline-offset-1 font-medium text-center mt-2">
            Mot de passe oublié ?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
