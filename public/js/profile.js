const newFormHandler = async (event) => {
    event.preventDefault();
    const id = document.querySelector('#user-id').value
    const bio = document.querySelector('#bio').value.trim();
    const profilePic = document.querySelector('#profile-pic');
    const formData = new FormData();
  // Check if a file is selected
  if (profilePic.files.length > 0) {
    const fileName = profilePic.files[0].name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    // Array of allowed image file extensions
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    // Check if the file extension is allowed
    if (allowedExtensions.indexOf(fileExtension) === -1) {
        alert("Please upload a valid image file (jpg, jpeg, png, gif).");
        return; // Stop further execution
    }

    // Append the image file to FormData
    formData.append('profile_pic', profilePic.files[0]);
} else {
    alert("Please select an image file.");
    return; // Stop further execution
}
formData.append('bio', bio);
      const response = await fetch(`/api/users/profile/${id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Something went wrong!');
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
    .querySelector('#profile-form')
    .addEventListener('submit', newFormHandler);
  
  // document
  //   .querySelector('.-list')
  //   .addEventListener('click', delButtonHandler);