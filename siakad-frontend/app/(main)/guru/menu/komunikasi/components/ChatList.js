"use client";

export default function ChatList({ daftar = [], onSelectChat }) {
  const data = daftar.length > 0 ? daftar : [
    { id: 1, nama: "Orang Tua Siswa 1", lastMessage: "Bagaimana perkembangan anak saya?", messages: [] },
    { id: 2, nama: "Guru Matematika", lastMessage: "Jangan lupa rapat besok jam 9.", messages: [] },
    { id: 3, nama: "Karyawan Tata Usaha", lastMessage: "Sudah saya upload dokumennya.", messages: [] },
  ];

  return (
    <div className="w-full h-full p-2 overflow-y-auto">
      <h3 className="font-semibold text-lg mb-3">Daftar Chat</h3>

      {data.length === 0 && (
        <p className="text-gray-400">Belum ada kontak.</p>
      )}

      <ul className="space-y-2">
        {data.map((item) => (
          <li
            key={item.id}
            className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer shadow-sm"
            onClick={() => onSelectChat && onSelectChat(item)}
          >
            <p className="font-medium">{item.nama}</p>
            <p className="text-xs text-gray-500 truncate">
              {item.lastMessage || "Belum ada pesan"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
