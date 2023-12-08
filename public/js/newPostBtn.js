const addPost = document.querySelector('#addPost');

addPost.addEventListener('submit', async e => {
    e.preventDefault();

    const subject = document.querySelector('#postSubject').value;
    const description = document.querySelector('#postDescription').value;
    const game_id = document.querySelector('#gameId').value;

    console.log("subject", subject);
    console.log("description", description);
    console.log("game_id", game_id);
    
    const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ subject, description, game_id }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        document.location.reload();
    } else {
        alert('Failed to create the new post');
    }


    
});

