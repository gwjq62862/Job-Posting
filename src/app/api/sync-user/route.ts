import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';


export async function POST() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await currentUser();
    if (!user || !user.primaryEmailAddress) {
      return NextResponse.json({ error: 'No user data' }, { status: 400 });
    }

    await prisma.user.upsert({
      where: { email: user.primaryEmailAddress.emailAddress },
      update: {
        clerkId,
        name: user.firstName || '',
        image: user.imageUrl,
        updatedAt: new Date(),
      },
      create: {
        clerkId,
        email: user.primaryEmailAddress.emailAddress,
        name: user.firstName || '',
        image: user.imageUrl,
        role: 'user',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}