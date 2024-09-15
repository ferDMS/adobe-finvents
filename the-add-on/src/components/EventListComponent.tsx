// src/components/EventListComponent.tsx
import React, { useState, useEffect } from "react";
import { fetchEvents } from "../api";

interface Contributor {
  name: string;
  amount: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  contributionGoal: number;
  contributors: Contributor[];
}

interface EventListComponentProps {
  onSelectEvent: (event: Event) => void;
}

const EventListComponent: React.FC<EventListComponentProps> = ({ onSelectEvent }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const events = await fetchEvents();
      setEvents(events);
    };
    loadEvents();
  }, []);

  return (
    <div>
      <h2>Select an Event</h2>
      <ul>
        {events.map(event => (
          <li key={event.id} onClick={() => onSelectEvent(event)}>
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListComponent;