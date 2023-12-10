import { lcHigherSubjects } from "@/constants"

export const getSubjectParams = async () => {
    return lcHigherSubjects.map((subject) => {
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