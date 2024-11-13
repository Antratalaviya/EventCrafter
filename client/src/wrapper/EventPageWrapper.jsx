import { useParams } from "react-router-dom";
import CreatePubEvent from "../pages/CreatePubEvent";
import CreatePriEvent from "../pages/CreatePriEvent";
import CreateWorkShopEvent from "../pages/CreateWorkShopEvent";
import CreateTicketEvent from "../pages/CreateTicketEvent";
import CreateBusinessEvent from "../pages/CreateBusinessEvent";

export const EventPageWrapper = () => {
    const { eventType } = useParams();

    // Map the event type to the corresponding component
    const eventComponents = {
        "create-private-event": CreatePriEvent,
        "create-public-event": CreatePubEvent,
        "create-workshop-event": CreateWorkShopEvent,
        "create-ticket-event": CreateTicketEvent,
        "create-business-event": CreateBusinessEvent,
    };

    const EventComponent = eventComponents[eventType] || <div>Event type not found</div>;

    return <EventComponent />;
};