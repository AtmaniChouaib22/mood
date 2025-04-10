import Editor from '@/app/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'

const getEntry = async (id: any) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })
  return entry
}

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)

  return (
    <div className="w-full h-full ">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
    </div>
  )
}

export default EntryPage
