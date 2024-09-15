// the-add-on/src/components/App.tsx
import React, { useState, useEffect } from "react";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import { Theme } from "@swc-react/theme";
import "./App.css";
import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import HeaderComponent from "./HeaderComponent";
import LeaderboardComponent from "./LeaderboardComponent";
import SummaryComponent from "./SummaryComponent";
import PrintButton from "./PrintButton";
import EventListComponent from "./EventListComponent";
import { fetchEvents, Event, Member } from "../api";

const App = ({ addOnUISdk }: { addOnUISdk: AddOnSDKAPI }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const loadEvents = async () => {
            const events = await fetchEvents();
            setEvents(events);
        };
        loadEvents();
    }, []);

    const handleSelectEvent = (event: Event) => {
        console.log("Event selected in App:", event);
        setSelectedEvent(event);
    };

    const handleBackToEvents = () => {
        setSelectedEvent(null);
    };

    if (!selectedEvent) {
        return <EventListComponent events={events} onSelectEvent={handleSelectEvent} />;
    }

    const totalAmount = selectedEvent.members.reduce((sum, member) => sum + member.paid, 0);
    const totalContributors = selectedEvent.members.length;
    const leastContributor = selectedEvent.members.length > 0 ? selectedEvent.members.reduce((prev, curr) => (prev.paid < curr.paid ? prev : curr)).user : "N/A";
    const highestContribution = selectedEvent.members.length > 0 ? Math.max(...selectedEvent.members.map(member => member.paid)) : 0;
    const contributionGoal = selectedEvent.products.reduce((sum, product) => sum + product.price * product.units, 0);
    const pendingContributors = 10; // Replace with actual logic to calculate pending contributors

    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <button onClick={handleBackToEvents}>Back to Events</button>
                <HeaderComponent title={selectedEvent.name} description={`From ${selectedEvent.start_date.toDateString()} to ${selectedEvent.end_date.toDateString()}`} />
                <LeaderboardComponent contributors={selectedEvent.members} />
                <SummaryComponent
                    totalAmount={totalAmount}
                    leastContributor={leastContributor}
                    totalContributors={totalContributors}
                    highestContribution={highestContribution}
                    contributionGoal={contributionGoal}
                    pendingContributors={pendingContributors}
                />
                <PrintButton />
            </div>
        </Theme>
    );
};

export default App;