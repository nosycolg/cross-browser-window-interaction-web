import { Socket } from "socket.io-client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

interface Props {
  socketInstance: Socket;
}

function App({ socketInstance }: Props) {
  const [monitors, setMonitors] = useState<Array<string>>([]);

  useEffect(() => {
    socketInstance.on("user_connected", (data) => {
      setMonitors(data);
    });

    socketInstance.on("alert", () => {
      toast.success("👋 👋 👋 👋 👋 👋 👋 👋 👋 👋", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });

    return () => {
      socketInstance.off("user_connected");
      socketInstance.off("alert");
    };
  }, [socketInstance]);

  const handleSubmit = (data: string) => {
    socketInstance.emit("alert", data);
  };

  return (
    <div>
      {monitors.map((monitor, index) => (
        <button
          onClick={() => handleSubmit(monitor)}
          key={index}
          type="button"
          className="p-10 mb-5 shadow-2xl bg-white rounded-3xl text-black font-bold text-9xl outline-none focus:ring-4 transform active:scale-x-75 transition-transform mx-5 flex"
        >
          Monitor {index + 1}
        </button>
      ))}
      <ToastContainer />
    </div>
  );
}

export default App;
