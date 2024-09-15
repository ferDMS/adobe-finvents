import React from "react";
import "./LeaderboardComponent.css";

interface Contributor {
    name: string;
    amount: number;
}

interface LeaderboardComponentProps {
    contributors: Contributor[];
}

const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ contributors }) => {
    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contribution</th>
                    </tr>
                </thead>
                <tbody>
                    {contributors.map((contributor, index) => (
                        <tr key={index}>
                            <td>{contributor.name}</td>
                            <td>${contributor.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardComponent;