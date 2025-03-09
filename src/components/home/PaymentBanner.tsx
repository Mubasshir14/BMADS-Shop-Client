import Image from "next/image";

const PaymentBanner = () => {
  return (
    <div className="flex items-center justify-between bg-blue-50 rounded-xl p-4 shadow-md border border-gray-200 max-w-4xl mx-auto">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12">
          <Image
            src="/bell-icon.png" // Change this to your actual bell image path
            alt="Alert Bell"
            width={48}
            height={48}
            className="animate-wiggle"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          Contact us to pay using this payment methods
        </h2>
      </div>

      {/* Payment Icons */}
      <div className="flex space-x-2 items-center">
        <Image src="/visa.png" alt="Visa" width={40} height={24} />
        <Image src="/mastercard.png" alt="MasterCard" width={40} height={24} />
        <Image src="/wise.png" alt="Wise" width={40} height={24} />
        <Image src="/payoneer.png" alt="Payoneer" width={40} height={24} />
        <Image src="/bank-transfer.png" alt="Bank Transfer" width={40} height={24} />
        <Image src="/iban.png" alt="IBAN" width={40} height={24} />
      </div>

      {/* Support Button */}
      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition">
        <span className="mr-1">➡</span> Support
      </button>
    </div>
  );
};

export default PaymentBanner;
