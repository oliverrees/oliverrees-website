"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Replace with your actual Supabase details
const supabaseUrl = "https://gjfrdkwykkrxuxjdahip.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqZnJka3d5a2tyeHV4amRhaGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2Njg3NTAsImV4cCI6MjAwMDI0NDc1MH0.OgaHE1HFm-DqtM6e0bBx2D5rfWoaLGSKBNCcwCI9Ph4";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showMailing, setShowMailing] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("jetclock_emails")
      .insert([{ email }]);

    if (error) {
      setError(true);
      setMessage(error.message);
    } else {
      setError(false);
      setMessage("Email saved! I'll be in touch soon.");
      setEmail("");
      setShowMailing(false);
    }
  };

  return (
    <>
      {showMailing && (
        <form onSubmit={handleSubmit} className="mt-6 mb-12">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Submit
          </button>
        </form>
      )}
      {message && (
        <p
          className={`text-sm mt-2 ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </>
  );
}
