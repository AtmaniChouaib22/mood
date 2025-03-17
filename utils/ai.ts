import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
      ),
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
    partialVariables: { formatted_instructions },
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
  } catch (err) {
    console.log(err)
  }
}

export const qa = async (question, entries) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    })
  })
  const model = new ChatOpenAI({ model: 'gpt-4o-mini', temperature: 0 })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relavantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relavantDocs,
    question: question,
  })
  return res.output_text
}
