import Layout from "../../components/layout/Layout.jsx";
import SettingsSidebar from "./SettingsSidebar.jsx";
import { useContext, useEffect, useState } from "react";
import { request } from "../../utils/request.js";
import Button from "../../components/ui/Button.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
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
        sidebarContent={<SettingsSidebar />}
        mainContent={
          <>
            <h3 className="m-0 mb-4 font-extrabold text-2xl">Introduction</h3>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <div className="font-bold">Company Name</div>
                <div>{userInfo.companyName || "N/A"}</div>
              </div>
              <div>
                <div className="font-bold">Country</div>
                <div>{userInfo.country || "N/A"}</div>
              </div>
              <div>
                <div className="font-bold">Primary Industry</div>
                <div>{userInfo.primaryIndustry || "N/A"}</div>
              </div>
              <div>
                <div className="font-bold">Secondary Industry</div>
                <div>{userInfo.secondaryIndustry || "N/A"}</div>
              </div>
            </div>
            <h3 className="m-0 my-4 font-extrabold text-2xl">Contact</h3>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <div className="font-bold">Sustainability Manager</div>
                <div>{userInfo.sustainabilityManager || "N/A"}</div>
              </div>
              <div>
                <div className="font-bold">Email</div>
                <div>{userInfo.email || "N/A"}</div>
              </div>
              <div>
                <div className="font-bold">Phone Number</div>
                <div>{userInfo.phoneNumber || "N/A"}</div>
              </div>
            </div>
            <Link to="/settings/account/edit">
              <Button
                className="w-full mt-4 text-white bg-tc-green hover:bg-opacity-90"
                type="submit"
              >
                Edit
              </Button>
            </Link>
          </>
        }
      />
    </>
  );
};

export default AccountSettings;
