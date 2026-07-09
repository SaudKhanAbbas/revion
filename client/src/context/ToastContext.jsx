import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded-xl px-6 py-4 text-white shadow-2xl transition-all
          ${
            toast.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () =>
  useContext(ToastContext);