module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute:'2-digit'
    });
  },
  format_date: (date) => {
    // Using JavaScript Date methods, we get and format the month, date, and year
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      // We add five years to the 'year' value to calculate the end date
      new Date(date).getFullYear()
    }`;
  },
  getFirstLetter: (name) => {
    return name.match(/\b\w/g).join("");
  },

};