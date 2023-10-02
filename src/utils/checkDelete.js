import { toast } from "react-toastify";

const checkDelete = (data, name) => {
  if (data === "Successfully Deleted!") {
    return toast.success(`${name} successfully deleted!`, {
      position: "bottom-left",
      draggable: true,
      pauseOnHover: false,
    });
  }
  if (data === "Error!") {
    return toast.error(`${name} couldn't deleted!`, {
      position: "bottom-left",
      draggable: true,
      pauseOnHover: false,
    });
  }
};

export default checkDelete;
