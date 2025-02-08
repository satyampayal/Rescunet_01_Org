import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { getAllMyComplains } from "./redux/slices/complianSlices.jsx"; // Redux action

const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_URL ||  "http://localhost:3000" || "https://rescunet-01-org-4.onrender.com"; 

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket", "polling"], 
  withCredentials: true,
});

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("new-case", (caseData) => {
      dispatch(getAllMyComplains()); // Correct Redux call
      alert(`🚨 New Missing Person Reported: ${caseData.firstName}`);
    });

    return () => {
      socket.off("new-case");
    };
  }, [dispatch]);

  return socket; // Allow other components to use it
};
