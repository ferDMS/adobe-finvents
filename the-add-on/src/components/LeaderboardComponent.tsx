import React from "react";
import { Member } from "../api";
import "./LeaderboardComponent.css";

interface LeaderboardComponentProps {
    contributors: Member[];
}

const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ contributors }) => {
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul className="leaderboard-list">
                <li className="leaderboard-item header">
                    <span>User</span>
                    <span>Amount Paid</span>
                </li>
                {contributors.map((contributor, index) => (
                    <li key={index} className="leaderboard-item">
                        <span>{contributor.user}</span>
                        <span>{contributor.paid.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaderboardComponent;