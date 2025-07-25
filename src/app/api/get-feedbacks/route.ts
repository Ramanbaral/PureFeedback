import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async function (req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "user not authenticated",
        },
        { status: 401 }
      );
    }

    const userId = session?.user._id;

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const pageNumber = parseInt(page as unknown as string) || 1;
    const skipItem = (pageNumber - 1) * 9;

    const messages = await prisma.message.findMany({
      skip: skipItem,
      take: 9,
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "succesfully fetched feedbacks.",
        feedbacks: messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "error retriving messages.",
      },
      { status: 500 }
    );
  }
};
