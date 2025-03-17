import prisma from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import NewEntryCard from '@/app/components/NewEntryCard'
import EntryCard from '@/app/components/EntryCard'
import Link from 'next/link'
//import Question from '@/app/components/Question'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  return (
    <div className="h-full p-10">
      <h2 className="text-3xl mb-8">Journal</h2>
      {/* <div className="my-8">
        <Question />
      </div> */}
      <div className="md:grid grid-cols-3 gap-4 flex flex-col">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
