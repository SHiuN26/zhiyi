"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export const Header = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const switchLocale = locale === "zh" ? "en" : "zh";
  const basePath = "/" + pathname.split("/").slice(2).join("/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/cases`, label: t("cases") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 p-4 text-white transition-all duration-300 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 ${
        scrolled ? "bg-sky-600 shadow-md" : "bg-sky-500"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="text-2xl font-bold">
          {" "}
          <Link
            href={`/${locale}`}
            onClick={handleLinkClick}
            className="text-2xl font-bold hover:opacity-80"
          >
            致一冷凍空調-Zhiyi
          </Link>
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <nav
        id="main-navigation"
        className={`transition-all duration-300 ease-in-out flex-col md:flex-row md:flex md:items-center w-full md:w-auto gap-4 text-sm md:text-base mt-2 md:mt-0 ${
          menuOpen ? "flex max-h-[500px]" : "hidden max-h-0 md:flex"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => handleLinkClick()}
            className={`whitespace-nowrap hover:underline text-center ${
              pathname === href ? "font-semibold underline" : ""
            }`}
            aria-current={pathname === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
        <Link
          className="whitespace-nowrap underline  text-center"
          href={`/${switchLocale}${basePath}`}
          onClick={() => handleLinkClick()}
        >
          {switchLocale === "zh" ? "中文" : "EN"}
        </Link>
      </nav>
    </header>
  );
};
