import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const ProfileSidebar = ({ selectedForm, setSelectedForm }) => {
  // const navigate = useNavigate();
  return (
    <>
      <h2 className="m-0 mb-4 text-center font-extrabold text-2xl">
        Select one
      </h2>
      <div className="flex flex-col gap-y-4">
        {/* <Button
          className={
            "py-3" + (selectedForm === "Basic" ? " bg-tc-green text-white" : "")
          }
          onClick={() => {
            setSelectedForm((previousValue) =>
              previousValue === "Basic" ? "" : "Basic"
            );
            // If PortfolioForm is selected then navigate to "/profile"
            // after unselecting above
            selectedForm === "Portfolio" && navigate("/profile");
          }}
        >
          Basic
        </Button> */}
        <Button
          // className={
          //   "py-3" +
          //   (selectedForm === "Portfolio" ? " bg-tc-green text-white" : "")
          // }
          className="py-3 bg-tc-green text-white"
          // onClick={() => {
          //   setSelectedForm((previousValue) =>
          //     previousValue === "Portfolio" ? "" : "Portfolio"
          //   );
          // If PortfolioForm is selected then navigate to "/profile"
          // after unselecting above
          //   selectedForm === "Portfolio" && navigate("/profile");
          // }}
        >
          Portfolio
        </Button>
      </div>
    </>
  );
};

export default ProfileSidebar;
