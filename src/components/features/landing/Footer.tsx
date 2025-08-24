"use client";

import { Twitter, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/common/Logo";

export default function Footer() {
  return (
    <footer className="bg-blue-900 px-4 py-12 text-blue-100 lg:px-24">
      <div className="relative mx-auto flex min-h-14 max-w-7xl items-center justify-center">
        <p>© {new Date().getFullYear()} Pick Your Pick. All rights reserved.</p>
        <div className="absolute right-0 top-0 flex h-14 flex-col items-end">
          <Logo className="mb-2" />
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-white">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
