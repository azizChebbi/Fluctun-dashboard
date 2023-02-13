import React, { FC, ReactNode } from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
  color?: string;
  outlined?: boolean;
}

const Button: FC<IProps> = ({
  children,
  color,
  className,
  disabled,
  outlined,
  ...props
}) => {
  return (
    <button
      style={{
        color: outlined ? color || "#142B33" : "white",
        background: outlined ? "white" : color || "#142B33",
        borderColor: color || "#142B33",
      }}
      className={` border-[1px]
      text-base font-semibold rounded py-3 px-8 text-center outline-none ${
        disabled ? "cursor-not-allowed bg-gray-400" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ${
//   outlined
//     ? `text-${color ? `${color}` : "blue"} bg-white border-[1px] border-${
//         color ? `${color}` : "blue"
//       }`
//     : `text-white bg-${color ? `${color}` : "blue"} border-none`
// }

export default Button;
