// create an element
const createNode = (elem) => {
    return document.createElement(elem);
};
// append an element to parent
const appendNode = (parent, elem) => {
    parent.appendChild(elem);
};

// API URL
const apiRoot = '/api/posts';

// Post Element
const archive = document.querySelector('#archive');
const posts = createNode('ul');
    posts.id = "posts";
    appendNode(archive, posts);


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
                submitButton = createNode('button'),
                deleteButton  = createNode('button');


            li.classList = "editElem";
            li.id = "editElem" + post.id;
            editForm.classList = "editForm";
            editForm.id = "editForm";

            idLabel.innerText = "Post ID:";
            idLabel.id = "id" + post.id;
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
            created.innerText = post.created;

            submitButton.value = post.id;
            submitButton.innerText = "Submit change";
            submitButton.type = "button";
            submitButton.id = "submit";
            submitButton.onclick = editPost;

            deleteButton.value = post.id;
            deleteButton.innerText = "Delete Post";
            deleteButton.type = "button";
        /*    deleteButton.id = "delete";*/

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
            appendNode(posts, li);


        });
        //code to handle response
    }).catch(err => {
    //code to handle errors
    console.error('An error occurred: ', err);
});

/*Edit post*/

function editPost(event) {
    let postId = event.target.value;

    let postTitle = document.getElementById('editTitle' + postId);
    let postImage = document.getElementById('editImage' + postId);
    let postContent = document.getElementById('editContent' + postId);
    let postAuthor = document.getElementById('editAuthor' + postId);

    data = {
        title : postTitle.value,
        image : postImage.value,
        content : postContent.value,
        author : postAuthor.value
    }

    fetch(apiRoot, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response=>response.json())
        .then(data=>console.log(data))


    /*editForm.onsubmit = async (e) => {
        e.preventDefault();
        let postId = e.id;
        console.log(e.id);
        let editForm = document.querySelector("#editForm");
        // var form = document.forms[0];

        data = {
            title : editForm.querySelector('input[name="title"]').value,
            author : editForm.querySelector('input[name="author"]').value,
            content : editForm.querySelector('textarea[name="content"]').value,
            image : editForm.querySelector('input[name="image"]').value
        }

        let response = await fetch(apiRoot, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response=>response.json())
            .then(data=>console.log(data))*/

    /*    let text = await response.text(); // read response body as text
        document.querySelector("#decoded").innerHTML = text;*/
};

/*Add post*/
formElem.onsubmit = async (e) => {
    e.preventDefault();
    let form = document.querySelector("#formElem");
    // var form = document.forms[0];
    console.log(form)

    data = {
        title : form.querySelector('input[name="title"]').value,
        author : form.querySelector('input[name="author"]').value,
        content : form.querySelector('textarea[name="content"]').value,
        image : form.querySelector('input[name="image"]').value
    }

    let response = await fetch(apiRoot, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response=>response.json())
        .then(data=>console.log(data))
    document.getElementById('formElem').reset();

    // let text = await response.text(); // read response body as text
    // document.querySelector("#decoded").innerHTML = text;
};



/*Click the post's edit button*/
/*function selectedButton(event){
    let target = event.target;
    let parent = target.parentElement;//parent of "target"
    console.log(parent)
}*/
/*get the id of the post*/
/*create/open edit form*/
/*click on submit*/

/*function editPost(e){
    data = {
        title : 'Lisa',
        author : 'hej',
        content : 'test',
        image : 'no',
    }*/





/*    fetch(apiRoot, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(response => {
            return response.json( )
        })
        .then(data =>
            // this is the data we get after doing the delete request, do whatever you want with this data
            console.log(data)
        );*/




/*delete post*/
/*const postToEdit = e.target.getAttribute('id');
console.log(postToEdit);*/
/*fetch(apiRoot, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postToEdit)
})
    .then(response => {
        return response.json( )
    })
    .then(data =>
        // this is the data we get after doing the delete request, do whatever you want with this data
        console.log(data)
    );*/






/*
        function installPostClickHandler() {
        $(".updatePost").off('click').click(postClickHandler);

        function postClickHandler(event) {
            event.target.setAttribute('disabled̈́', 'disabled')
            let postId = event.target.getAttribute('data-post-id');
            $.post(apiRoot + "/" + postId,
                {},
                function (post, status) {
                    $(".row[data-post-id=" + postId + "]").replaceWith(getPostRowHtml(post));
                    installPostClickHandler();
                });
        }
    }


    function installFormSubmitHandler() {
        $("#addPostForm").submit(function (event) {
            event.target.setAttribute('disabled̈́', 'disabled');
            let $postTitle = $('#postTitle', event.target);
            let $postAuthor = $('#postAuthor', event.target);
            let $postContent = $('#postContent', event.target);
            let $postImage = $('#postImage', event.target);
            let $postCreated = $('#postCreated', event.target);
            let title = $postTitle.val();
            let author = $postAuthor.val();
            let content = $postContent.val();
            let image = $postImage.val();
            let created = $postCreated.val();

            console.log(title + content + author);

            $.ajax({
                type: 'POST',
                url: apiRoot,
                data: JSON.stringify({
                    title: title,
                    author: author,
                    content: content,
                    image: image,
                    created: created,
                }),
                success: function (post, status) {
                    $("#addPostRow").before(getPostRowHtml(post));
                    installPostClickHandler();
                    $postName.val('');
                    event.target.removeAttribute('disabled̈́');
                    console.log("if success post new article");
                },
                contentType: "application/json",
                dataType: 'json'
            });

            event.preventDefault();
        });
    }

    function loadPost() {
        $.getJSON(apiRoot, function (result) {
            $.each(result, function (i, post) {
                $("#addPostRow").before(getPostRowHtml(post));
            });
            installPostClickHandler();
        });
    }

    installFormSubmitHandler();
    loadPost();
});
*/
