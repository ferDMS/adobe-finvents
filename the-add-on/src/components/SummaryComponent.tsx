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
    const percentageOfGoalAchieved = (totalAmount / contributionGoal) * 100;

    return (
        <div>
            <h2>Event Summary</h2>
            <p>Total Contributions: ${totalAmount}</p>
            <p>Least Contributor: {leastContributor}</p>
            <p>Total Contributors: {totalContributors}</p>
            <p>Highest Contribution: ${highestContribution.toFixed(2)}</p>
            <p>Contribution Goal: ${contributionGoal}</p>
            <p>Percentage of Goal Achieved: {percentageOfGoalAchieved.toFixed(2)}%</p>
            <p>Pending Contributors: {pendingContributors}</p>
        </div>
    );
};

export default SummaryComponent;