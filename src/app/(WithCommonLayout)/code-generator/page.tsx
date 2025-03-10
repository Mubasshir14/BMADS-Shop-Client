"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Clipboard, RefreshCw } from "lucide-react";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const TwoFactorAuth = () => {
  const [otp, setOtp] = useState(generateOTP());

  const regenerateOTP = () => {
    setOtp(generateOTP());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(otp);
    alert("OTP copied to clipboard!");
  };

  return (
    <div className="max-w-screen-xl mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6 bg-blue-600 text-white shadow-lg rounded-2xl">
        <CardHeader className="text-center text-xl font-bold uppercase">
          2FA Code Generator
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="text-4xl font-mono tracking-widest bg-white text-blue-600 px-6 py-2 rounded-lg shadow">
            {otp}
          </div>
          <div className="flex gap-3">
            <Button
              onClick={regenerateOTP}
              className="bg-blue-800 hover:bg-blue-700"
            >
              <RefreshCw className="w-5 h-5 mr-2" /> Regenerate
            </Button>
            <Button
              onClick={copyToClipboard}
              className="bg-blue-500 hover:bg-blue-400"
            >
              <Clipboard className="w-5 h-5 mr-2" /> Copy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFactorAuth;
