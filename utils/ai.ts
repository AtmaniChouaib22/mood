//import OpenAI from 'openai'
//const openai = new OpenAI();
import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
      summary: z.string().describe('quick summary of the entire entry.'),
    subject: z.string().describe('The subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative(i.e does it contain negative emotions?).',
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness',
      ),
  }),
)

const getPrompt = async (content) => {
  const formatted_instructions = await parser.getFormatInstructions()
  const prompt = await new PromptTemplate({
    template: `Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what!\n
        {formatted_instructions}\n{entry}`,
    inputVariables: ['entry'],
    partialVariables: {formatted_instructions},
  })

  const input = await prompt.format({
    entry: content,
  })
  return input
}

export const analyze = async (content) => {
    const input = await getPrompt(content)
  const model = await new ChatOpenAI({ model: 'gpt-4o-mini', temperature: 0 })
  const result = await model.invoke(input)
  try {
    return parser.parse(result.content)
  }catch(err){
    console.log(err)
  }
}
