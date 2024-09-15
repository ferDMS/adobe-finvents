import React from "react";
import { Member } from "../api";
import "./LeaderboardComponent.css";

interface LeaderboardComponentProps {
    contributors: Member[];
}

const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ contributors }) => {
    // Sort contributors by amount paid in decreasing order
    const sortedContributors = [...contributors].sort((a, b) => b.paid - a.paid);

    // Calculate the total amount paid
    const totalAmountPaid = sortedContributors.reduce((total, contributor) => total + contributor.paid, 0);

    return (
        <div className="leaderboard">
            <h2 className="leaderboard-header">Leaderboard</h2>
            <ul className="leaderboard-list">
                <li className="leaderboard-item header">
                    <span>User</span>
                    <span>Amount Paid</span>
                </li>
                {sortedContributors.map((contributor, index) => (
                    <li key={index} className="leaderboard-item">
                        <span>{contributor.user.name}</span>
                        <span>${contributor.paid.toFixed(2)}</span>
                    </li>
                ))}
                <li className="leaderboard-item total">
                    <span>Total</span>
                    <span>${totalAmountPaid.toFixed(2)}</span>
                </li>
            </ul>
        </div>
    );
};

export default LeaderboardComponent;