import LoginForm from "@/components/Modules/Auth/Login";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
