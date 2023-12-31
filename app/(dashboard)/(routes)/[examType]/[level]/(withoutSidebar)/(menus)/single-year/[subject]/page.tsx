
import CardList, { CardProps } from "@/components/card-list";
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
    const hrefPrefix = `/${params.params.examType}/${params.params.level}/single-year/`
    if (Array.isArray(examPaperKeys) && examPaperKeys.length > 0) {
        //cleanup filename was used for sections but now we try keep each year to a single paper by combining
        items.push(...examPaperKeys.map(file => ({
            label: `${file.Key?.split('/')[2]}`,
            key: `${file.Key}`,
            href: `${hrefPrefix}/${params.params.subject}/${file.Key?.split('/')[2]}${cleanUpFileName(file.Key?.split('/')[4] || '')}`,
            bgColor: "bg-primary",
            color: "text-blue-700"
        })));


    // remove duplicate labels
    items.forEach((item, index) => {
        if (items.filter((item2) => item2.label === item.label).length > 1) {
            items.splice(index, 1);
        }
    });
    }

  return (
    <CardList heading="Past Papers" items={items}/>
  );
}
