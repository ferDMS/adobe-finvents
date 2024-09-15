export interface Product {
    _id: string;
    name: string;
}

export interface User {
    _id: string;
    name: string;
}

export interface Requirement {
    product: Product;
    units: number;
    paid: boolean;
    paidBy: User;
}

export interface Member {
    user: User;
    paid: number;
}

export interface Event {
    _id: string;
    name: string;
    start_date: Date;
    end_date: Date;
    requirements: Requirement[];
    equitative: boolean;
    admin: User;
    members: Member[];
}

export const fetchEvents = async (): Promise<Event[]> => {
    // Replace with actual API call
    return [
        {
            _id: "1",
            name: "Annual Charity Event",
            start_date: new Date(),
            end_date: new Date(),
            requirements: [],
            equitative: false,
            admin: { _id: "1", name: "Admin" },
            members: [
                { user: { _id: "1", name: "John Doe" }, paid: 100 },
                { user: { _id: "2", name: "Jane Smith" }, paid: 150 }
            ]
        },
        {
            _id: "2",
            name: "Community Cleanup",
            start_date: new Date(),
            end_date: new Date(),
            requirements: [],
            equitative: false,
            admin: { _id: "2", name: "Admin" },
            members: [
                { user: { _id: "3", name: "Alice Johnson" }, paid: 200 },
                { user: { _id: "4", name: "Bob Brown" }, paid: 250 }
            ]
        }
    ];
};