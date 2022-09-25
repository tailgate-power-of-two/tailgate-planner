const newFormHandler = async function(event) {
    event.preventDefault();
  
    const party_name = document.querySelector('input[name="party-name"]').value;
    const party_location = document.querySelector('input[name="party-location"]').value;
    const party_date = document.querySelector('input[name="party-date"]').value;
    // const party_content = document.querySelector('textarea[name="party-body"]').value;
  
  
    await fetch(`/api/party`, {
      method: 'POST',
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
    .querySelector('#new-party-form')
    .addEventListener('submit', newFormHandler);