import React, { useState } from "react";
import ChatRoom from "../Components/ChatRoom";

const ChatApp = () => {
  const [chatRooms, setChatRooms] = useState(["General"]);
  const [selectedRoom, setSelectedRoom] = useState("General");
  const [allMessages, setAllMessages] = useState({ General: [] });

  const addRoom = () => {
    const newRoom = prompt("Enter new room name:");
    if (!newRoom) return;

    if (chatRooms.includes(newRoom)) {
      alert("Room already exists!");
      return;
    }

    setChatRooms((prev) => [...prev, newRoom]);
    setAllMessages((prev) => ({ ...prev, [newRoom]: [] }));
    setSelectedRoom(newRoom);
  };

  const deleteRoom = (room) => {
    if (room === "General") return alert("Can't delete default room.");
    const confirmed = window.confirm(`Delete room "${room}"?`);
    if (!confirmed) return;

    setChatRooms((prev) => prev.filter((r) => r !== room));
    setAllMessages((prev) => {
      const updated = { ...prev };
      delete updated[room];
      return updated;
    });

    if (selectedRoom === room) {
      setSelectedRoom("General");
    }
  };

  const updateMessages = (room, newMessages) => {
    setAllMessages((prev) => ({
      ...prev,
      [room]: newMessages,
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-4">🗂️ Chat Rooms</h2>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {chatRooms.map((room) => (
          <button
            key={room}
            onClick={() => setSelectedRoom(room)}
            className={`px-4 py-2 rounded shadow ${
              selectedRoom === room
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {room}
            {room !== "General" && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteRoom(room);
                }}
                className="ml-2 text-red-400 hover:text-red-600 cursor-pointer"
              >
                ❌
              </span>
            )}
          </button>
        ))}
        <button
          onClick={addRoom}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
        >
          ➕ Add Room
        </button>
      </div>

      <ChatRoom
        room={selectedRoom}
        messages={allMessages[selectedRoom]}
        onUpdateMessages={(msgs) => updateMessages(selectedRoom, msgs)}
      />
    </div>
  );
};

export default ChatApp;
