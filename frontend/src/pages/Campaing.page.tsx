"use client";

import { Text, Title } from "@/components/typography";
import { useState } from "react";

export default function EmailComposeForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Replace this with actual API call
    await new Promise((r) => setTimeout(r, 1000));

    alert(`Newsletter sent!\nSubject: ${subject}\nMessage: ${message}`);
    setLoading(false);
    setSubject("");
    setMessage("");
  };

  return (
    <div className="container mx-auto bg-white p-6 shadow-md rounded-lg">
      <Title>{"Send Newsletter"}</Title>
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
        <div>
          <label className="block mb-1 font-medium"><Text>Subject</Text></label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            className="w-full border px-4 py-2 rounded-md min-h-[150px] focus:outline-none focus:ring focus:ring-blue-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Sending..." : "Send Newsletter"}
        </button>
      </form>
    </div>
  );
}
