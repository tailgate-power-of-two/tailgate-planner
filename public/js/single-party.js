const party_id = document.querySelector('input[name="party-id"]').value;
// const meal_id = document.querySelector('input[name="meal-id"]').value;

const commentFormHandler = async (event) => {
  event.preventDefault();

  const party_comment = document.querySelector('textarea[name="comment-body"]').value;
  console.log(party_comment);

  if(party_comment) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        party_id,
        party_comment
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  };
}

const mealFormHandler = async (event) => {
  event.preventDefault();

  const item_name = document.querySelector('input[name="item-name"]').value;
  let item_type = "";
  // const item_type = document.querySelector('input[name="item_type"]').value;
  const dietary = document.querySelector('input[name="dietary"]').value;

  if(document.querySelector('input[value="Food"]').checked) {
    item_type = "Food";
    console.log(item_type);
  } else if (document.querySelector('input[value="Beverage"]').checked) {
    item_type = "Beverage";
    console.log(item_type);
  } else if (document.querySelector('input[value="Other"]').checked){
    item_type = "Other";
    console.log(item_type);
  } else {
    alert('Nothing checked');
  }

  if(item_name) {
    const response = await fetch(`/api/meals`, {
      method: 'POST',
      body: JSON.stringify({
        item_name,
        item_type,
        dietary,
        party_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  };
}

const deletePartyClickHandler = async () => {
  // await fetch(`/api/party/${party_id}`, {
  //   method: 'DELETE'
  // });

  document.location.replace("/dashboard");
};

// const deleteMealClickHandler = async () => {
//   // await fetch(`/api/meals/this.id)`, {
//   //   method: 'DELETE'
//   // });
//   // console.log(this.id)

//   // document.location.reload();
// };

let delParty = document.querySelector('#delete-party-btn')
  
if(delParty){
  delParty.addEventListener('click', deletePartyClickHandler);
}

let btns = document.querySelectorAll('#delete-meal-btn')
for (i of btns) {
  i.addEventListener('click', function() {
    alert("I am a button with value " + $(this).attr('value'));
    // console.log(i.value)
  });
}

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);

document
  .querySelector('#new-meal-form')
  .addEventListener('submit', mealFormHandler);

