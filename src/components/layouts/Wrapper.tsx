import Sidebar from "@molecules/Sidebar";
import React, { useState } from "react";

const Wrapper = ({ children }: { children: any }) => {
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
