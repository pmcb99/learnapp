"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton: React.FC = () => {
    const router = useRouter();
    return ( 
        <>
        <Button className="flex items-center w-[100px]" onClick={() => {router.back()}}>
            <ArrowLeft className="mr-5"/>
            Back
        </Button>
        </>
     );
}
 
export default BackButton;