"use client";

import Head from "next/head";
import Link from "next/link";
import Logo from "./Logo";
import {
  YoutubeIcon,
  FacebookIcon,
  LinkedinIcon,
  MoonIcon,
  SunIcon,
  InstagramIcon,
} from "../Icons";
import siteMetadata from "@/utils/siteMetaData";
import { useThemeSwitch } from "../Hooks/useThemeSwitch";
import { useState } from "react";
import { cx } from "@/utils";

const Header = () => {
  const [mode, setMode] = useThemeSwitch();
  const [click, setClick] = useState(false);

  const toggle = () => {
    setClick(!click);
  };

  return (
    <>
      {/* Adding Head component with meta tags */}
      <Head>
        <title>Epics solution | Online courses and blogs</title>
        <meta
          name="description"
          content="help student to inroll in best courses around the globe and improve there skills."
        />

        {/* Open Graph (Facebook, LinkedIn) Meta Tags */}
        <meta
          property="og:title"
          content="Epics solution | Online courses and blogs"
        />
        <meta
          property="og:description"
          content="help student to inroll in best courses around the globe and improve there skills."
        />
        <meta
          property="og:image"
          content=""
        />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />

        {/* Facebook-specific meta tag */}
        <meta property="fb:app_id" content="your-facebook-app-id" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Epics solution | Online courses and blogs"
        />
        <meta
          name="twitter:description"
          content="help student to inroll in best courses around the globe and improve there skills"
        />
        <meta
          name="twitter:image"
          content=""
        />
      </Head>

      <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between relative z-50">
        {/* Logo Section */}
        <Logo />

        {/* Hamburger Menu for Mobile */}
        <button
          className="inline-block sm:hidden z-50"
          onClick={toggle}
          aria-label="Hamburger Menu"
        >
          <div className="w-10 cursor-pointer transition-all ease duration-300">
            <div className="relative">
              <span
                className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
                style={{
                  transform: click
                    ? "rotate(-45deg) translateY(0)"
                    : "rotate(0deg) translateY(6px)",
                }}
              />
              <span
                className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
                style={{
                  opacity: click ? 0 : 1,
                }}
              />
              <span
                className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
                style={{
                  transform: click
                    ? "rotate(45deg) translateY(0)"
                    : "rotate(0deg) translateY(-6px)",
                }}
              />
            </div>
          </div>
        </button>

        {/* Navigation Menu for Mobile */}
        <nav
          className={`${
            click ? "top-20" : "-top-40"
          } w-full sm:w-max py-7 px-6 sm:px-8 border border-solid border-dark rounded-full font-medium capitalize items-center flex flex-col sm:hidden
          fixed left-0 right-0 mx-auto bg-light/80 backdrop-blur-sm z-40 transition-all ease duration-300`}
        ><Link href="/" className="my-2">
        Home
      </Link>
      <Link href="/dev" className="my-2">
        Development
      </Link>
      <Link href="/eng" className="my-2">
        Engineering
      </Link>

      <Link href="/mar" className="my-2">
        Marketing
      </Link>

      <Link href="/ai" className="my-2">
            Artificial Intelligience
          </Link>

          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={cx(
              "w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1",
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            )}
            aria-label="theme-switcher"
          >
            {mode === "light" ? (
              <MoonIcon className="fill-dark" />
            ) : (
              <SunIcon className="fill-dark" />
            )}
          </button>
        </nav>

        {/* Navigation Menu for Desktop */}
        <nav
          className="hidden sm:flex items-center justify-between w-max py-3 px-11 space-x-10 border border-solid border-dark rounded-full font-medium capitalize
          fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-40"
        >
          <Link href="/" className="my-2">
            Home
          </Link>
          <Link href="/dev" className="my-2">
            Development
          </Link>
          <Link href="/eng" className="my-2">
            Engineering
          </Link>

          <Link href="/mar" className="my-2">
            Marketing
          </Link>

          <Link href="/ai" className="my-2">
            Artificial Intelligience
          </Link>
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={cx(
              "w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1",
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            )}
            aria-label="theme-switcher"
          >
            {mode === "light" ? (
              <MoonIcon className="fill-dark" />
            ) : (
              <SunIcon className="fill-dark" />
            )}
          </button>
        </nav>

        {/* Social Media Icons */}
        <div className="hidden sm:flex items-center space-x-4">
          <a
            href={siteMetadata.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedinIcon className="w-6 h-6 hover:scale-125 transition-all ease duration-200" />
          </a>
          <a
            href={siteMetadata.facebook}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FacebookIcon className="w-6 h-6 hover:scale-125 transition-all ease duration-200" />
          </a>
          <a
            href={siteMetadata.youtube}
            rel="noopener noreferrer"
            target="_blank"
          >
            <YoutubeIcon className="w-6 h-6 hover:scale-125 transition-all ease duration-200" />
          </a>
          <a
            href={siteMetadata.instagram}
            rel="noopener noreferrer"
            target="_blank"
          >
            <InstagramIcon className="w-6 h-6 hover:scale-125 transition-all ease duration-200" />
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
