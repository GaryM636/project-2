const addComment = document.querySelectorAll('.add-comment');
console.log(addComment);

addComment.forEach((form) => {
    form.addEventListener('submit', async e => {
        e.preventDefault();

        const values = []; 

        const formData = new FormData(form);
        
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
            values.push(pair[1]) 
          }
          const [post_id, comment] = values

        const res = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (res.ok) {
            document.location.reload();
        } else {
            alert('Failed to create new comment');
        }
    });
});