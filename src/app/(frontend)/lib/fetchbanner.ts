export async function fetchBan() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/globals/banner`)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await res.json()
    console.log(data);
    return data;
  } catch (err) {
    console.error('Failed to fetch Banner:', err)
    return []
  }
}
