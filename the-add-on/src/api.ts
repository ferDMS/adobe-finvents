// the-add-on/src/api.ts
export interface Product {
    _id: string;
    name: string;
    units: number;
    price: number;
    paid: boolean;
}

export interface User {
    _id: string;
    name: string;
}

export interface Member {
    user: string; // Assuming user is a reference to User ID
    paid: number;
    _id: string;
}

export interface Event {
    _id: string;
    name: string;
    start_date: Date;
    end_date: Date;
    products: Product[];
    equitative: boolean;
    admin: string; // Assuming admin is a reference to User ID
    members: Member[];
    __v: number;
}

export const fetchEvents = async (): Promise<Event[]> => {
    const response = await fetch('http://localhost:3000/api/events'); // Replace with actual API endpoint
    const events: Event[] = await response.json();
    
    return events.map(event => ({
        ...event,
        start_date: new Date(event.start_date),
        end_date: new Date(event.end_date),
        members: event.members || [] // Ensure members array is always defined
    }));
};
