import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params
  const { content } = await request.json()
  const user = await getUserByClerkId()

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(updatedEntry.content)

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: { ...analysis },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis,
    },
  })
  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
}
