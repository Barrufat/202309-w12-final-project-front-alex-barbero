import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import "./Toast.css";

const Toast = () => {
  const feedBackToast = useAppSelector((state) => state.uiState.feedbackToast);

  useEffect(() => {
    if (feedBackToast.type === "success") {
      toast.success(`${feedBackToast.message}`);
    } else if (feedBackToast.type === "error") {
      toast.error(`${feedBackToast.message}`);
    }
  }, [feedBackToast]);

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default Toast;
