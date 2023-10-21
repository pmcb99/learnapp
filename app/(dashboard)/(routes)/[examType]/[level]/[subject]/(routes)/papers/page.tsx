import { ArrowRight, Book } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { tools } from "@/constants";
import { subjects } from "@/constants";
import prismadb from "@/lib/prismadb";
import CardList, { CardListProps, CardProps } from "@/components/card-list";
import axios from "axios";
import { s3 } from "@/app/api/(s3)/client";
import { LC_BUCKET_NAME } from "@/app/constants";

export default async function HomePage(
    params: { params: { subject: string, level: string, examType: string, year: string, paper: string }; }
) {

    const values = {
        Bucket: LC_BUCKET_NAME,
        Prefix: `${params.params.level}/${params.params.subject}/`
    }

    const files = await s3.listObjects(values).promise();
    console.log(files)

    var examPaperKeys = files.Contents?.filter(file => file.Key?.includes('exam-paper'))
    //filter out undefined values, and sort in reverse order
    examPaperKeys = examPaperKeys?.filter(file => file.Key !== undefined).reverse()

    const items: CardProps[] = [];
    
    function cleanUpFileName(fileName: string) {
        if (fileName.includes('ection')) {
            const formattedFileName = fileName.replaceAll('.pdf','').replaceAll("___"," ").replaceAll("__"," ").replaceAll("_"," ").replaceAll("(EV)","")
        return ` - ${formattedFileName}`
        } else {
            return ''
        }
    }

    // Check if files.Contents exists and is an array
    const hrefPrefix = `/${params.params.examType}/${params.params.level}/${params.params.subject}/papers/`
    if (Array.isArray(examPaperKeys) && examPaperKeys.length > 0) {
        //cleanup filename was used for sections but now we try keep each year to a single paper by combining
        items.push(...examPaperKeys.map(file => ({
            label: `${file.Key?.split('/')[2]}${cleanUpFileName(file.Key?.split('/')[4] || '')}` || '',
            key: `${file.Key}`,
            href: `${hrefPrefix}/${file.Key?.split('/')[2].split('.')[0]}`,
            bgColor: "bg-blue-500",
            color: "text-blue-700"
        })));
    }

  return (
    <CardList heading="Past Papers" items={items}/>
  );
}
