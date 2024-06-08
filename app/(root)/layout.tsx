import { redirect } from "next/navigation";
import { getAuth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";

export default async function SetupLayout({
  children,
  params,
  request,
}: {
  children: React.ReactNode;
  params: { storeId: string };
  request: NextRequest; // Ensure the request type is NextRequest
}) {
  const { userId } = getAuth(request);
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
