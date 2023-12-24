function timeFn(d) {
  let now = new Date();
  let then = new Date(d);

  let diff = now - then;
  let finalTime = '';

  if (diff < 5000) {
      finalTime = "Just Now";
  }
  else if (diff >= 5000 && diff < 60000) {
      finalTime = `${Math.round(diff / 1000)}s ago`;
  }
  else if (diff >= 60000 && diff < 3600000) {
      finalTime = `${Math.round(diff / 60000)}m ago`;
  }
  else if (diff >= 3600000 && diff < 7200000) {
      finalTime = `1h ago`;
  }
  else {
      finalTime = fallback(then, now);
  }

  return finalTime;
}

function fallback(d, now) {
  let hour = d.getHours();
  let minute = d.getMinutes();
  let hString = hour.toString();
  let mString = minute.toString();

  let suffix;

  if ((hour) < 12) {
      suffix = 'AM';
  }
  else {
      hString = String(hour - 12);
      suffix = 'PM';
  }

  if (minute < 10) {
      mString = '0' + minute;
  }
  if (hour === 0) {
      hString = '12';
  }

  let fullTime = hString + ":" + mString + " " + suffix;
  
  let day = d.getDay();
  let month = d.getMonth();
  let date = d.getDate();
  let year = d.getFullYear();

  let daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let f_day;
  let f_month;

  f_day = daysArr[day];
  f_month = monthsArr[month];
  let separator = ','

  let fullDate = `${f_month} ${date}, ${year}`;

  if (now.getYear() === d.getYear()) {
      let dateDiff = Math.abs(now.getDate() - d.getDate());
      if (now.getMonth() === d.getMonth() && dateDiff < 7) {
          fullDate = `${f_day}`;
      }
      else {
          fullDate = `${f_month} ${date}`;
      }
  }
  else {
      separator = ';'
  }


  return `${fullDate}${separator} ${fullTime}`;
}

export default timeFn;