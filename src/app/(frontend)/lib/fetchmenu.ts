 export async function fetchMenu() {
  try {
    const res = await fetch("http://localhost:3000/api/products");
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