import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg);
};

export const handleError = (msg) => {
  toast.error(msg);
};

export const handleWarning = (msg) => {
  toast.warning(msg);
}