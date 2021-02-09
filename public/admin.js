// create an element
const createNode = (elem) => {
    return document.createElement(elem);
};
// append an element to parent
const appendNode = (parent, elem) => {
    parent.appendChild(elem);
};

// api url
const apiRoot = '/api/posts';

// create list with archived posts to edit
const archive = document.querySelector('#archive');
const editPosts = createNode('ul');
editPosts.id = "editPosts";
appendNode(archive, editPosts);

/*fetch data from posts table*/
fetch(apiRoot)
    .then(res => res.json())
    .then (data => {
        //iterate over posts
        data.map((post) =>{
            let
                li = createNode('li'),
                editForm = createNode('form'),
                idLabel = createNode('label'),
                id = createNode('span'),
                titleLabel = createNode('label'),
                titleInput = createNode('input'),
                authorLabel = createNode('label'),
                authorInput = createNode('input'),
                contentLabel = createNode('label'),
                contentTextarea = createNode('textarea'),
                image = createNode('img'),
                imageLabel = createNode('label'),
                imageInput = createNode('input'),
                created = createNode('span'),
                createdLabel = createNode('span'),
                str = post.created,
                res = str.substring(0, 10),
                submitButton = createNode('button'),
                deleteButton  = createNode('button');


            li.classList = "editElem";
            li.id = "editElem" + post.id;
            editForm.classList = "editForm";
            editForm.id = "editForm";

            idLabel.innerText = "Post ID:";
            idLabel.id = "id" + post.id;
            idLabel.classList = "id";
            id.id = "id";
            id.size = "3";
            id.innerText = post.id;

            titleLabel.innerText = "Title:";
            titleInput.value = post.title;
            titleInput.id = "editTitle" + post.id
            titleInput.type = "text";

            authorLabel.innerText = "Author:";
            authorInput.type = "text";
            authorInput.value = post.author;
            authorInput.id = "editAuthor" + post.id;

            contentLabel.innerText = "Content:";
            contentTextarea.value = post.content;
            contentTextarea.rows = "10";
            contentTextarea.id = "editContent" + post.id;

            image.src = post.image;
            imageLabel.innerText = "Image url:";
            imageInput.type = "text";
            imageInput.value = post.image;
            imageInput.id = "editImage" + post.id;

            createdLabel.innerText = "Created:";
            created.id = "createdValue";
            created.innerText = res;
            created.value = res;

            submitButton.value = post.id;
            submitButton.innerText = "Submit change";
            submitButton.type = "button";
            submitButton.id = "submit";
            submitButton.onclick = editPost;

            deleteButton.value = post.id;
            deleteButton.innerText = "Delete Post";
            deleteButton.type = "button";
            deleteButton.id = "delete";
            deleteButton.onclick = deletePost;

            // append all elements
            appendNode(editForm, idLabel);
            appendNode(editForm, id);
            appendNode(editForm, titleLabel);
            appendNode(editForm, titleInput);
            appendNode(editForm, image);
            appendNode(editForm, imageLabel);
            appendNode(editForm, imageInput);
            appendNode(editForm, contentLabel);
            appendNode(editForm, contentTextarea);
            appendNode(editForm, authorLabel);
            appendNode(editForm, authorInput);
            appendNode(editForm, createdLabel);
            appendNode(editForm, created);
            appendNode(editForm, submitButton);
            appendNode(editForm, deleteButton);
            appendNode(li, editForm);
            appendNode(editPosts, li);
        });
        //code to handle response
    }).catch(err => {
    //code to handle errors
    console.error('An error occurred: ', err);
});


/*function to edit post*/
function editPost(event) {
    let postId = event.target.value;
    let postImage = document.getElementById('editImage' + postId);
    let postTitle = document.getElementById('editTitle' + postId);
    let postContent = document.getElementById('editContent' + postId);
    let postAuthor = document.getElementById('editAuthor' + postId);

    data = {
        image : postImage.value,
        title : postTitle.value,
        content : postContent.value,
        author : postAuthor.value
    };

    fetch(apiRoot + '/' + postId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response=>response.json())
        .then(data=>alert('Success! Your post has been updated.'),history.replaceState(null, '', archive) 
    )
        .catch(err => console.error('Error:', err))
};

/*Add post*/
formElem.onsubmit = async (e) => {
    e.preventDefault();
    let form = document.querySelector("#formElem");
    // var form = document.forms[0];

    data = {
        image : form.querySelector('input[name="image"]').value,
        title : form.querySelector('input[name="title"]').value,
        content : form.querySelector('textarea[name="content"]').value,
        author : form.querySelector('input[name="author"]').value,
    }

    let response = await fetch(apiRoot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

        .then(response=>response.json())
        .then(data=>alert('Success! Your post has been submitted.'))
    document.getElementById('formElem').reset();
    document.location.reload()

};


/*Delete post*/
function deletePost(event) {
    let postId = event.target.value;

fetch(apiRoot + '/' + postId, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: null
})
    .then(response=>response.json())
    document.location.reload(true)
};
