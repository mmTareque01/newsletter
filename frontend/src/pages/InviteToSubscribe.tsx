"use client";

import { Text, Title } from "@/components/typography";
import { useMailer } from "@/hooks/callAPI.tsx/useMailer";
import { useAppStore } from "@/stores/app.store";
import { use, useEffect, useState } from "react";
import TinyEditor from "@/components/TinyEditor";

export default function EmailComposeForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setHeader } = useAppStore();
  const { handleSendMail } = useMailer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);

    await handleSendMail({
      to: email,
      subject: subject,
      body: message
    });

    // Replace this with actual API call
    await new Promise((r) => setTimeout(r, 1000));

    // alert(`Newsletter sent!\nSubject: ${subject}\nMessage: ${message}`);
    // setLoading(false);
    setSubject("");
    setMessage("");
    setEmail('')
  };


  useEffect(() => {
    setHeader(<Title>Invite to Subscribe</Title>);
  }, [])

  return (
    <div className="container mx-auto bg-white p-6 shadow-md rounded-lg">
      {/* <Title>{"Send Newsletter"}</Title> */}
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">


        <div>
          <label className="block mb-1 font-medium"><Text>To</Text></label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>


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



           <TinyEditor value={message} onChange={setMessage} />
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
