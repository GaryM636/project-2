const newFormHandler = async (event) => {
  event.preventDefault();
  const id = document.querySelector('#user-id').value;
  const formData = new FormData();

  // Handle profile pic separately
  const profilePic = document.querySelector('#profile-pic');
  if (profilePic.files.length > 0) {
    const fileName = profilePic.files[0].name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (allowedExtensions.indexOf(fileExtension) === -1) {
      alert("Please upload a valid image file (jpg, jpeg, png, gif).");
      return;
    }

    formData.append('profile_pic', profilePic.files[0]);
  }

  // Handle bio separately
  const bio = document.querySelector('#bio').value.trim();
  if (bio) {
    formData.append('bio', bio);
  }

  // Handle other fields independently
  const consoleValue = document.querySelector('#console').value.trim();
  if (consoleValue) {
    formData.append('console', consoleValue);
  }

  const favoriteGame = document.querySelector('#favorite').value.trim();
  if (favoriteGame) {
    formData.append('favorite', favoriteGame);
  }

  const currentlyPlaying = document.querySelector('#current').value.trim();
  if (currentlyPlaying) {
    formData.append('current', currentlyPlaying);
  }

  // Send the request to update the user profile
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
    console.log(id);

    const response = await fetch(`/api/posts/${id}`, {
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

document
  .querySelectorAll('.delete-post-btn')
  .forEach(button => button.addEventListener('click', delButtonHandler));


// Assuming you want to show the modal on a specific event (e.g., a button click)
const showEditProfileModalButton = document.getElementById('showEditProfileModalButton');

if (showEditProfileModalButton) {
  showEditProfileModalButton.addEventListener('click', () => {
    // You can customize this part based on your use case
    // For example, you might want to populate some fields in the modal
    editProfileModal.show();
  });
}
