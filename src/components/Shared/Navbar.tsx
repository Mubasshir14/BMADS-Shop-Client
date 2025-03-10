"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  FaBolt,
  FaHeadset,
  FaShieldAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import Link from "next/link";
import { BsTelegram } from "react-icons/bs";
import { Button } from "../ui/button";
import { useUser } from "../context/UserContext";
import { logout } from "../services/Auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants";


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading } = useUser();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const hamburger = document.getElementById("hamburger-button");

      if (
        isOpen &&
        sidebar &&
        hamburger &&
        !sidebar.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
          scrolled
            ? "bg-blue-600 shadow-lg"
            : "bg-gradient-to-b from-blue-500 to-blue-600"
        }`}
      >
        <div className="container max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              {/* -rotate-12 */}
              <div
                onClick={() => router.push("/")}
                className="bg-blue-600 cursor-pointer p-4 rounded-full transform  shadow-lg border-2 border-blue-400"
              >
                <div className="text-white font-bold text-xl tracking-wider cursor-pointer">
                  PROADS.SHOP
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 w-6 h-6 rounded-full"></div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-6 text-white font-medium">
              <Link
                href="/"
                className="hover:text-blue-200 transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all group-hover:w-full"></span>
              </Link>

              <Link
                href="/contact"
                className="hover:text-blue-200 transition-colors relative group"
              >
                Contact Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/about"
                className="hover:text-blue-200 transition-colors relative group"
              >
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/blog"
                className="hover:text-blue-200 transition-colors relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all group-hover:w-full"></span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            {!user ? (
              <>
                <div className="flex space-x-4 ml-6">
                  <Button
                    className="bg-gray-200 hover:bg-blue-50 text-blue-600 px-5 py-2.5 rounded-lg flex items-center shadow-md transition-all hover:shadow-lg font-medium"
                    onClick={() => window.open("https://t.me/fbadsx", "_blank")}
                  >
                    <BsTelegram className="mr-2" />
                    Telegram
                  </Button>

                  <Link href="/login">
                    <Button className="bg-gray-200 hover:bg-blue-50 text-blue-600 px-5 py-2.5 rounded-lg flex items-center shadow-md transition-all hover:shadow-lg font-medium">
                      <LuLogIn className="mr-2" />
                      Sign in
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex space-x-4 ml-6">
                  <Button
                    className="bg-gray-200 hover:bg-blue-50 text-blue-600 px-5 py-2.5 rounded-lg flex items-center shadow-md transition-all hover:shadow-lg font-medium"
                    onClick={() => window.open("https://t.me/fbadsx", "_blank")}
                  >
                    <BsTelegram className="mr-2" />
                    Telegram
                  </Button>

                  {user && user.role === "admin" ? (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>User</AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href="/profile">Profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/dashboard/${user?.role}`}>
                              Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            onClick={handleLogOut}
                          >
                            <LogOut />
                            <span>Log Out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  ) : (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>User</AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            onClick={handleLogOut}
                          >
                            <LogOut />
                            <span>Log Out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          {/*  */}

          <button
            id="hamburger-button"
            className="lg:hidden text-white p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-sidebar"
        className={`fixed top-0 right-0 w-full sm:w-80 h-full bg-blue-600 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex justify-end p-4">
            <button
              className="text-white p-2 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          <div className="flex flex-col px-6 py-4 space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* -rotate-12 */}
                <div className="bg-blue-700 p-4 rounded-full transform  shadow-lg border-2 border-blue-400">
                  <div className="text-white font-bold text-xl tracking-wider">
                    PROADS.SHOP
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 w-6 h-6 rounded-full"></div>
              </div>
            </div>

            <Link
              href="/"
              className="text-white text-lg py-2 px-4 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Home
            </Link>

            <Link
              href="/contact"
              className="text-white text-lg py-2 px-4 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="text-white text-lg py-2 px-4 hover:bg-blue-500 rounded-lg transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className="text-white text-lg py-2 px-4 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Blog
            </Link>

            {!user ? (
              <>
                <div className="flex flex-col space-y-4 mt-6">
                  <Button
                    className="bg-white hover:bg-blue-50 text-blue-600 px-5 py-3 rounded-lg flex items-center justify-center shadow-md transition-all hover:shadow-lg font-medium"
                    onClick={() => window.open("https://t.me/fbadsx", "_blank")}
                  >
                    <BsTelegram className="mr-2" />
                    Telegram
                  </Button>
                  <Link href="/login">
                    <Button className="bg-white hover:bg-blue-50 text-blue-600 px-5 py-3 rounded-lg flex items-center justify-center shadow-md transition-all hover:shadow-lg font-medium">
                      <LuLogIn className="mr-2" />
                      Sign in
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-4 mt-6">
                  <Button
                    className="bg-white hover:bg-blue-50 text-blue-600 px-5 py-3 rounded-lg flex items-center justify-center shadow-md transition-all hover:shadow-lg font-medium"
                    onClick={() => window.open("https://t.me/fbadsx", "_blank")}
                  >
                    <BsTelegram className="mr-2" />
                    Telegram
                  </Button>
                  {user && user.role === "admin" ? (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>User</AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href="/profile">Profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/dashboard/${user?.role}`}>
                              Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            onClick={handleLogOut}
                          >
                            <LogOut />
                            <span>Log Out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  ) : (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>User</AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            onClick={handleLogOut}
                          >
                            <LogOut />
                            <span>Log Out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="mt-auto p-6 border-t border-blue-500">
            <div className="flex flex-col space-y-4 text-white">
              <div className="flex items-center">
                <div className="bg-blue-500 p-2 rounded-lg mr-3">
                  <FaBolt className="text-white" />
                </div>
                <span>Instant delivery</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-500 p-2 rounded-lg mr-3">
                  <FaHeadset className="text-white" />
                </div>
                <span>Best Support</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-500 p-2 rounded-lg mr-3">
                  <FaShieldAlt className="text-white" />
                </div>
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navigation;
