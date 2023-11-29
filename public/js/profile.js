const newFormHandler = async (event) => {
    event.preventDefault();
  
    const  = document.querySelector('#').value.trim();
    const  = document.querySelector('#').value.trim();
    const  = document.querySelector('#').value.trim();
  
    if ( &&  && ) {
      const response = await fetch(`/api/`, {
        method: 'POST',
        body: JSON.stringify({ , ,  }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/s/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete ');
      }
    }
  };
  
  document
    .querySelector('.new--form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.-list')
    .addEventListener('click', delButtonHandler);
  