export const getUsers = async () => {
  try {
    const response = await fetch("https://dummyjson.com/users?limit=30");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();

    console.log("Users loaded successfully-----", data.users);

    return data.users;
  } catch (error) {
    console.error("Error loading users", error);
    return [];
  }
};