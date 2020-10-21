// declaration of html variables and fake api
const mainPostsEl = document.querySelector(".posts");
const userContainerEl = document.querySelector(".user-container");
const jsonApi = "https://jsonplaceholder.typicode.com/";

// fetch all posts and put them into the main body of the site
fetch(jsonApi + "posts").then((res) => res.json()).then((posts) => {
    posts.forEach((post) => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');

        const postTitleEl = document.createElement('h3');
        postTitleEl.classList.add('post-title');
        postTitleEl.innerText = post.title;

        const postBodyEl = document.createElement('div');
        postBodyEl.classList.add('post-body');
        postBodyEl.innerText = post.body;

        const postCommentButton = document.createElement('button');
        postCommentButton.classList.add('comment-button');
        postCommentButton.dataset.postid = post.id;
        postCommentButton.innerText = "Read comments";
        postCommentButton.addEventListener('click', (event) => showComments(event));

        const postAuthorButton = document.createElement('button');
        postAuthorButton.classList.add('author-button');
        postAuthorButton.dataset.userid = post.userId;
        postAuthorButton.innerText = "Author info";
        postAuthorButton.addEventListener('click', (event) => authorInfo(event));

        postEl.append(postTitleEl, postBodyEl, postCommentButton, postAuthorButton);

        mainPostsEl.appendChild(postEl);
    });
});

// function to fetch comments related to the post
const showComments = (event) => {
    const targetEL = event.target;

    if(targetEL.parentElement.querySelector(".comments") !== null) {
        targetEL.parentElement.querySelector(".comments").remove();
        targetEL.innerText = "Read comments";
        return;
    }

    const commentsApi = `${jsonApi}posts/${targetEL.dataset.postid}/comments`;

    fetch(commentsApi).then((res) => res.json()).then((commentData) => {
        const commentsListEl = document.createElement('ul');
        commentsListEl.classList.add('comments');

        commentData.forEach((comment)=>{
            const listItemEl = document.createElement('li');
            listItemEl.classList.add("comment");

            const userEmail = document.createElement('div');
            userEmail.innerHTML = comment.email;

            const commentBody = document.createElement('div');
            commentBody.innerHTML = comment.body;
            
            listItemEl.append(userEmail, commentBody);
            commentsListEl.appendChild(listItemEl);
        });
        
        targetEL.parentElement.appendChild(commentsListEl);
        targetEL.innerText = "Hide comments";
    });
}

// function to fetch information about a posts author
const authorInfo = (event) => {
    userContainerEl.innerHTML = "";
    const usersApi = jsonApi + "users/" + event.target.dataset.userid;
    
    fetch(usersApi).then((res) => res.json()).then((userData) => {
        const userEl = document.createElement('div');
        userEl.classList.add('user');
        userEl.style.position = "fixed";

        const authorHeaderEl = document.createElement('h2');
        authorHeaderEl.innerText = "Author";

        const authorNameEl = document.createElement('div');
        authorNameEl.innerText = `${userData.name}`;

        const authorEmailEl = document.createElement('div');
        authorEmailEl.innerText = `${userData.email}`;

        const authorPhoneEl = document.createElement('div');
        authorPhoneEl.innerText = `Phone: ${userData.phone}`;

        const linebreakEl = document.createElement('br');

        const authorCompanyEl = document.createElement('div');
        authorCompanyEl.innerText = `Company: ${userData.company.name}`;

        userEl.append(authorHeaderEl, authorNameEl, authorEmailEl, authorPhoneEl, linebreakEl, authorCompanyEl);
        userContainerEl.appendChild(userEl);
    });
}