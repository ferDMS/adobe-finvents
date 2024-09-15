import React from "react";

const PrintButton: React.FC = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <button onClick={handlePrint}>Print Summary</button>
    );
};

export default PrintButton;