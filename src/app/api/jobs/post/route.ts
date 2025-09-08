import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    console.log("🔐 Clerk ID from auth():", clerkId);

    if (!clerkId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
    });
    console.log("👤 User from DB:", user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    console.log("📥 Received job data:", body);

    const job = await prisma.job.create({
      data: {
        title: body.title,
        company: body.company,
        salary: body.salary,
        location: body.location,
        type: body.type,
        discription: body.discription,
        authorId: user.id,
      },
    });

    console.log("✅ Job saved:", job);
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("❌ Error in /api/jobs/post:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}