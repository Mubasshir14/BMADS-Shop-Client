import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsTelegram } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";
import etherium from "../../assets/ethereum-eth.svg";
import bitcoin from "../../assets/bitcoin.svg.png";
import payoneer from "../../assets/Payoneer-Logo.wine.png";
import trust from "../../assets/trust.png";
import macfree from "../../assets/McAFEE.png";
import coinbase from "../../assets/coiinbase.png";
import usd from "../../assets/usd-coin-usdc-logo.png";
import bank from "../../assets/free-bank-transfer-circle-round-payment-method-icon-19792-thumb.png";
import tether from "../../assets/tether-usdt-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8 bg-white">
      <div className="container max-w-screen-xl mx-auto px-4">
        {/* Navigation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div>
            {/* Logo and Copyright */}
            <div className="mb-6">
              <h1 className="lg:text-3xl text-lg font-bold mb-2">BDMADS</h1>
            </div>

            {/* Social Media Icons */}
            <div className="flex mb-8 space-x-4">
              <Link
                passHref
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/fbadsx"
                className="text-blue-500 p-2 rounded-full"
              >
                <BsTelegram className="text-4xl" />
              </Link>
              <Link
                passHref
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/447462481875"
                className="text-green-500 p-2 rounded-full"
              >
                <FaWhatsapp className="text-4xl" />
              </Link>
            </div>
          </div>
          {/* INQUIRIES */}
          <div>
            <h2 className="font-bold text-lg mb-4">INQUIRIES</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-700 hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-blue-500"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h2 className="font-bold text-lg mb-4">HELP</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-buy"
                  className="text-gray-700 hover:text-blue-500"
                >
                  How to buy?
                </Link>
              </li>
            </ul>
          </div>

          {/* POLICIES */}
          <div>
            <h2 className="font-bold text-lg mb-4">POLICIES</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-condition"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h2 className="font-bold text-lg mb-4">USEFUL LINKS</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/code-generator"
                  className="text-gray-700 hover:text-blue-500"
                >
                  2FA Code Generator
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="mb-3 border-gray-200" />
        {/* Payment Methods */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Image src={etherium} alt="Ethereum" width={60} height={30} />
          <Image src={tether} alt="Tether" width={60} height={30} />
          <Image src={coinbase} alt="Coinbase" width={60} height={30} />
          <Image src={bitcoin} alt="Bitcoin" width={60} height={30} />
          <Image src={usd} alt="USDCoin" width={60} height={30} />
          <Image src={bank} alt="Bank Transfer" width={60} height={30} />
          <Image src={payoneer} alt="Payoneer" width={60} height={30} />
        </div>

        {/* Security Badges */}
        <div className="flex justify-center gap-8 mb-8">
          <Image src={macfree} alt="McAfee Secure" width={60} height={40} />
          <Image src={trust} alt="TrustedSite" width={60} height={40} />
        </div>
      </div>

      {/* Support Button */}
      <div className="fixed bottom-4 left-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
          <span className="mr-2">🔥</span>
          <span>Support</span>
        </button>
      </div>

      {/* Shopping Cart */}
      <div className="fixed bottom-4 right-4"></div>
    </footer>
  );
};

export default Footer;
