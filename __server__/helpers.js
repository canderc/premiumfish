const formattedCurrentDate = function () {
  const date = new Date();

  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'EET',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  

  return date.toLocaleString("ru", options)
}

module.exports = {
  formattedCurrentDate
}