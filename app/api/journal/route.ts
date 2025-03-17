import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { analyze } from '@/utils/ai'

export const POST = async () => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'hello world',
      analysis: {},
    },
  })
  
  const analysis = await analyze(entry)
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    },
  })
  revalidatePath('/journal')
  return NextResponse.json({ data: entry })
}
