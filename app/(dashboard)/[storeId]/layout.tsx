import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { getAuth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
  children,
  params,
  request,
}: {
  children: React.ReactNode;
  params: { storeId: string };
  request: NextRequest; // Ensure the request type is NextRequest
}) {
  const { userId } = getAuth(request); // Use getAuth with NextRequest

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return <>{children}</>;
}
