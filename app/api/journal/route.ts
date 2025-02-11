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
      content: 'write about your day',
    },
  })
  console.log('entry', entry)
  const analysis = await analyze(entry)
  console.log('analysis', analysis)
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis,
    },
  })
  revalidatePath('/journal')
  return NextResponse.json({ data: entry })
}
