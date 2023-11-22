import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/api-limit";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return ( 
    <div className="h-full relative flex">
      {/* <div className="hidden md:flex md:w-72 md:flex-col md:inset-y-0 z-80 "> */}
      <div className="hidden md:flex md:w-72 inset-y-0 z-80 ">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="flex-col w-full overflow-y-auto">
        <Navbar />
        {children}
        <footer className="mt-10 text-center text-foreground md:block hidden">© Rewise</footer>
      </main>
    </div>
   );
}
 
export default DashboardLayout;
