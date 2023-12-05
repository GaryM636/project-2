const add = document.querySelector('#comment-btn');
const addPost = document.querySelector('#addComment');

addPost.addEventListener('submit', async e => {
    e.preventDefault();

    const description = document.querySelector('#postDescription').value;
    
    console.log("description", description);

    const res = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        document.location.reload();
    } else {
        alert('Failed to create new comment');
    }
});