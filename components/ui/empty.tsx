import Image from "next/image";
import FallbackImage from "../fallback-image";


interface EmptyProps {
  label: string;
  subject?: string;
}

export const Empty = ({
  label,
  subject
}: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <FallbackImage src={`/subject-isomorphic/${subject}.png`} fallbackSrc={"/empty-light.png" } alt="Empty"/>
        {/* <Image src="/empty-light.png" fill alt="Empty"/> */}
      </div>
      <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  );
};
