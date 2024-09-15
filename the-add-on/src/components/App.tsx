// App.tsx
import React, { useState } from "react";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import "./App.css";
import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import PrimaryComponent from "./PrimaryComponent";

const App = ({ addOnUISdk }: { addOnUISdk: AddOnSDKAPI }) => {
    const [buttonLabel, setButtonLabel] = useState("Click me");

    function handleClick() {
        setButtonLabel("Clicked");
    }

    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <Button size="m" onClick={handleClick}>
                    {buttonLabel}
                </Button>
                <PrimaryComponent />
            </div>
        </Theme>
    );
};

export default App;