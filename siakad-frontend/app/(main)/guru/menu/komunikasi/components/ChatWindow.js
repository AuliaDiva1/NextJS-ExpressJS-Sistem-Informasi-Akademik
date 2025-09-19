"use client";

import { useState } from "react";

export default function ChatWindow({ chat, onSend }) {
  const [pesan, setPesan] = useState("");

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
        Pilih chat dari daftar untuk mulai percakapan
      </div>
    );
  }

  const handleKirim = () => {
    if (!pesan.trim()) return;
    onSend(chat.id, { from: "Anda", text: pesan });
    setPesan("");
  };

  return (
    <div className="flex flex-col h-full p-2">
      {/* Header */}
      <div className="border-b pb-2 mb-2">
        <h4 className="font-semibold">{chat.nama}</h4>
      </div>

      {/* Daftar pesan */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded">
        {chat.messages?.length > 0 ? (
          chat.messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.from === "Anda" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg shadow ${
                  m.from === "Anda"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{m.text}</p>
                <span className="text-xs text-gray-400">{m.from}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">Belum ada pesan.</p>
        )}
      </div>

      {/* Input chat */}
      <div className="flex mt-2">
        <input
          type="text"
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis pesan..."
          className="flex-1 border px-3 py-2 rounded-l focus:outline-none"
        />
        <button
          onClick={handleKirim}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
