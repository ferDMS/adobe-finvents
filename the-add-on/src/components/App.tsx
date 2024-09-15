import React, { useState, useEffect } from "react";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import "./App.css";
import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import HeaderComponent from "./HeaderComponent";
import LeaderboardComponent from "./LeaderboardComponent";
import SummaryComponent from "./SummaryComponent";
import PrintButton from "./PrintButton";
import { fetchEventDetails, fetchContributors } from "../api";

const App = ({ addOnUISdk }: { addOnUISdk: AddOnSDKAPI }) => {
    const [eventDetails, setEventDetails] = useState<{ title: string; description: string; totalAmount: number } | null>(null);
    const [contributors, setContributors] = useState<{ name: string; amount: number }[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const eventDetails = await fetchEventDetails();
            const contributors = await fetchContributors();
            setEventDetails(eventDetails);
            setContributors(contributors);
        };
        loadData();
    }, []);

    if (!eventDetails) {
        return <div>Loading...</div>;
    }

    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <HeaderComponent title={eventDetails.title} description={eventDetails.description} />
                <LeaderboardComponent contributors={contributors} />
                <SummaryComponent totalAmount={eventDetails.totalAmount} />
                <PrintButton />
            </div>
        </Theme>
    );
};

export default App;