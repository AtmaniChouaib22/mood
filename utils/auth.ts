import { auth } from '@clerk/nextjs/server'
import prisma from '@/utils/db'

export const getUserByClerkId = async () => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('User ID is null')
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  })
  return user
}
