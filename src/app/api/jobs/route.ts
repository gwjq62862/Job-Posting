import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("query") || undefined;
    const type = searchParams.get("type") || undefined;
    const salary = searchParams.get("salary") || undefined;
    const location = searchParams.get("location") || undefined;

    const jobs = await prisma.job.findMany({
      where: {
        title: query ? { contains: query, mode: "insensitive" } : undefined,
        type: type || undefined,
        location: location
          ? { contains: location, mode: "insensitive" }
          : undefined,
        salary: salary
          ? { contains: salary, mode: 'insensitive' }
          : undefined,
      },
      orderBy: { postAt: "desc" },
      include: { author: true },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

