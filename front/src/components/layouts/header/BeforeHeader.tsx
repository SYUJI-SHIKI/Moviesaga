"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
import { GiFilmProjector } from "react-icons/gi";
import BeforeLoginNav from "@/components/elements/Sheet/BeforeLoginNav";
import { Sheet, SheetTrigger, SheetTitle, SheetContent } from "@/components/ui/sheet";
import styles from "./Header.module.css";

const BeforeHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
      setIsNavOpen(false);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    }, [router.events]
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="fixed top-0 left-0 z-50 p-0 m-0 w-full bg-transparent">
      <div className="flex items-center">
        <Link href="/">
          <div　className="ml-20 mt-7 font-Anton md:text-5xl text-2xl text-amber-100">
            MovieSaga
          </div>
        </Link>
        <div className="lg:hidden flex">
          <button
            onClick={toggleMenu}
            className="fixed text-white focus:outline-none right-20 z-50"
          >
            {isOpen ? null : <GiFilmProjector size={40} className="rounded-full border-4 bg-black border-white" />}
          </button>
        </div>
        {isOpen && (
          <div className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-90 z-40 flex justify-center items-center`}>
            <div className="flex flex-col items-center justify-center h-full space-y-6">
            <BeforeLoginNav onClose = {toggleMenu} />
            </div>
          </div>
        )}
        <div className="hidden lg:block fixed right-20 text-white md:mt-10 focus:outline-none z-30">
          <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
            <SheetTrigger asChild>
              <button
                onClick={toggleNav}
              >
                {isNavOpen ? null : <GiFilmProjector size={60} className="rounded-full bg-black border-4 border-white" />}
              </button>
            </SheetTrigger>
            <SheetContent className="bg-[url('/navbar.jpg')] bg-cover shadow-inner opacity-70 border-amber-950">
              <SheetTitle></SheetTitle>
                <BeforeLoginNav onClose = {toggleNav} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default BeforeHeader;