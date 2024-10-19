import Button from "../ui/Button.jsx";

const Modal = ({ isModalOpen, setIsModalOpen, setIsConfirm, message }) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`bg-slate-500 opacity-80 fixed z-[999999] top-0 left-0 right-0 bottom-0 text-black flex justify-center items-center ${
        !isModalOpen && "hidden"
      }`}
    >
      <div className="bg-white w-[40%] max-w-[400px] min-w-[350px] rounded-lg flex justify-center items-center font-poppins flex-col gap-3 opacity-100 py-8">
        {message}
        <div className="flex gap-2">
          <Button type="button" className="w-28" onClick={closeModal}>
            No
          </Button>
          <Button
            type="button"
            className="w-28"
            onClick={() => {
              setIsConfirm(true);
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
export {};
