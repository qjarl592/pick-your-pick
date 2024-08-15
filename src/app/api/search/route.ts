import { bigIntToString } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword");

    const queryOptions: any = {
      select: {
        id: true,
        title: true,
        artist: true,
        thumbnail_url: true,
      },
    };

    if (keyword?.length) {
      queryOptions.where = {
        title: {
          contain: keyword,
          mode: "insensitive",
        },
        artist: {
          contain: keyword,
          mode: "insensitive",
        },
      };
      const tabSearch = await prisma.tab.findMany(queryOptions);
      const tabSearchSerialized = bigIntToString(tabSearch);
      return NextResponse.json(
        { result: tabSearchSerialized },
        { status: 200 }
      );
    } else {
      const tabSample = await prisma.tab_Sample.findMany(queryOptions);
      const tabSampleSerialized = bigIntToString(tabSample);
      return NextResponse.json(
        { result: tabSampleSerialized },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      { error: "Error fetching tab samples" },
      { status: 500 }
    );
  }
}
