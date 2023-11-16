import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="">
      <AvatarImage className="dark:hidden" src="/logo.png"  />
      <AvatarImage className="hidden dark:block" src="/logo.png" />
    </Avatar>
  );
};
