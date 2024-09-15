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

    const handlePrintStatistics = () => {

        // Print rectangle in the background
        sandboxProxy.createBackgroundRectangle();

        // Print rectangle as header of the background rectangle in a slightly darker shade
        sandboxProxy.createRectangleCoords(0.4, 0.4823529411764706, 0.7764705882352941, width/8, height/4, width - (2*(width/8)), 100);

        const members = event.members;
        const spacing = 50;
        const n = members.length;

        const startY = height / 2 - (n * spacing) / 2;

        // Order members by member.paid descending
        members.sort((a, b) => b.paid - a.paid);

        members.forEach((member, index) => {
            const x = width / 4;
            const y = startY + index * spacing;
            sandboxProxy.createTextCoords(`${index + 1}. ${member.user.name}`, x-50, y);
        });

        members.forEach((member, index) => {
            const x = 3 * (width / 4);
            const y = startY + index * spacing;
            sandboxProxy.createTextCoords(`\$ ${member.paid}`, x, y);
        });
    };

    return (
        <button className="print-button" onClick={handlePrintStatistics}>
            Print Participants
        </button>
    );
};

export default PrintButton;