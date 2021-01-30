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
const main = document.querySelector('#main');
let container = createNode('div'),
    posts = createNode('ul'),
    postArchive = createNode('button'),
    addPost  = createNode('button');

    editPost  = createNode('button');
    deletePost  = createNode('button');

    container.classList = "inner-container";
    postArchive.id = "postArchive";
    addPost.id = "addPost";
    posts.id = "posts";
    postArchive.innerText = "News Archive";
    addPost.innerText = "Add News";

    appendNode(container, postArchive);
    appendNode(container, addPost);
    appendNode(container, posts);
    appendNode(main, container);


fetch(apiRoot)
    .then(res => res.json())
    .then (data => {
        //iterate over posts
        data.map((post) =>{

            let li = createNode('li'),
                titleLabel = createNode('label'),
                titleInput = createNode('input'),
                authorLabel = createNode('label'),
                authorInput = createNode('input'),
                contentLabel = createNode('label'),
                contentTextarea = createNode('textarea'),
                imageLabel = createNode('label'),
                imageInput = createNode('input'),
                span = createNode('span'),
                submitButton = createNode('input');


            //create the elements
/*            let li = createNode('li'),
                title = createNode('h3'),
                author = createNode('p'),
                content = createNode('div'),
                img = createNode('img'),
                span = createNode('span'),
                line = createNode('hr'),
                edit = createNode('button'),
                del = createNode('button');*/

            li.id = "editElem";
            titleInput.value = post.title;
            authorInput.value = post.author;
            contentTextarea.value = post.content;
            imageInput.src = post.image;
            span.innerText = post.created;
            submitButton.value = "Submit";
            submitButton.type = "submit";
            submitButton.id = "submit";
/*          edit.classList = "editPost";
            del.classList = "deletePost";
            edit.innerText = "edit";
            del.innerText = "delete";*/

            // append all elements
           appendNode(li, titleInput);
           appendNode(li, imageInput);
           appendNode(li, contentTextarea);
           appendNode(li, authorInput);
           appendNode(li, span);
           appendNode(li, submitButton);
/*         appendNode(li, edit);
           appendNode(li, del);
           appendNode(li, line);*/
           appendNode(posts, li);


 /*           // append all elements
            appendNode(li, title);
            appendNode(li, img);
            appendNode(li, content);
            appendNode(li, author);
            appendNode(li, span);
            appendNode(li, edit);
            appendNode(li, del);
            appendNode(li, line);
            appendNode(posts, li);*/
        });
        //code to handle response
    }).catch(err => {
    //code to handle errors
    console.error('An error occurred: ', err);
})

/*Add post*/
formElem.onsubmit = async (e) => {
    e.preventDefault();
    let form = document.querySelector("#formElem");
    // var form = document.forms[0];

    data = {
        title : form.querySelector('input[name="title"]').value,
        author : form.querySelector('input[name="author"]').value,
        content : form.querySelector('input[name="content"]').value,
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
    /*    let text = await response.text(); // read response body as text
        document.querySelector("#decoded").innerHTML = text;*/
};

/*Edit post*/
editElem.onsubmit = async (e) => {
    e.preventDefault();
    let editForm = document.querySelector("#editElem");
    // var form = document.forms[0];

    data = {
        title : editForm.querySelector('input[name="title"]').value,
        author : editForm.querySelector('input[name="author"]').value,
        content : editForm.querySelector('input[name="content"]').value,
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
        .then(data=>console.log(data))

    /*    let text = await response.text(); // read response body as text
        document.querySelector("#decoded").innerHTML = text;*/
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
