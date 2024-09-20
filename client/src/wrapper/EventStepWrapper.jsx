import { useParams } from "react-router-dom";
import CreateEventPage1 from "../pages/CreateEventPage1";
import CreateEventPage2 from "../pages/CreateEventPage2";
import CreateEventPage3 from "../pages/CreateEventPage3";
import CreateEventPage4 from "../pages/CreateEventPage4";

export const EventStepWrapper = () => {
    const { step } = useParams();

    // Render the correct page based on the step
    const renderStepPage = () => {
        switch (step) {
            case "1":
                return <CreateEventPage1 />;
            case "2":
                return <CreateEventPage2 />;
            case "3":
                return <CreateEventPage3 />;
            case "4":
                return <CreateEventPage4 />;
            default:
                return <div>Invalid step</div>;
        }
    };

    return renderStepPage();
};