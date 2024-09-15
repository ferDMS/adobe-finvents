import React from "react";

interface SummaryComponentProps {
    totalAmount: number;
}

const SummaryComponent: React.FC<SummaryComponentProps> = ({ totalAmount }) => {
    return (
        <div>
            <h2>Event Summary</h2>
            <p>Total Contributions: ${totalAmount}</p>
        </div>
    );
};

export default SummaryComponent;