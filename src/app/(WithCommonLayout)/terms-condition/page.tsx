import React from "react";

const TermsConditions = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  px-4 my-26">
      <div className="max-w-2xl w-full p-8 border border-gray-300  rounded-2xl shadow-lg bg-white transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-blue-400 text-center mb-4">
          Terms & Conditions
        </h2>
        <p className="text-lg text-gray-600  text-center">
          By using <span className="font-semibold text-blue-400">BDMADS</span>,
          you agree to our policies regarding food safety, delivery, and
          payments.
        </p>

        <div className="mt-6 space-y-4 text-gray-600 ">
          <div className="p-4 border-l-4 border-blue-400 bg-gray-100  rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400">
              1. Food Safety
            </h3>
            <p className="mt-1">
              We ensure all meals are prepablue with the highest hygiene
              standards. Once deliveblue, consumption is at your own
              responsibility.
            </p>
          </div>

          <div className="p-4 border-l-4 border-blue-400 bg-gray-100  rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400">
              2. Delivery Policy
            </h3>
            <p className="mt-1">
              Estimated delivery time is between{" "}
              <span className="font-semibold">30-60 minutes</span>. Delays may
              occur due to weather, traffic, or unforeseen circumstances.
            </p>
          </div>

          <div className="p-4 border-l-4 border-blue-400 bg-gray-100  rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400">
              3. Payment & Refunds
            </h3>
            <p className="mt-1">
              Payments must be made online or via cash on delivery. Refunds are
              only applicable for incorrect or damaged orders, requested within{" "}
              <span className="font-semibold">24 hours</span>.
            </p>
          </div>

          <div className="p-4 border-l-4 border-blue-400 bg-gray-100  rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400">
              4. User Responsibilities
            </h3>
            <p className="mt-1">
              Users must provide accurate delivery details. MealHut is not
              responsible for orders deliveblue to incorrect addresses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
