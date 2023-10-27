import { lcSubjects } from "@/constants"

export const getSubjectParams = async () => {
    return lcSubjects.map((subject) => {
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