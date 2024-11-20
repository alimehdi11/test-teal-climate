import { useContext, useEffect, useState } from "react";
import { request } from "../utils/request.js";
import Button from "../components/ui/Button.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Main from "../components/layout/Main.jsx";
import SidebarToggleBtn from "../components/ui/SidebarToggleBtn.jsx";

const Account = () => {
  const [userInfo, setUserInfo] = useState({});
  const { user } = useContext(UserContext);
  const fetchUserById = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}`;
      const response = await request(url, "GET");
      if (!response.ok) {
        throw new Error(`${JSON.stringify(await response.json())}`);
      }
      const userInfo = await response.json();
      setUserInfo(userInfo);
    } catch (error) {
      const errorMessage = JSON.parse(error.message).error;
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  return (
    <>
      <Sidebar></Sidebar>
      <Main>
        <>
          <div className="mb-5 flex gap-3 ">
            <SidebarToggleBtn />
            <h1 className="font-extrabold text-2xl">Account</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md">
            <div className="col-span-full">
                  <div className="font-extrabold text-2xl">Name</div>
                  <div className="text-[#929292] capitalize">
                    {user.name || "N/A"}
                  </div>
                </div>
            <div>
              <h3 className="m-0 mb-4 font-extrabold text-2xl">Introduction</h3>
              <div className="grid gap-4">
                <div>
                  <div className="font-bold">Company Name</div>
                  <div className="text-[#929292]">
                    {userInfo.companyName || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="font-bold">Country</div>
                  <div className="text-[#929292]">
                    {userInfo.country || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="font-bold">Primary Industry</div>
                  <div className="text-[#929292]">
                    {userInfo.primaryIndustry || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="font-bold">Secondary Industry</div>
                  <div className="text-[#929292]">
                    {userInfo.secondaryIndustry || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="m-0 mb-4 font-extrabold text-2xl">Contact</h3>
              <div className="grid gap-4">
                <div>
                  <div className="font-bold">Sustainability Manager</div>
                  <div className="text-[#929292]">
                    {userInfo.sustainabilityManager || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="font-bold">Email</div>
                  <div className="text-[#929292]">
                    {userInfo.email || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="font-bold">Phone Number</div>
                  <div className="text-[#929292]">
                    {userInfo.phoneNumber || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <Link to="/account/edit" className="col-span-2 justify-self-end">
              <Button type="submit">Edit</Button>
            </Link>
          </div>
        </>
      </Main>
    </>
  );
};

export default Account;
