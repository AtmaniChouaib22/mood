import prisma from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
import NewEntryCard from '@/app/components/NewEntryCard'
import EntryCard from '@/app/components/EntryCard'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  return (
    <div className="bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4 p-10">
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
