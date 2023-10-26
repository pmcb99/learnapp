import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1 dark:hidden" src="/logo-light.png"  />
      <AvatarImage className="p-1 hidden dark:block" src="/logo-light.png" />
    </Avatar>
  );
};
