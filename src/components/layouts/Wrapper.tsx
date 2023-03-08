import Sidebar from "@organisms/Sidebar";
import React, { FC, ReactNode, useState } from "react";

interface IProps {
  children?: ReactNode;
}

const Wrapper: FC<IProps> = ({ children }) => {
  const [sidebarIsSmall, setSidebarIsSmall] = useState<boolean>(false);
  return (
    <div
      className={` grid ${
        sidebarIsSmall ? " grid-cols-biggerWrapper" : "grid-cols-wrapper"
      } h-wfull`}
    >
      <Sidebar
        sidebarIsSmall={sidebarIsSmall}
        setSidebarIsSmall={setSidebarIsSmall}
      />
      <div className=" bg-background p-10">{children}</div>
    </div>
  );
};

export default Wrapper;
