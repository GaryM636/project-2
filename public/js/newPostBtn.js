const add = document.querySelector('#comment-btn');
const addPost = document.querySelector('#addPost');

addPost.addEventListener('submit', async e => {
    e.preventDefault();

    const subject = document.querySelector('#postSubject').value;
    const description = document.querySelector('#postDescription').value;
    
    console.log("subject", subject);
    console.log("description", description);

    const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ subject, description }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        document.location.reload();
    } else {
        alert('Failed to create the new post');
    }


    
});
