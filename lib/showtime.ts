import SunCalc from 'suncalc';
export type OfflineReason = null | "preseason" | "postseason" | "offseason" | "preshow" | "postshow";

export function getOfflineReason(): OfflineReason {
  let now = new Date(Date.now());
  let month = now.getMonth() + 1;
  let day = now.getDate();
  // February to September
  if (month > 1 && month < 10) {
    return "offseason";
  }
  // October 1-24
  if (month == 10 && day < 25) {
    return "preseason";
  }
  // January 4-31
  if (month == 1 && day > 3) {
    return "postseason";
  }

  let hour = parseInt(now.toLocaleString('en-US', {hour: '2-digit', hour12: false, timeZone: 'America/Chicago' }));
  // Show status is available 45 minutes prior to sunset.
  let showtime = SunCalc.getTimes(now, 35.2533, -89.7133).sunset;
  showtime.setMinutes(showtime.getMinutes() - 45);
  // 4:00am - 45 minutes before sunset
  if (hour >= 4 && now < showtime) {
    return "preshow";
  }
  // 10:00pm - 3:59am
  if (hour < 4 || hour > 21) {
    return "postshow"
  }
  return null;
}

export function getShowtime(reason: OfflineReason): Date {
    let showtime = new Date();
    switch (reason) {
        case 'offseason':
        case 'preseason':
        case 'postseason':
            let year = showtime.getFullYear();
            showtime = new Date(Date.parse(`22 Oct ${year} 17:00:00 CDT`));
            showtime = SunCalc.getTimes(showtime, 35.2533, -89.7133).sunset;
            return showtime;
        case 'preshow':
            showtime = SunCalc.getTimes(showtime, 35.2533, -89.7133).sunset;
            return showtime;
        case 'postshow':
            showtime = new Date(showtime.setHours(showtime.getHours() + 8));
            showtime = SunCalc.getTimes(showtime, 35.2533, -89.7133).sunset;
            return showtime;
        default:
            return showtime;
    }
}

export function getOfflineMessage(reason: OfflineReason): string | null {
    switch (reason) {
        case 'offseason':
            return "The show is offline until holiday season. See you then!";
        case 'preseason':
            return "We're offline until Halloween week. See you soon!";
        case 'postseason':
            return "The show is over for the holiday season. See you next season!";
        case 'preshow':
            return "The show is offline during the day. Check back when it gets dark!";
        case 'postshow':
            return "The show's over for tonight. Come see us another night!";
        default:
            return null;
    }
}

