 export async function fetchMenu() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/products`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.docs; // return the array of menu items
  } catch (err) {
    console.error("Failed to fetch menu:", err);
    return []; // return empty array on error
  }
}