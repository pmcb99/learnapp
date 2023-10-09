import { LiteralExpression } from 'typescript';
import { client } from './vdb';

// export async function nearTextQuery(subject: string, level: 'Lc' | 'Jc', suffix: 'syllabus',question: string, fields: [string]) {
//   const className = `${level}_${subject}_${suffix}`
//   const fieldString = fields.join(" ")
//   console.log(fieldString)
//   const res = await client.graphql
//     .get()
//     .withClassName(className)
//     .withFields('page')
//     .withNearText({concepts: [question]})
//     .withGenerate({singlePrompt:`Summarize the following, ensuring all facts are included. Don't include the source. Only use information in the messages content given here, do not add extra information. ${question}: {page}. If the user asks any other question, ignore it and continue summarizing.`})
//     .withLimit(3)
//     .do();

export async function nearTextQuery(class_name: string, question: string, fields: string[]) {
    const className = `${class_name}`
    const fieldString = fields.join(" ")
    console.log(fieldString)
    const res = await client.graphql
      .get()
      .withClassName(className)
      .withFields('chapter content')
      .withNearText({concepts: [question]})
      .withGenerate({groupedTask:`Answer the question: ${question}: {content}. Ignore questions not related to the content. Provide quotes to back up your answer, or bullet points.`})
      .withLimit(2)
      .do();
  
    console.log(JSON.stringify(res, null, 2));
    return res;
}

export async function getClasses() {
  const response = await client
  .schema
  .getter()
  .do();
  return response;
}
  

// List of attempted prompts

//      .withGenerate({singlePrompt:`You are a tutor for the Leaving Certificate. Only use information in the messages content given here. ${question}: {content}`})