import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import { deleteToken } from "../../utils/auth.js";

const SettingsSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    deleteToken();
    navigate("/");
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="text-black">
        <h2 className="m-0 mb-4 font-extrabold text-2xl text-center">
          Settings
        </h2>
        <ul className="list-none p-[0px] m-[0px] mt-5 flex flex-col gap-y-4">
          {["Account", "Subscription"].map((buttonText) => {
            const lowerCaseButtonText = buttonText.toLowerCase();
            return (
              <li key={lowerCaseButtonText}>
                <Button
                  onClick={() => {
                    navigate(`/settings/${lowerCaseButtonText}`);
                  }}
                  className={
                    "w-full hover:bg-opacity-90" +
                    (location.pathname === `/settings/${lowerCaseButtonText}`
                      ? " bg-tc-green text-white"
                      : "")
                  }
                >
                  {buttonText}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      <Button className="mb-4" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default SettingsSidebar;
