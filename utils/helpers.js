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
  when: (operand_1, operator, operand_2, options) => {
    var operators = {
      'eq': function(l,r) { return l == r; },
      'noteq': function(l,r) { return l != r; },
      'gt': function(l,r) { return Number(l) > Number(r); },
      'or': function(l,r) { return l || r; },
      'and': function(l,r) { return l && r; },
      '%': function(l,r) { return (l % r) === 0; }
     }
     , result = operators[operator](operand_1,operand_2);

     if (result) {
      return options.fn(this);
     } else {
      return options.inverse(this);
     }
  },
  ifEquals: (arg1, arg2, options) => {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },
  fullId: (var1, var2, var3) => {
    if (var1 == var2) {
      var escOutput = "<button type='button' class='button' id='edit-meal-btn' data-toggle='modal' data-target='#editModal' value=" + var3 + ">Edit</button> <button type='button' class='button' id='delete-meal-btn' value=" + var3 + ">Delete</button>";
      return escOutput;
    } 
  },   
};