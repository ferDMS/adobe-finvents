// the-add-on/src/components/EventDetailComponent.tsx
import React from "react";
import { Event } from "../api";
import "./EventDetailComponent.css";

interface EventDetailComponentProps {
    event: Event;
}

const EventDetailComponent: React.FC<EventDetailComponentProps> = ({ event }) => {
    return (
        <div className="event-detail">
            <h1 className="event-title">{event.name}</h1>
            <div className="event-duration">
                <span className="event-start-date">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{event.start_date.toLocaleDateString()}</span>
                </span>
                <span className="event-end-date">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{event.end_date.toLocaleDateString()}</span>
                </span>
            </div>
        </div>
    );
};

export default EventDetailComponent;