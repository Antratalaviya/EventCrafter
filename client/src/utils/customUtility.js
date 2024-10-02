
export const getMonth = (index) => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[index];
};

export const getDay = (index) => {
    const days = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
        "Sat"
    ];
    return days[index];
};

export const getFullDay = (index) => {
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    return days[index];
};

export const capitalize = (str) => {
    return str.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

export const getTime = (strDate) => {
    const date = new Date(strDate);
    const now = new Date();
    const day = getDay(date.getDay());
    const hr = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    const timeDiff = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(timeDiff / (1000 * 60));
    const diffHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (diffMinutes === 0) {
        return 'just now';
    }

    if (diffMinutes < 60) {
        return `${diffMinutes} min ago`;
    }

    if (diffHours < 24) {
        return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
    }

    if (diffDays < 7) {
        return `${day}, ${hr}:${min}`;
    }

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export const getDate = (strDate) => {
    const date = new Date(strDate);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export const getFilterNotification = (strDate) => {
    const date = new Date(strDate);
    const now = new Date();

    const timeDiff = now.getTime() - date.getTime();
    const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 0;
    } else if (diffDays === 1) {
        return 1;
    }
}
export const formatTime = (time) => {
    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = time.substring(3, 5);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${suffix}`;
};

export const getFullTime = (startTime, endTime) => {
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    return `${formattedStartTime} - ${formattedEndTime}`;
};
