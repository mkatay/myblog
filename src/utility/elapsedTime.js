export const elapsedTime=(serverTimestamp)=>{
    // Konvertáljuk a Firestore időbélyeget egy Date objektummá
  const serverTime = new Date(serverTimestamp.seconds * 1000 + serverTimestamp.nanoseconds / 1000000);

  const currentTime = new Date();
  const elapsedMilliseconds = currentTime - serverTime;

  const millisecondsInSecond = 1000;
  const millisecondsInMinute = 60 * millisecondsInSecond;
  const millisecondsInHour = 60 * millisecondsInMinute;
  const millisecondsInDay = 24 * millisecondsInHour;
  const millisecondsInWeek = 7 * millisecondsInDay;

  if (elapsedMilliseconds < millisecondsInMinute) {
    const seconds = Math.floor(elapsedMilliseconds / millisecondsInSecond);
    return `${seconds} másodperce`;
  } else if (elapsedMilliseconds < millisecondsInHour) {
    const minutes = Math.floor(elapsedMilliseconds / millisecondsInMinute);
    return `${minutes} perce`;
  } else if (elapsedMilliseconds < millisecondsInDay) {
    const hours = Math.floor(elapsedMilliseconds / millisecondsInHour);
    return `${hours} órája`;
  } else if (elapsedMilliseconds < millisecondsInWeek) {
    const days = Math.floor(elapsedMilliseconds / millisecondsInDay);
    return `${days} napja`;
  } else {
    const weeks = Math.floor(elapsedMilliseconds / millisecondsInWeek);
    return `${weeks} hete`;
  }
}

  
  