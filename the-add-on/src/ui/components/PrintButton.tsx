import React, { useState } from 'react';
import { DocumentSandboxApi } from '../../models/DocumentSandboxApi';
import { Event } from '../api';
import './PrintButton.css';

interface PrintButtonProps {
    sandboxProxy: DocumentSandboxApi;
    event: Event;
}

const PrintButton: React.FC<PrintButtonProps> = ({ sandboxProxy, event }) => {
    const [isClicked, setIsClicked] = useState(false);

    const height = 1920;
    const width = 1080;

    const handlePrintStatistics = () => {
        // Disable the button after it is clicked
        setIsClicked(true);

        // Print rectangle in the background
        sandboxProxy.createBackgroundRectangle();

        // Print rectangle as header of the background rectangle in a slightly darker shade
        sandboxProxy.createRectangleCoords(0.4, 0.4823529411764706, 0.7764705882352941, width/8, height/4, width - (2*(width/8)), 100);

        sandboxProxy.createTextCoords(event.name, width/2-50, height/4 + 150)

        // Título
        sandboxProxy.createTextCoords(`Starts: ${new Date(event.start_date).toLocaleDateString()}`, width / 3 - 100, height / 4 + 200);
        sandboxProxy.createTextCoords(`Ends: ${new Date(event.end_date).toLocaleDateString()}`, 2 * (width / 3) - 100, height / 4 + 200);

        // Event summary
        const totalAmount = event.products.reduce((total, product) => total + product.price, 0).toFixed(2);
        const leastContributor = event.members.reduce((min, member) => member.paid < min.paid ? member : min, event.members[0]).user.name;
        const totalContributors = event.members.length;
        const highestContribution = event.members.reduce((max, member) => member.paid > max ? member.paid : max, 0).toFixed(2);
        const contributionGoal = event.products.reduce((sum, product) => sum + product.price * product.units, 0);
        const pendingContributors = event.members.filter(member => !member.paid).length;

        sandboxProxy.createTextCoords(`Total Contributions: $${totalAmount}`, width / 3 - 200, height / 4 + 300);
        sandboxProxy.createTextCoords(`Least Contributor: ${leastContributor}`, 2 * (width / 3) - 200, height / 4 + 300);
        
        sandboxProxy.createTextCoords(`Total Contributors: ${totalContributors}`, width / 3 - 200, height / 4 + 330);
        sandboxProxy.createTextCoords(`Highest Contribution: $${highestContribution}`, 2 * (width / 3) - 200, height / 4 + 330);
        
        sandboxProxy.createTextCoords(`Contribution Goal: $${contributionGoal}`, width / 3 - 200, height / 4 + 360);
        sandboxProxy.createTextCoords(`Pending Contributors: ${pendingContributors}`, 2 * (width / 3) - 200, height / 4 + 360);
        
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
        <button className="print-button" onClick={handlePrintStatistics} disabled={isClicked}>
            Print Participants
        </button>
    );
};

export default PrintButton;