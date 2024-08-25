import Layout from "../components/layout/Layout.jsx";
// import SettingsSidebar from "./SettingsSidebar.jsx";
import { useContext, useEffect, useState } from "react";
import { request } from "../utils/request.js";
import Button from "../components/ui/Button.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import { Link } from "react-router-dom";

const AccountSettings = () => {
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
      <Layout
        // sidebarContent={<SettingsSidebar />}
        mainContent={
          <>
            <div className="my-5 font-extrabold text-2xl">Account</div>
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md">
              <div>
                <h3 className="m-0 mb-4 font-extrabold text-2xl">
                  Introduction
                </h3>
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
                <Button
                  className="mt-4 text-white bg-tc-green hover:bg-[#00cc9c] hover:text-white hover:bg-opacity-90 min-w-[200px] justify-center"
                  type="submit"
                >
                  Edit
                </Button>
              </Link>
            </div>
          </>
        }
      />
    </>
  );
};

export default AccountSettings;
