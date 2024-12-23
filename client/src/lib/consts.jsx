import { AddCircleIcon, AlcoholIcon, BuildingIcon, DrinkIcon, FoodIcon, HandicappedIcon, HomeIcon, LogoutIcon, MedicIcon, MoneyIcon, MsgIcon, MusicIcon, SettingIcon, ToiletsIcon, VeganIcon } from '../assets/svg/Icon'
export const SidebarLinks = [
    // {
    //     key: "add",
    //     label: "Create Event",
    //     icon: <AddCircleIcon className={`fill-none`} />,
    //     path: "/",
    // },
    {
        key: "home",
        label: "My Home",
        icon: <HomeIcon />,
        path: "/",
    },
    {
        key: "chat",
        label: "Chat",
        icon: <MsgIcon />,
        path: "/Chat",
    },
    {
        key: "news",
        label: "News",
        icon: <MoneyIcon />,
        path: "/news",
    },
    {
        key: "property",
        label: "Property",
        icon: <BuildingIcon />,
        path: "/property",
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
        path: "/sign-in",
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
        path: "create-workshop-event",
    },
    {
        key: "ticket",
        label: "Create Ticket Event",
        path: "create-ticket-event",
    },
    {
        key: "business",
        label: "Create Business Event",
        path: "create-business-event",
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

export const offers = [
    {
        text: 'Paramedic',
        icon: <MedicIcon />,
        checked: false
    },
    {
        text: 'Toilets',
        icon: <ToiletsIcon />,
        checked: false
    },
    {
        text: 'Handicapped accessible',
        icon: <HandicappedIcon />,
        checked: false
    },
    {
        text: 'Food',
        icon: <FoodIcon />,
        checked: false
    },
    {
        text: 'Vegan',
        icon: <VeganIcon />,
        checked: false
    },
    {
        text: 'Music',
        icon: <MusicIcon />,
        checked: false
    },
    {
        text: 'Non Alcohol',
        icon: <AlcoholIcon />,
        checked: false
    },
    {
        text: 'Drink',
        icon: <DrinkIcon />,
        checked: false
    },
]