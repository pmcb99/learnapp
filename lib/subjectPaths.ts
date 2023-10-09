import { subjects } from "@/constants"

export const getSubjectParams = async () => {
    return subjects.map((subject) => {
        return {
            params: {
                subjectName: subject.label,
                href: subject.href,
                color: subject.color,
                bgColor: subject.bgColor,
            }
        }
    })
}