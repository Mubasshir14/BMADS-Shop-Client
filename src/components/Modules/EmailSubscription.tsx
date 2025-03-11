"use client";
import Link from "next/link";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";

const EmailSubscription = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    toast.success(
      "Thank you for your subscription. You will be notified about special offers and occassions"
    );
    setEmail("");
  };

  return (
    <div className="max-w-screen-xl mx-auto my-8 px-4">
      <div className="border border-dashed border-blue-300 rounded-xl bg-blue-50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              Get updates and special offers from BDMADS
            </h2>
            <p className="text-blue-700">
              Don't want to miss any of our updates? then join our email list.
              You'll receive all of the most recent advertising updates,
              discounts, and other awesome news straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex">
              <div className="relative flex-grow mr-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter the email address..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex items-center md:w-1/3">
            <Link
              passHref
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/fbadsx"
              className="bg-blue-500 p-4 rounded-lg"
            >
              <svg
                className="w-12 h-12 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </Link>
            <div className="ml-4">
              <h3 className="text-2xl font-bold">
                Be a part of our biggest{" "}
                <span className="text-blue-500">community</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSubscription;
