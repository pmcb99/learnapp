import Image from "next/image";
import FallbackImage from "../fallback-image";


interface EmptyProps {
  label: string;
  subject?: string;
  width?: number;
  height?: number;
}

export const Empty = ({
  label,
  subject,
  width,
  height,
}: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="h-72 w-72 items-center justify-center">
        <FallbackImage src={`/subject-isomorphic/${subject}.png`} fallbackSrc={"/empty-light.png" } alt="Empty" width={width} height={height}/>
        {/* <Image src="/empty-light.png" fill alt="Empty"/> */}
      </div>
      <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  );
};
