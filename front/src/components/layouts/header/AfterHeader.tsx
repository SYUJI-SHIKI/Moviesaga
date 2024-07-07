"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiFilmProjector } from "react-icons/gi";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import AfterLoginNav from "@/components/elements/Sheet/AfterLoginNav";
import { Sheet, SheetTrigger, SheetTitle, SheetContent } from "@/components/ui/sheet";

const AfterHeader: React.FC = () => {
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
    <>
      <header className="fixed top-0 left-0 z-40 p-0 m-0 w-full bg-transparent">
        <div className="flex items-center">
          <Link href="/">
            <div>
              <Image src="/logo.png" alt="Logo" width={130} height={50}
                className="ml-20 mt-7 lg:w-[180px]" /> 
            </div>
          </Link>
          <div className="lg:hidden flex">
            <button
              onClick={toggleMenu}
              className="fixed text-white focus:outline-none right-20 z-50"
            >
              {isOpen ?  null : <GiFilmProjector size={40} className="rounded-full border-4 border-white" />}
            </button>
          </div>
          {isOpen && (
            <div className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-90 z-40 flex justify-center items-center`}>
              <div className="flex flex-col items-center justify-center h-full space-y-6">
              <AfterLoginNav onClose = {toggleMenu} />
              </div>
            </div>
          )}
          <div className="hidden lg:block fixed right-20 text-white focus:outline-none z-30">
            <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
              <SheetTrigger asChild>
                <button
                  onClick={toggleNav}
                >
                  {isNavOpen ? null : <GiFilmProjector size={60} className="rounded-full border-4 border-white" />}
                </button>
              </SheetTrigger>
              <SheetContent className="bg-[url('/navbar.jpg')] bg-cover shadow-inner opacity-80 border-amber-950">
                <SheetTitle></SheetTitle>
                  <AfterLoginNav onClose = {toggleNav} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}

export default AfterHeader;