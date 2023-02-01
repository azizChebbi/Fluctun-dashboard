// import logo from "../../assets/icons/logo.png";
import { tabs } from "../../utils/tabs";
import { Link, useLocation } from "react-router-dom";
import logo from "@icons/logo.svg";
import smallLogo from "@icons/smallLogo.svg";
import open from "../../assets/icons/openSidebar.svg";
import close from "../../assets/icons/closeSidebar.svg";
import { FC } from "react";
import { Auth, useAuth } from "context/auth-context";
import usePathname from "@helpers/usePathname";

interface IProps {
  sidebarIsSmall: boolean;
  setSidebarIsSmall: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: FC<IProps> = ({ sidebarIsSmall, setSidebarIsSmall }) => {
  const { logout } = useAuth() as unknown as Auth;
  const isActiveLink = (path: string) => {
    return path == window.location.pathname;
  };
  return (
    <div className=" h-screen overflow-hidden">
      <div className=" m-auto h-full grid grid-rows-[20%_1fr_30%] ">
        <div
          className={` flex items-center  ${
            sidebarIsSmall ? "justify-center" : "ml-[20%]"
          }`}
        >
          <div className=" ">
            {sidebarIsSmall ? (
              <img
                src={open}
                className=" mb-8 cursor-pointer"
                onClick={() => setSidebarIsSmall(!sidebarIsSmall)}
                alt=""
              />
            ) : (
              <img
                src={close}
                className=" mb-8 cursor-pointer"
                onClick={() => setSidebarIsSmall(!sidebarIsSmall)}
                alt=""
              />
            )}
            {sidebarIsSmall ? (
              <img src={smallLogo} alt="logo" />
            ) : (
              <img src={logo} alt="logo" />
            )}
          </div>
        </div>
        <div className=" flex flex-col justify-around">
          {tabs.map((tab, index) => {
            return (
              <Link
                to={tab.href}
                key={index}
                className={` gap-2 py-5 hover:bg-[#F8F8F8]${
                  tab.href == usePathname() ? " border-l-4 border-blue" : ""
                }`}
              >
                <div
                  className={`flex items-center ${
                    sidebarIsSmall ? " justify-center" : "ml-[20%]"
                  } `}
                >
                  <div className={` ${sidebarIsSmall ? "" : "w-12"} `}>
                    <img src={tab.svg} alt={tab.label} />
                  </div>
                  {!sidebarIsSmall && (
                    <span className=" text-xl font-medium text-right">
                      {tab.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        <div
          className={`flex items-center ${sidebarIsSmall ? "" : "ml-[20%]"} `}
        >
          <Link to="" className=" gap-2 w-full" onClick={logout}>
            <div
              className={` flex items-center ${
                sidebarIsSmall ? " justify-center" : ""
              } `}
            >
              <div className={` ${sidebarIsSmall ? "" : "w-8"} `}>
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 3.55556L5.769 4.80889L3.447 7.11111H12.6V8.88889H3.447L5.769 11.1822L4.5 12.4444L0 8L4.5 3.55556ZM16.2 1.77778H9V0H16.2C17.19 0 18 0.8 18 1.77778V14.2222C18 15.2 17.19 16 16.2 16H9V14.2222H16.2V1.77778Z"
                    fill="#142B33"
                  />
                </svg>
              </div>
              {!sidebarIsSmall && <span className=" text-xl">Quitter</span>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
