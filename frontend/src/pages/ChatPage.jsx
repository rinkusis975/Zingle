// ChatPage.js (Updated UI Colors)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/chatProvider";
import ChatHeader from "../components/miscellaneous/ChatHeader";
import MyChats from "../components/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, user]);

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-slate-100 dark:from-indigo-900 dark:via-violet-900 dark:to-indigo-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 order-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 dark:text-gray-300 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-teal-100 via-white to-slate-100 dark:from-indigo-900 dark:via-violet-900 dark:to-indigo-950 relative z-10">
      {user && <ChatHeader />}
      <div className="flex justify-between w-full h-[calc(100vh-60px)] p-2 md:p-4 gap-4">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </div>
    </div>
  );
};

export default ChatPage;
