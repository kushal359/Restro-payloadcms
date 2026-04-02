export async function fetchabo() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/globals/aboutus`)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await res.json()
    console.log(data);
    return data;
  } catch (err) {
    console.error('Failed to fetch Aboutus:', err)
    return []
  }
}
