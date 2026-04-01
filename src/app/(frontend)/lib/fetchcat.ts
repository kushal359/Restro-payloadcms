export async function fetchCat() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/category`)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await res.json()
    return data.docs
  } catch (err) {
    console.error('Failed to fetch menu:', err)
    return []
  }
}
