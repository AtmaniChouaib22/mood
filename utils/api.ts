const createURL = (path) => {
  return window.location.origin + path
}
//updateEntry data
export const updateEntry = async (id: string, updatedEntry: string) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ updatedEntry }),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  } else {
    return
  }
}
//createNewEntry
export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    }),
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL('/api/question'), {
      method: 'POST',
      body: JSON.stringify({ question }),
    }),
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
