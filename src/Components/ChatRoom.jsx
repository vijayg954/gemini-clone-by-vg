import axios from "axios";
import { useState } from "react";
import Pagination from "./Pagination"; // Make sure path is correct

const ChatRoom = ({ room, messages, onUpdateMessages }) => {
  const [question, setQuestion] = useState("");
  const [username, setUsername] = useState("User");
  const [isTyping, setIsTyping] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null);

    const URL = import.meta.env.URL;


  const messagesPerPage = 5;
  const filtered = messages.filter((msg) =>
    msg.question.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / messagesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  const generateAns = async () => {
    if (isTyping || !question.trim()) return;
    setIsTyping(true);

    try {
      const res = await axios.post(
        URL,
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

      const answer =
        res.data.candidates[0]?.content?.parts[0]?.text || "No answer generated.";

      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newMessage = { username, question, answer, time };
      onUpdateMessages([...messages, newMessage]);
      setQuestion("");
    } catch (error) {
      console.error("Error calling Gemini:", error);
      alert("Failed to get response from Gemini.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-black text-gray-100 p-5 rounded-lg">
      <h3 className="text-white text-xl font-semibold mb-4">Room: {room}</h3>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full mb-4 p-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded"
      />
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Message"
        disabled={isTyping}
        className="w-full mb-4 p-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded"
      />
      <button
        onClick={generateAns}
        disabled={isTyping || !question.trim()}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-50"
      >
        {isTyping ? "Gemini is typing..." : "Send"}
      </button>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImage(URL.createObjectURL(file));
          }
        }}
        className="w-full mt-4 mb-4 text-white file:bg-gray-800 file:text-white file:border-gray-700"
      />

      {image && (
        <div className="mb-4">
          <strong className="text-gray-300">Image Preview:</strong>
          <img
            src={image}
            alt="Preview"
            className="max-w-full mt-2 border-2 border-gray-700 rounded"
          />
        </div>
      )}

      <input
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Search messages..."
        className="w-full mt-4 mb-4 p-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded"
      />

      {filtered.length > 0 && (
        <h4 className="text-white text-lg font-medium mt-4">Messages</h4>
      )}
      {paginated.map((msg, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-gray-700 p-3 mt-3 rounded text-gray-100"
        >
          <div className="text-xs text-gray-400">{msg.time}</div>
          <p>
            <strong>{msg.username}:</strong> {msg.question}
          </p>
          <p>
            <strong>Gemini:</strong> {msg.answer}
          </p>
        </div>
      ))}

      {filtered.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        />
      )}
    </div>
  );
};

export default ChatRoom;
