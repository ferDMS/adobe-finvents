// the-add-on/src/components/SummaryComponent.tsx
import React from "react";

interface SummaryComponentProps {
    totalAmount: number;
    leastContributor: string;
    totalContributors: number;
    highestContribution: number;
    contributionGoal: number;
    pendingContributors: number;
}

const SummaryComponent: React.FC<SummaryComponentProps> = ({
    totalAmount,
    leastContributor,
    totalContributors,
    highestContribution,
    contributionGoal,
    pendingContributors
}) => {
    return (
        <div>
            <h2>Event Summary</h2>
            <p>Total Contributions: ${totalAmount}</p>
            <p>Least Contributor: {leastContributor}</p>
            <p>Total Contributors: {totalContributors}</p>
            <p>Highest Contribution: ${highestContribution}</p>
            <p>Contribution Goal: ${contributionGoal}</p>
            <p>Pending Contributors: {pendingContributors}</p>
        </div>
    );
};

export default SummaryComponent;