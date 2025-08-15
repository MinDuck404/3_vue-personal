
export const useApi = () => {
  const post = async (url, data) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Something went wrong')
      return json
    } catch (err) {
      throw err
    }
  }

  return { post }
}