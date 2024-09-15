import React from 'react';
import { DocumentSandboxApi } from '../../models/DocumentSandboxApi';
import { Event } from '../api';
import './PrintButton.css'; // Import the new CSS file

interface PrintButtonProps {
    sandboxProxy: DocumentSandboxApi;
    event: Event;
}

const PrintButton: React.FC<PrintButtonProps> = ({ sandboxProxy, event }) => {

    const height = 1920;
    const width = 1080;

    const handleClickListMembers = () => {
        const members = event.members;
        const spacing = 50;
        const n = members.length;

        const startY = height / 2 - (n * spacing) / 2;

        members.forEach((member, index) => {
            const x = width / 4;
            const y = startY + index * spacing;
            sandboxProxy.createTextCoords(`${index + 1}. ${member.user.name}`, x, y);
        });
    };

    return (
        <button className="print-button" onClick={handleClickListMembers}>
            Print Participants
        </button>
    );
};

export default PrintButton;