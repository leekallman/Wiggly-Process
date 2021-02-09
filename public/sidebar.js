// api url
const apiPages = '/api/pages';

// Create sidebar
const sideBar = document.querySelector('#sideBar');

let nav = createNode('ul'),
    archiveLink = createNode('li'),
    archiveHref = createNode('a');

    archiveHref.innerText = "News Archive";
    archiveHref.href = "/archive.html";
    appendNode(sideBar, nav);


    /*fetching data from the pages table*/
fetch(apiPages)
    .then(res => res.json())
    .then (data => {

        //iterate over pages
        data.map((page) => {

            let subpage = createNode('li'),
            pageLink = createNode('button');

            pageLink.value = page.id;
            pageLink.innerText = page.title;
            pageLink.type = "button";
            pageLink.onclick = singlePage;

            appendNode(subpage, pageLink);
            appendNode(nav, subpage);
            appendNode(archiveLink, archiveHref);
            appendNode(nav, archiveLink);
        })
    })



// Single page function
function singlePage(event) {
    /*    event.preventDefault();*/
    let pageId = event.target.value;
    document.getElementById("main").innerHTML = "";

    fetch(apiPages + '/' + pageId)
        .then(response => response.json())
        .then(data => {
                //create the elements
                let h1 = createNode('h1'),
                    content = createNode('p');

                h1.innerText = data.h1;
                content.innerText = data.content;

                // append all elements
                appendNode(main, h1);
                appendNode(main, content);
            //code to handle response
        }).catch(err => {
        //code to handle errors
        console.error('An error occurred: ', err);
    });
}



/*
//Fetch single pages
fetch(apiPages + '/' + pageId)
    .then(res => res.json())
    .then (data => {
        //iterate over posts
        data.map((page) =>{
            //create the elements
            let h1 = createNode('h1'),
                content = createNode('p');

            h1.innerText = page.h1;
            content.innerText = page.content;


            // append all elements
            appendNode(main, h1);
            appendNode(main, content);
    });
//code to handle response
}).catch(err => {
    //code to handle errors
    console.error('An error occurred: ', err);
})

*/




/*fetch(apiPages)
    .then(res => res.json())
    .then (data => {
        //iterate over pages
        data.map((page) =>{
            //create side bar
            let li = createNode('li'),
                title = createNode('a');

            title.innerText = page.title;
            title.href = page.href;
            title.value = page.id;
            title.type = "button";
            title.onclick = xsinglePost;

            // append all elements
            appendNode(li, title);
            appendNode(nav, li);
            appendNode(admin, adminLink);
            appendNode(nav, admin);
        });
        //code to handle response
    }).catch(err => {
        //code to handle errors
        console.error('An error occurred: ', err);
})*/


/*// Please don't use JQuery for DOM manipulation and form submission IRL. Please use React/Vue/Angular instead!
$(function () {
    let apiRoot = '/api/posts';

    function getPostRowHtml(post) {
        return `<div class="row" data-post-id="${post.id}">
        <div class="hej">
            ${post.id}
        </div>
        <div class="col-sm">
            <b>${post.title}</b>
        </div>
        <div class="col-sm">
            Author: ${post.author}
        </div>
        <div class="col-sm">
            ${post.content}
        </div>
        <div class="col-sm">
            <img src="${post.image}"/>
        </div>
        <div class="col-sm">
            ${post.created}
        </div>

        <div class="col-sm">
            <button class="btn btn-sm btn-primary updatePost" data-post-id="${post.id}" type="button">edit</button>
        </div>
        <br><br>
    </div>`;
        console.log('getPost');
    }

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
        console.log('install-function');
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
});*/
