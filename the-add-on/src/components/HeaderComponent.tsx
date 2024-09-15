import React from "react";

interface HeaderComponentProps {
    title: string;
    description: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, description }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
};

export default HeaderComponent;