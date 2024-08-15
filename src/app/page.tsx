import GlobalNav from "@/components/GlobalNav";
import Image from "next/image";
import TabSearch from "./TabSearch";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <GlobalNav />
      <TabSearch />
    </main>
  );
}
