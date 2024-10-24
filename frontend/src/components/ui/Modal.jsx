import { useEffect } from "react";
import Button from "../ui/Button.jsx";

const Modal = ({ isModalOpen, setIsModalOpen, setIsConfirm, message }) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div
      className={`bg-tc-background-95 fixed z-[999999] top-0 left-0 right-0 bottom-0 text-black flex justify-center items-center ${
        !isModalOpen && "hidden"
      }`}
    >
      <div className="bg-white w-[40%] max-w-[400px] min-w-[350px] rounded-lg font-poppins py-8 border">
        <p className="text-center mb-6">{message}</p>
        <div className="flex gap-2 justify-center">
          <Button
            type="button"
            className="w-28"
            style={{ backgroundColor: "rgb(25 126 198 /1)" }}
            onClick={closeModal}
          >
            No
          </Button>
          <Button
            type="button"
            className="w-28"
            onClick={() => {
              setIsConfirm(true);
              closeModal();
            }}
            style={{
              backgroundColor: "rgb(239 68 68 / 1)",
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
