import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";

const TopicLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { topic: string };
}) => {
  const topicName = params.topic;
  // convert topic to capitals and replace dashes with spaces
  const topic = topicName.replace(/-/g, " ").toUpperCase();
  return (
    <div className="pt-2">
      <div className="flex bg-gray-100 justify-center gap-x-6 items-center pl-5">
        <div className="">
        <BackButton/>
        </div>
        <h1 className="text-4xl font-bold text-gray-800">{topic}</h1>
      </div>
      {children}
    </div>
  );
};

export default TopicLayout;
