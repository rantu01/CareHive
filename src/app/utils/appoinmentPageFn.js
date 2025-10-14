// Format date to human readable
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
};

// Format time
export const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

// Parse time slot
export const parseTimeSlot = (slot) => {
    const parts = slot.split('-');
    if (parts.length >= 3) {
        const startTime = parts[1];
        const endTime = parts[2];
        return `${startTime} - ${endTime}`;
    }
    return slot;
};

// Get day from slot
export const getDayFromSlot = (slot) => {
    const day = slot.split('-')[0];
    return day.charAt(0).toUpperCase() + day.slice(1);
};
