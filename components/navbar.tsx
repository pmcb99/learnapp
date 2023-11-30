import { UserButton } from "@clerk/nextjs";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkIfUserHasAccessCode, checkSubscription } from "@/lib/subscription";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import ThemeSwitcherButton from "./theme-switcher-button";
import { useTopicModal } from "@/hooks/use-topic-modal";
import { TopicButton } from "./topic-button";

interface NavbarProps {
  showMobileSidebar: boolean;
}

const Navbar = async (
  props: NavbarProps
) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const userHasAccessCode = await checkIfUserHasAccessCode();

  console.log(props.showMobileSidebar)


  return ( 
    <div className="flex items-center p-4">
      {!props.showMobileSidebar && (<div className="md:hidden gap-x-4">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} userHasAccessCode={userHasAccessCode}/>
      </div>)}
      {props.showMobileSidebar && (<div className="gap-x-4">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} userHasAccessCode={userHasAccessCode}/>
      </div>)}
      <div className="flex w-full items-center gap-x-4 justify-end">
        <ThemeSwitcherButton />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
   );
}
 
export default Navbar;