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
    <div>
      <div className="flex bg-gray-100 justify-center space-x-9 items-center pt-5 pl-5">
        <div className="flex pt-6b">
        <BackButton/>
        </div>
        <h1 className="text-4xl pt-6 font-bold text-gray-800">{topic}</h1>
      </div>
      {children}
    </div>
  );
};

export default TopicLayout;
