
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

export const getFilterNotification = (strDate) => {
    const date = new Date(strDate);
    const now = new Date();

    const timeDiff = now.getTime() - date.getTime();
    const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        return 0;
    } else if (diffDays < 2) {
        return 1;
    }
}

