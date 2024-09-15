import React from "react";
import { Event } from "../api";
import "./EventListComponent.css";

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
        <div className="event-list">
            <div className="header">
                <h1 className="main-title">FinVent</h1>
                <p className="description">Discover insights about your events and export them into beautifully designed formats.</p>
            </div>
            <div className="event-cards">
                {events.map(event => (
                    <div key={event._id} className="event-card">
                        <h3 className="event-title">{event.name}</h3>
                        <div className="event-details">
                            <span className="event-contributors">
                                <i className="fas fa-user"></i>
                                <span>{event.members.length}</span>
                            </span>
                            <span className="event-cost">
                                <i className="fas fa-dollar-sign"></i>
                                <span>{event.products.reduce((total, product) => total + product.price, 0).toFixed(2)}</span>
                            </span>
                        </div>
                        <button className="event-button" onClick={() => handleEventClick(event)}>More Info</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventListComponent;