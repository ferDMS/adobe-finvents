// src/components/App.tsx
import React, { useState } from "react";
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
import { fetchEventDetails, fetchContributors } from "../api";

interface Event {
    id: string;
    title: string;
    description: string;
    contributionGoal: number;
    contributors: Contributor[];
}

interface Contributor {
    name: string;
    amount: number;
}

const App = ({ addOnUISdk }: { addOnUISdk: AddOnSDKAPI }) => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [eventDetails, setEventDetails] = useState<{ title: string; description: string; totalAmount: number; contributionGoal: number } | null>(null);
    const [contributors, setContributors] = useState<Contributor[]>([]);

    const handleSelectEvent = async (event: Event) => {
        setSelectedEvent(event);
        const eventDetails = await fetchEventDetails(event.id);
        const contributors = await fetchContributors(event.id);
        const totalAmount = contributors.reduce((sum, contributor) => sum + contributor.amount, 0);
        setEventDetails({ ...eventDetails, totalAmount });
        setContributors(contributors);
    };

    const handleBackToEvents = () => {
        setSelectedEvent(null);
        setEventDetails(null);
        setContributors([]);
    };

    if (!selectedEvent) {
        return <EventListComponent onSelectEvent={handleSelectEvent} />;
    }

    if (!eventDetails) {
        return <div>Loading...</div>;
    }

    const totalAmount = contributors.reduce((sum, contributor) => sum + contributor.amount, 0);
    const totalContributors = contributors.length;
    const leastContributor = contributors.reduce((prev, curr) => (prev.amount < curr.amount ? prev : curr)).name;
    const highestContribution = Math.max(...contributors.map(contributor => contributor.amount));
    const contributionGoal = eventDetails.contributionGoal;
    const pendingContributors = 10; // Replace with actual logic to calculate pending contributors

    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <button onClick={handleBackToEvents}>Back to Events</button>
                <HeaderComponent title={eventDetails.title} description={eventDetails.description} />
                <LeaderboardComponent contributors={contributors} />
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