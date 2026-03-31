export async function fetchCat() {
  try {
    const res = await fetch("http://localhost:3000/api/category");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.docs;
  } catch (err) {
    console.error("Failed to fetch menu:", err);
    return [];
  }
}