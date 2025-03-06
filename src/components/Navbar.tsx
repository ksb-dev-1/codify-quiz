"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// hooks
import { useHeaderShadowOnScroll } from "@/hooks/useHeaderShadowOnScroll";
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd party
import { useSession, signOut } from "next-auth/react";
import { GrMenu } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const title = "{Codify}";

  useHeaderShadowOnScroll(navbarRef);

  return (
    <header
      ref={navbarRef}
      className="fixed z-10 bg-white top-0 left-0 right-0 border-b flex justify-center h-[4.5rem]"
    >
      <nav className="max-w-4xl w-full p-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-extrabold hover:text-hover transition-colors"
        >
          {title}
        </Link>

        {children}
      </nav>
    </header>
  );
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false); // Set initial state to false
  const sideNavRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const title = "{Codify}";

  useHandleOutsideClick(profileRef, setIsOpen);
  useHandleOutsideClick(sideNavRef, setIsSideNavOpen);

  // To handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isSideNavOpen) {
        setIsSideNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [isSideNavOpen]);

  const handleSignOut = () => {
    signOut();
    setIsOpen((prev) => !prev);
  };

  if (status === "loading") {
    return (
      <NavbarWrapper>
        <div className="hidden sm:flex items-center">
          <span className="skeleton text-transparent px-4 py-2 rounded-custom">
            Questions
          </span>
          <span className="skeleton text-transparent px-4 py-2 rounded-custom mx-4">
            Bookmarks
          </span>
          <span className="skeleton text-transparent px-4 py-2 rounded-custom">
            Premium
          </span>
        </div>

        <div className="hidden sm:flex skeleton h-10 w-10 rounded-full"></div>
        <div className="flex sm:hidden skeleton h-8 w-8 rounded-custom"></div>
      </NavbarWrapper>
    );
  }

  if (session?.user?.id) {
    return (
      <>
        <NavbarWrapper>
          <div className="hidden sm:flex items-center">
            <Link
              href="/pages/questions?page=1"
              className="px-4 py-2 rounded-custom hover:bg-slate-200 transition-colors"
            >
              Questions
            </Link>
            <Link
              href="/pages/saved"
              className="px-4 py-2 rounded-custom hover:bg-slate-200 transition-colors mx-4"
            >
              Saved
            </Link>
            <Link
              href="#"
              className="px-4 py-2 rounded-custom hover:bg-slate-200 transition-colors"
            >
              Premium
            </Link>
          </div>

          <div ref={profileRef} className="hidden sm:block relative ml-8">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="image"
                height={40}
                width={40}
                className="cursor-pointer rounded-full object-cover"
                onClick={() => setIsOpen((prev) => !prev)}
              />
            ) : (
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative h-[35px] w-[35px] rounded-full bg-primary text-white hover:bg-hover transition-colors cursor-pointer"
              >
                <FaCircleUser className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl" />
              </div>
            )}

            <div
              className={`${
                isOpen ? "scale-100" : "scale-0"
              } w-max absolute right-0 bg-white border shadow-xl rounded-custom p-2 mt-2 origin-top-right transition-transform`}
            >
              <Link
                href="/pages/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2 rounded-custom hover:bg-slate-200 transition-colors"
              >
                <FaRegUser className="mr-4" /> Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center px-4 py-2 rounded-custom hover:bg-slate-200 transition-colors"
              >
                <FiLogOut className="mr-4" />
                Sign out
              </button>
            </div>
          </div>
          <GrMenu
            onClick={() => setIsSideNavOpen(true)}
            className="cursor-pointer flex sm:hidden text-2xl hover:text-hover transition-colors"
          />
        </NavbarWrapper>

        {/* Side Navigation Overlay */}
        <div
          className={`${
            isSideNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-20`}
        >
          <div className="absolute top-4 right-4 h-10 w-10 rounded-custom cursor-pointer bg-red-600 hover:bg-red-400 transition-colors">
            <IoClose
              onClick={() => setIsSideNavOpen(false)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl "
            />
          </div>
          {/* Side Navigation */}
          <nav
            ref={sideNavRef}
            className={`${
              isSideNavOpen ? "translate-x-0" : "-translate-x-[100%]"
            } absolute top-0 left-0 bottom-0 w-52 bg-white transition-transform duration-300 z-30`}
          >
            <div className="flex flex-col h-full">
              <div className="w-full border-b h-[72px] flex flex-col items-start justify-center pl-4">
                <Link
                  href="/"
                  onClick={() => setIsSideNavOpen(false)}
                  className="font-extrabold rounded-custom text-2xl text-primary hover:text-hover transition-colors"
                >
                  {title}
                </Link>
              </div>
              <div className="flex flex-col items-start mt-8 px-4 space-y-2 text-xl">
                <Link
                  href="/pages/questions?page=1"
                  onClick={() => setIsSideNavOpen(false)}
                  className="w-full px-4 py-2 rounded-custom hover:bg-slate-200 transition-colors"
                >
                  Questions
                </Link>
                <Link
                  href="/pages/saved"
                  onClick={() => setIsSideNavOpen(false)}
                  className="w-full px-4 py-2 rounded-custom hover:bg-slate-200 transition-colors"
                >
                  Saved
                </Link>
                <Link
                  href="#"
                  onClick={() => setIsSideNavOpen(false)}
                  className="w-full px-4 py-2 rounded-custom hover:bg-slate-200 transition-colors"
                >
                  Premium
                </Link>
                <Link
                  href="/pages/profile"
                  onClick={() => setIsSideNavOpen(false)}
                  className="w-full px-4 py-2 rounded-custom hover:bg-slate-200 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-start w-full px-4 py-2 rounded-custom hover:bg-slate-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }

  return (
    <NavbarWrapper>
      <Link
        href="/pages/signin"
        className="px-4 py-2 rounded-custom bg-primary text-white hover:bg-hover transition-colors"
      >
        Sign in
      </Link>
    </NavbarWrapper>
  );
}
