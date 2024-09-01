import GlobalNav from "@/components/GlobalNav";
import TabSearch from "./TabSearch";
import Tab from "@/components/Tab";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <GlobalNav />
      <TabSearch />
    </main>
  );
}
