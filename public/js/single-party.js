const party_id = document.querySelector('input[name="party-id"]').value;

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

const editMealFormHandler = async (event) => {
  event.preventDefault();

  const item_name = document.querySelector('input[name="edit-item-name"]').value;
  let item_type = "";
  // const item_type = document.querySelector('input[name="item_type"]').value;
  const dietary = document.querySelector('input[name="edit-dietary"]').value;

  if(document.querySelector('input[value="edit-Food"]').checked) {
    item_type = "Food";
    console.log(item_type);
  } else if (document.querySelector('input[value="edit-Beverage"]').checked) {
    item_type = "Beverage";
    console.log(item_type);
  } else if (document.querySelector('input[value="edit-Other"]').checked){
    item_type = "Other";
    console.log(item_type);
  } else {
    alert('Nothing checked');
  }

  let editMealId = document.querySelector('input[name="edit-meal-id"]').getAttribute('value')

  if(item_name) {
    const response = await fetch(`/api/meals/${editMealId}`, {
      method: 'PUT',
      body: JSON.stringify({
        item_name,
        item_type,
        dietary
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
  if(!confirm('are you sure you want to delete this party?')){
    return
  }

  await fetch(`/api/party/${party_id}`, {
    method: 'DELETE'
  });

  document.location.replace("/dashboard");
};

const editClickHandler = () =>{
  document.location.replace(`/dashboard/edit/${party_id}`)
}

const deleteMealClickHandler = async () => {
  if(!confirm('are you sure you want to delete this meal?')){
    return
  }

  await fetch(`/api/meals/${this.value}`, {
    method: 'DELETE'
  });

  document.location.reload();
};

let del = document.querySelector('#delete-party-btn')
  
if(del){
  del.addEventListener('click', deletePartyClickHandler);
}

let btns = document.querySelectorAll('#delete-meal-btn')
for (const i of btns) {
  // i.addEventListener('click', deleteMealClickHandler);
  i.addEventListener('click', function() {
    // console.log(i.value)
    if(!confirm('are you sure you want to delete this meal?')){
      return
    }
  
    fetch(`/api/meals/${i.value}`, {
      method: 'DELETE'
    });
  
    document.location.reload();
  });
}

let eBtns = document.querySelectorAll('#edit-meal-btn')
for (const i of eBtns) {
  // i.addEventListener('click', deleteMealClickHandler);
  i.addEventListener('click', function() {
    // alert(i.value)
  
    fetch(`/api/meals/${i.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) =>{
        document.querySelector('input[name="edit-meal-id"]').setAttribute('value', i.value)
        document.querySelector('input[name="edit-item-name"]').setAttribute('value',data.item_name)
        if(data.dietary){
          document.querySelector('input[name="edit-dietary"]').setAttribute('value',data.dietary)
        }
          console.log(data.item_type)
        if(data.item_type == 'Food'){
          document.getElementById('edit-food').checked = true
        } else if (data.item_type == 'Beverage'){
          document.getElementById('edit-beverage').checked = true
        } else{
          document.getElementById('edit-other').checked = true
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  
    
  });
}
  
let edit = document.querySelector('#edit-btn')

if(edit){
  edit.addEventListener('click',editClickHandler)
}

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);

document
  .querySelector('#new-meal-form')
  .addEventListener('submit', mealFormHandler);

document
  .querySelector('#edit-meal-form')
  .addEventListener('submit',editMealFormHandler)

