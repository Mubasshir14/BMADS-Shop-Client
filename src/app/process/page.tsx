import { Loader } from "lucide-react";

const ProcessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 p-3 rounded-full mb-5 animate-spin">
            <Loader className="size-40 text-yellow-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Processing...
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Your request is currently being processed. Please wait a moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;
