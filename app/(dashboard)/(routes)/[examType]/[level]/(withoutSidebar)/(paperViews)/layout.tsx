import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkIfUserHasAccessCode, checkSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/api-limit";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return ( 
    <div className="h-full relative flex">
      <main className="flex-col w-full overflow-y-auto">
        <Navbar showMobileSidebar={true}/>
        {children}
        <footer className="mt-10 text-center text-foreground md:block hidden">© Rewise</footer>
      </main>
    </div>
   );
}
 
export default DashboardLayout;
