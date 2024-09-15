import React, { useState, useEffect } from "react";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import "./App.css";
import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import EventDetailComponent from "./EventDetailComponent";
import LeaderboardComponent from "./LeaderboardComponent";
import SummaryComponent from "./SummaryComponent";
import PrintButton from "./PrintButton";
import EventListComponent from "./EventListComponent";
import { fetchEvents, Event, Member } from "../api";
import { DocumentSandboxApi } from "../../models/DocumentSandboxApi";

const App = ({ addOnUISdk, sandboxProxy }: { addOnUISdk: AddOnSDKAPI; sandboxProxy: DocumentSandboxApi }) => {

    const height = 1920;
    const width = 1080;

    function handleBackgroundRectangle() {
        sandboxProxy.createBackgroundRectangle();
    }
    
    function handleClickText() {
        sandboxProxy.createText("Hello worldddd!!");
    }

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

    const handleBackToEvents = async () => {
        setSelectedEvent(null);
        sandboxProxy.clearAll();
        const events = await fetchEvents();
        setEvents(events);
    };

    if (!selectedEvent) {
        return <EventListComponent events={events} onSelectEvent={handleSelectEvent} />;
    }

    const totalAmount = selectedEvent.members.reduce((sum, member) => sum + member.paid, 0);
    const totalContributors = selectedEvent.members.filter(member => member.paid > 0).length;
    const leastContributor = selectedEvent.members.length > 0 ? selectedEvent.members.reduce((prev, curr) => (prev.paid < curr.paid ? prev : curr)).user.name : "N/A";
    const highestContribution = selectedEvent.members.length > 0 ? Math.max(...selectedEvent.members.map(member => member.paid)) : 0;
    const contributionGoal = selectedEvent.products.reduce((sum, product) => sum + product.price * product.units, 0);
    const pendingContributors = selectedEvent.members.filter(member => member.paid === 0).length;

    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <button className="back-button" onClick={handleBackToEvents}>Back to Events</button>
                <EventDetailComponent event={selectedEvent} />
                <LeaderboardComponent contributors={selectedEvent.members} />
                <SummaryComponent
                    totalAmount={totalAmount}
                    totalContributors={totalContributors}
                    highestContribution={highestContribution}
                    contributionGoal={contributionGoal}
                    pendingContributors={pendingContributors}
                    leastContributor={leastContributor}
                />
                {selectedEvent && (
                    <PrintButton sandboxProxy={sandboxProxy} event={selectedEvent} />
                )}
                <div className="container">
                    <Button size="m" onClick={handleBackgroundRectangle}>
                        Create Rectangle
                    </Button>
                    <Button size="m" onClick={handleClickText}>
                        Create Text
                    </Button>
                </div>
            </div>
        </Theme>
    );
};

export default App;