"use client";

import { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

export default function ChatForum() {
  const [activeTab, setActiveTab] = useState("guru-orangtua");
  const [selectedChat, setSelectedChat] = useState(null);
  const [kontak, setKontak] = useState({
    orangtua: [
      {
        id: 1,
        nama: "Orang Tua - Budi",
        messages: [{ from: "Orang Tua - Budi", text: "Selamat pagi Pak Guru" }],
      },
      {
        id: 2,
        nama: "Orang Tua - Siti",
        messages: [{ from: "Orang Tua - Siti", text: "Nilai ujian bagaimana ya?" }],
      },
    ],
    karyawan: [
      {
        id: 3,
        nama: "Guru Matematika",
        messages: [{ from: "Guru Matematika", text: "Besok rapat jam 10 ya" }],
      },
      {
        id: 4,
        nama: "Staf TU",
        messages: [{ from: "Staf TU", text: "Absensi bulan ini sudah masuk" }],
      },
    ],
  });

  // Pilih daftar berdasarkan tab
  const daftar = activeTab === "guru-orangtua" ? kontak.orangtua : kontak.karyawan;

  // Handler kirim pesan
  const handleSend = (id, pesanBaru) => {
    setKontak((prev) => {
      const key = activeTab === "guru-orangtua" ? "orangtua" : "karyawan";
      return {
        ...prev,
        [key]: prev[key].map((c) =>
          c.id === id ? { ...c, messages: [...c.messages, pesanBaru] } : c
        ),
      };
    });
  };

  // Ambil chat yang dipilih
  const currentChat = daftar.find((c) => c.id === selectedChat?.id);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Forum Chatting</h2>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        <button
          onClick={() => {
            setActiveTab("guru-orangtua");
            setSelectedChat(null);
          }}
          className={`pb-2 ${
            activeTab === "guru-orangtua"
              ? "border-b-2 border-blue-500 font-semibold"
              : ""
          }`}
        >
          Guru - Orang Tua
        </button>
        <button
          onClick={() => {
            setActiveTab("guru-karyawan");
            setSelectedChat(null);
          }}
          className={`pb-2 ${
            activeTab === "guru-karyawan"
              ? "border-b-2 border-blue-500 font-semibold"
              : ""
          }`}
        >
          Guru - Karyawan
        </button>
      </div>

      {/* Layout Chat */}
      <div className="flex border rounded overflow-hidden h-64">
        {/* Sidebar daftar kontak */}
        <ChatList daftar={daftar} pilihChat={setSelectedChat} aktif={selectedChat} />

        {/* Chat Window */}
        <div className="flex-1 p-2">
          {currentChat ? (
            <ChatWindow chat={currentChat} onSend={handleSend} />
          ) : (
            <p className="text-gray-400 p-4">Pilih kontak untuk mulai chat...</p>
          )}
        </div>
      </div>
    </div>
  );
}
