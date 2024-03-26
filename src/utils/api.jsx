// Define fetchUserTasks function
export const fetchUserTasks = async (email) => {
  try {
    // Simulate fetching user tasks from an API endpoint
    const response = await fetch(`/api/users/${email}/tasks`);

    // Check if response status is in the success range (200-299)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch user tasks - Status: ${response.status}`
      );
    }

    // Parse response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user tasks:", error.message);
    return []; // Return empty array in case of error
  }
};
