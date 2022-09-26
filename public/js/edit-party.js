const party_id = document.querySelector('input[name="party-id"]').value;

const editFormHandler = async function(event) {
    event.preventDefault();
  
    const party_name = document.querySelector('input[name="party-name"]').value;
    const party_location = document.querySelector('input[name="party-location"]').value;
    const party_date = document.querySelector('input[name="party-date"]').value;
    // const party_content = document.querySelector('textarea[name="party-body"]').value;
  
  
    await fetch(`/api/party/${party_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        party_name,
        party_location,
        party_date,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/dashboard');
  };
  
  document
    .querySelector('#edit-party-form')
    .addEventListener('submit', editFormHandler);