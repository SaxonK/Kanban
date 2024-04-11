export const utils = {
  formatDate: (datetime, format) => {
    const currentDate = new Date(datetime);
  
    // Define date and time codes
    const dateComponents = {
      YYYY: currentDate.getUTCFullYear(),
      YY: String(currentDate.getUTCFullYear()).slice(-2),
      MM: ('0' + (currentDate.getUTCMonth() + 1)).slice(-2),
      DD: ('0' + currentDate.getUTCDate()).slice(-2),
      HH: ('0' + currentDate.getUTCHours()).slice(-2),
      hh: ('0' + ((currentDate.getUTCHours() % 12) || 12)).slice(-2),
      mm: ('0' + currentDate.getUTCMinutes()).slice(-2),
      ss: ('0' + currentDate.getUTCSeconds()).slice(-2),
      D: currentDate.getUTCDate(),
      M: currentDate.getUTCMonth() + 1,
      H: currentDate.getUTCHours(),
      m: currentDate.getUTCMinutes(),
      s: currentDate.getUTCSeconds(),
      MMM: currentDate.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' }),
      MMMM: currentDate.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' }),
      ddd: currentDate.toLocaleString('en-GB', { weekday: 'short', timeZone: 'UTC' }),
      dddd: currentDate.toLocaleString('en-GB', { weekday: 'long', timeZone: 'UTC' }),
      t: currentDate.getUTCHours() < 12 ? 'A' : 'P',
      tt: currentDate.getUTCHours() < 12 ? 'AM' : 'PM'
    };
  
    // Replace placeholders with actual date and time data
    let formattedDateTime = format.replace(/YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|HH|H|hh|mm|m|ss|s|tt|t/g, (match) => {
      return dateComponents[match];
    });
  
    return formattedDateTime;
  }
}