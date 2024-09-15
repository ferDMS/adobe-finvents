// src/api.ts
export const fetchEventDetails = async (eventId: string) => {
  // Replace with actual API call
  return {
      title: "Annual Charity Event",
      description: "Join us for a night of fun and fundraising!",
      contributionGoal: 2000 // Add the missing property
  };
};

export const fetchContributors = async (eventId: string) => {
  // Replace with actual API call
  return [
      { name: "Alice", amount: 100 },
      { name: "Bob", amount: 100 },
      { name: "Charlie", amount: 300 }
  ];
};

// src/api.ts
export const fetchEvents = async () => {
  // Replace with actual API call
  return [
    {
      id: "1",
      title: "Annual Charity Event",
      description: "Join us for a night of fun and fundraising!",
      contributionGoal: 2000,
      contributors: [
        { name: "Alice", amount: 100 },
        { name: "Bob", amount: 100 },
        { name: "Charlie", amount: 300 }
      ]
    },
    {
      id: "2",
      title: "Community Cleanup",
      description: "Help us clean up the neighborhood!",
      contributionGoal: 1500,
      contributors: [
        { name: "Dave", amount: 200 },
        { name: "Eve", amount: 150 },
        { name: "Frank", amount: 50 }
      ]
    }
  ];
};