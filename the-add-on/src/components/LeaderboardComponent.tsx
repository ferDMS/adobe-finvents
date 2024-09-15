// the-add-on/src/components/LeaderboardComponent.tsx
import React from "react";
import "./LeaderboardComponent.css";
import { Member } from "../api";

interface LeaderboardComponentProps {
    contributors: Member[];
}

const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ contributors }) => {
    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {contributors.map((contributor, index) => (
                        <tr key={index}>
                            <td>{contributor.user}</td>
                            <td>${contributor.paid}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardComponent;