// the-add-on/src/components/EventListComponent.tsx
import React from "react";
import { Event } from "../api";

interface EventListComponentProps {
    events: Event[];
    onSelectEvent: (event: Event) => void;
}

const EventListComponent: React.FC<EventListComponentProps> = ({ events, onSelectEvent }) => {
    const handleEventClick = (event: Event) => {
        console.log("Selected event:", event);
        onSelectEvent(event);
    };

    return (
        <div>
            <h2>Select an Event</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id} onClick={() => handleEventClick(event)}>
                        {event.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventListComponent;