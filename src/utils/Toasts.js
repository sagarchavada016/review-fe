import { toast } from "react-hot-toast";
export class Toast {
  static success(message) {
    return toast.success(message, {
      duration: 1500,
      position: "top-center",
      style: { zIndex: "9999999" },
    });
  }

  static error(message) {
    return toast.error(message, {
      duration: 1500,
      position: "top-center",
      style: { zIndex: "9999999" },
    });
  }

  static warning(message) {
    return toast(message, {
      duration: 1500,
      position: "top-center",
      style: { zIndex: "9999999" },
    });
  }

  static info(message) {
    return toast(message, {
      duration: 1500,
      position: "top-center",
      style: { zIndex: "9999999" },
    });
  }
}
