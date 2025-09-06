// Sample data for projects and tasks used by the client during development.
// Move to a proper API later.
export const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description:
      "A complete redesign of the company website to improve conversions and accessibility.",
    stats: { total: 24, completed: 16, members: 6 },
    tasks: [
      {
        id: 101,
        title: "Revamp homepage hero",
        assignee: { name: "Ava Lee", initials: "AL" },
        dueDate: "2025-09-12",
        completed: false,
      },
      {
        id: 102,
        title: "Update accessibility labels",
        assignee: { name: "Sam Ortiz", initials: "SO" },
        dueDate: "2025-09-08",
        completed: true,
      },
      {
        id: 103,
        title: "Redesign pricing page",
        assignee: { name: "Priya N.", initials: "PN" },
        dueDate: "2025-09-18",
        completed: false,
      },
      {
        id: 104,
        title: "Improve mobile header",
        assignee: { name: "Liam G.", initials: "LG" },
        dueDate: "2025-09-10",
        completed: false,
      },
      {
        id: 105,
        title: "A/B test hero CTA",
        assignee: { name: "Ava Lee", initials: "AL" },
        dueDate: "2025-09-20",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "Mobile App Launch",
    description: "Launch MVP for the mobile app on both iOS and Android.",
    stats: { total: 18, completed: 10, members: 4 },
    tasks: [
      {
        id: 201,
        title: "Finalize onboarding flow",
        assignee: { name: "Jordan Kim", initials: "JK" },
        dueDate: "2025-09-20",
        completed: false,
      },
      {
        id: 202,
        title: "Stabilize push notifications",
        assignee: { name: "Taylor R.", initials: "TR" },
        dueDate: "2025-09-14",
        completed: false,
      },
      {
        id: 203,
        title: "Polish app store assets",
        assignee: { name: "Casey M.", initials: "CM" },
        dueDate: "2025-09-25",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q4 marketing push focused on lead-gen and brand awareness.",
    stats: { total: 12, completed: 7, members: 3 },
    tasks: [
      {
        id: 301,
        title: "Create hero ad creatives",
        assignee: { name: "Ravi S.", initials: "RS" },
        dueDate: "2025-09-11",
        completed: true,
      },
      {
        id: 302,
        title: "Set up tracking pixels",
        assignee: { name: "Maya P.", initials: "MP" },
        dueDate: "2025-09-15",
        completed: false,
      },
    ],
  },
  {
    id: 4,
    name: "Customer Onboarding",
    description: "Streamline onboarding and improve self-serve docs.",
    stats: { total: 9, completed: 9, members: 2 },
    tasks: [
      {
        id: 401,
        title: "Audit onboarding funnels",
        assignee: { name: "Nina B.", initials: "NB" },
        dueDate: "2025-08-30",
        completed: true,
      },
      {
        id: 402,
        title: "Rewrite getting started guide",
        assignee: { name: "Nina B.", initials: "NB" },
        dueDate: "2025-09-05",
        completed: true,
      },
    ],
  },
  {
    id: 5,
    name: "Data Migration",
    description: "Migrate legacy data into the new schema with zero downtime.",
    stats: { total: 30, completed: 4, members: 5 },
    tasks: [
      {
        id: 501,
        title: "Schema migration plan",
        assignee: { name: "Ethan W.", initials: "EW" },
        dueDate: "2025-10-01",
        completed: false,
      },
      {
        id: 502,
        title: "Run dry migration",
        assignee: { name: "Harper L.", initials: "HL" },
        dueDate: "2025-09-29",
        completed: false,
      },
      {
        id: 503,
        title: "Validate migrated records",
        assignee: { name: "Ethan W.", initials: "EW" },
        dueDate: "2025-10-03",
        completed: false,
      },
    ],
  },
];

export default { projects };
