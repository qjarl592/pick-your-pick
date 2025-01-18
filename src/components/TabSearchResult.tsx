// "use client";

// import { useQuery } from "@tanstack/react-query";
// import React from "react";

// import { ScrollArea } from "@/components/ui/scroll-area";
// import { getTabTableAll } from "@/services/prisma";

// import TabInfo from "./TabInfo";

// interface Props {
//   keyword: string;
// }

// export default function TabSearchResult(props: Props) {
//   const { keyword } = props;

//   const { data } = useQuery({
//     queryKey: ["searchTabs", keyword],
//     queryFn: getTabTableAll,
//   });

//   return (
//     <ScrollArea className="h-[50vh] w-full rounded-xl border border-gray-200 shadow-md">
//       <div className="p-4">
//         {!keyword.length && <h4 className="mb-4 text-lg">Sample Tabs</h4>}
//         {data?.map((tabInfo) => <TabInfo key={tabInfo.id} tabInfo={tabInfo} />)}
//       </div>
//     </ScrollArea>
//   );
// }
