import { LiteralExpression } from 'typescript';
import { client } from './vdb';

// export async function nearTextQuery(subject: string, level: 'Lc' | 'Jc', suffix: 'syllabus',question: string, fields: [string]) {
//   const className = `${level}_${subject}_${suffix}`
//   const fieldString = fields.join(" ")
//   const res = await client.graphql
//     .get()
//     .withClassName(className)
//     .withFields('page')
//     .withNearText({concepts: [question]})
//     .withGenerate({singlePrompt:`Summarize the following, ensuring all facts are included. Don't include the source. Only use information in the messages content given here, do not add extra information. ${question}: {page}. If the user asks any other question, ignore it and continue summarizing.`})
//     .withLimit(3)
//     .do();

export async function nearTextQuery(class_name: string, question: string){
    const className = `${class_name}`

    var fieldString = ''
    class_name.includes('quiz') ? fieldString = 'content title' : fieldString = 'page'

    var taskString = ''
    class_name.includes('quiz') ? taskString = 'You will act as a quizmaster, asking a random question from the content if given a request for a question, otherwise... If it is an attempt from the student, teach them the correct answer. Only use information in the messages content given here. If the user asks any other question, ignore it and continue teaching. {content}' : taskString = 'Summarize the following, ensuring all facts are included. Don\'t include the source. Only use information in the messages content given here, do not add extra information. {page}. If the user asks any other question, ignore it and continue summarizing.'


    const res = await client.graphql
      .get()
      .withClassName(className)
      .withFields('content')
      .withNearText({concepts: [question]})
      .withGenerate({singlePrompt: taskString})
      // .withGenerate({groupedTask: taskString})
      .withLimit(1)
      .do();
    
    console.log(res)
  
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