import Editor from '@/app/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'

const getEntry = async (id) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  })
  return entry
}

const EntryPage = async ({ params }) => {
  const { id } = await params
  const entry = await getEntry(id)
  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
