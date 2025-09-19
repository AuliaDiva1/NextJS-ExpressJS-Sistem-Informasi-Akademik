"use client";

import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import PenggumumanList from "./components/PenggumumanList";
import PenggumumanForm from "./components/PenggumumanForm";

export default function KomunikasiPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  // state untuk chat
  const [chats, setChats] = useState([
    { id: 1, nama: "Orang Tua A", messages: [] },
    { id: 2, nama: "Guru B", messages: [] },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);

  // state untuk pengumuman
  const [penggumuman, setPenggumuman] = useState([]);

  const tambahPenggumuman = (data) => {
    setPenggumuman([...penggumuman, { ...data, id: Date.now() }]);
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (chatId, message) => {
  setChats((prevChats) =>
    prevChats.map((c) =>
      c.id === chatId
        ? {
            ...c,
            messages: [...c.messages, message],
            lastMessage: message.text, // update lastMessage
          }
        : c
    )
  );

    // update selectedChat supaya UI langsung refresh
    if (selectedChat && selectedChat.id === chatId) {
        setSelectedChat((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
        }));
    }
    };

  return (
    <div className="p-3 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-1">
        <h2 className="text-5xl font-bold text-gray-800">Komunikasi</h2>
        <p className="text-gray-600 text-sm">
          Forum chat antar guru, orang tua, dan karyawan. Kelola juga
          penggumuman untuk siswa.
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="custom-tabview"
        >
          {/* Forum Chat */}
          <TabPanel header="Forum Chat">
            <div className="flex h-[70vh]">
              {/* Chat List */}
              <div className="w-1/3 border-r">
                <ChatList daftar={chats} onSelectChat={handleSelectChat} />
              </div>

              {/* Chat Window */}
              <div className="flex-1 flex flex-col">
                <ChatWindow chat={selectedChat} onSend={handleSendMessage} />
              </div>
            </div>
          </TabPanel>

          {/* Pengumuman */}
          <TabPanel header="Penggumuman">
            <div className="mt-4">
              <PenggumumanForm onSubmit={tambahPenggumuman} />
              <PenggumumanList data={penggumuman} />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}
