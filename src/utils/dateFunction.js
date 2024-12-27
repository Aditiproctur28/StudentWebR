import React from 'react';

export const remainingTime = (time) => {
    const start_datetime = new Date(time);
    const current_time = new Date();
    const totalSeconds = Math.floor((start_datetime - (current_time)) / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const hours = totalHours - (totalDays * 24);
    const minutes = totalMinutes - (totalDays * 24 * 60) - (hours * 60);
    const seconds = totalSeconds - (totalDays * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
    if (totalDays > 0) {
        return totalDays + (totalDays > 1 ? ' Days' : ' Day');
    } else if (hours > 0) {
        return hours + ' Hrs ' + minutes + (minutes > 1 ? ' Mins' : ' Min');
    } else if (minutes > 0) {
        return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + seconds + (seconds > 1 ? ' Secs' : 'Sec');
    } else {
        return seconds + (seconds > 1 ? ' Secs' : 'Sec');
    }
}

