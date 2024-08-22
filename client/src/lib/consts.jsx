import { AddCircleIcon, BuildingIcon, HomeIcon, LogoutIcon, MoneyIcon, MsgIcon, SettingIcon } from '../assets/svg/Icon'
export const SidebarLinks = [
    {
        key: "add",
        label: "Create Event",
        icon: <AddCircleIcon className={`fill-none`} />,
        path: "/create-event",
    },
    {
        key: "home",
        label: "My Home",
        icon: <HomeIcon />,
        path: "/",
    },
    {
        key: "message",
        label: "Messages",
        icon: <MsgIcon />,
        path: "/message",
    },
    {
        key: "money",
        label: "Money",
        icon: <MoneyIcon />,
        path: "/money",
    },
    {
        key: "building",
        label: "Building",
        icon: <BuildingIcon />,
        path: "/building",
    },
    {
        key: "settings",
        label: "Settings",
        icon: <SettingIcon />,
        path: "/settings",
    },
];

export const LogoutLink = [
    {
        key: "logout",
        label: "Logout",
        icon: <LogoutIcon />,
        path: "/logout",
    },
];

export const EventsLinks = [
    {
        key: "private",
        label: "Create Private Event",
        path: "create-private-event",
    },
    {
        key: "public",
        label: "Create Public Event",
        path: "create-public-event",
    },
    {
        key: "workshop",
        label: "Create Workshop Event",
        path: "/create-workshop-event",
    },
    {
        key: "ticket",
        label: "Create Ticket",
        path: "/create-ticket",
    },
    {
        key: "business",
        label: "Create Business Event",
        path: "/create-business-event",
    }
];

export const EventCategory = [
    {
        text: "Arts and crafts evening",
    },
    {
        text: "Anniversary",
    },
    {
        text: "Birthday party",
    },
    {
        text: "Brunch",
    },
    {
        text: "Book club meeting",
    },
    {
        text: "Boys night",
    },
    {
        text: "Beauty",
    },
    {
        text: "BBQ evening",
    },
    {
        text: "Birth of our child/children",
    },
    {
        text: "Costume party",
    },
    {
        text: "Cinema evening",
    },
    {
        text: "Computer club meeting",
    },
]