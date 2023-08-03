export const generateRandomId = () => {
    return Math.floor(Math.random() * 900000) + 100000;
};

export const noteCategories = ["Task", "Random Thought", "Idea"];
export const initialCategoriesSummary = noteCategories.map((category) => ({
    name: category,
    active: 0,
    archived: 0,
}));

export const initialNotes = [
    {
        id: generateRandomId(),
        name: "Buy Groceries",
        createdAt: "July 25, 2023",
        category: "Task",
        content: "Remember to buy groceries for the week.",
        dates: [],
        archived: false,
    },
    {
        id: generateRandomId(),
        name: "Plan Vacation",
        createdAt: "July 26, 2023",
        category: "Task",
        content: "Start planning the upcoming vacation trip.",
        dates: [],
        archived: true,
    },
    {
        id: generateRandomId(),
        name: "Project Presentation",
        createdAt: "June 13, 2023",
        category: "Task",
        content: "Prepare slides and materials for the project presentation till 03/08/2023",
        dates: ["03/08/2023"],
        archived: false,
    },
    {
        id: generateRandomId(),
        name: "Innovative Idea",
        createdAt: "July 12, 2023",
        category: "Idea",
        content: "Explore innovative ideas for the new product.",
        dates: [],
        archived: false,
    },
    {
        id: generateRandomId(),
        name: "Blog Post",
        createdAt: "July 21, 2023",
        category: "Idea",
        content: "Write a blog post about recent project achievements.",
        dates: [],
        archived: true,
    },
    {
        id: generateRandomId(),
        name: "Creative Writing",
        createdAt: "July 20, 2023",
        category: "Random Thought",
        content: "Spend some time doing creative writing.",
        dates: [],
        archived: true,
    },
    {
        id: generateRandomId(),
        name: "Exercise Routine",
        createdAt: "July 17, 2023",
        category: "Random Thought",
        content: "Create a new exercise routine for better fitness.",
        dates: [],
        archived: false,
    },
    {
        id: generateRandomId(),
        name: "Read Book",
        createdAt: "May 1, 2023",
        category: "Random Thought",
        content: "Start reading the new book that arrived.",
        dates: [],
        archived: true,
    },
    {
        id: generateRandomId(),
        name: "Meeting with Team",
        createdAt: "July 25, 2023",
        category: "Task",
        content: "Team meeting on 08/03/2023 and 08/10/2023 to discuss project progress.",
        dates: ["08/03/2023", "08/10/2023"],
        archived: true,
    },
    {
        id: generateRandomId(),
        name: "Coding Practice",
        createdAt: "June 3, 2023",
        category: "Task",
        content: "Solve coding challenges to improve programming skills.",
        dates: [],
        archived: true,
    },
    {
        id: generateRandomId(),
        name: "Online Course",
        createdAt: "March 4, 2023",
        category: "Task",
        content: "Enroll in an online course to learn new skills by 08/07/2023.",
        dates: ["08/07/2023"],
        archived: false,
    },
    {
        id: generateRandomId(),
        name: "Project Deadline",
        createdAt: "May 29, 2023",
        category: "Task",
        content: "Complete the project by 09/10/2023 and 09/12/2023.",
        dates: ["09/10/2023", "09/12/2023"],
        archived: false,
    },
];
