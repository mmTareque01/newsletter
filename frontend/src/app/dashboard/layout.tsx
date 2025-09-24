import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import Backdrop from "@/components/Backdrop";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  // Mark as async
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value; // Add await

  if (!token) {
    redirect("/signin");
  }

  return (
    <div className="flex bg-[#F9FAFB]">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>

        <div className="flex-1 transition-all duration-[1000] ease-in-out ">

       
        <AppHeader />
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6 bg-[#F9FAFB]">
          {children}
        </div>
      </div>
    </div>
  );
}
