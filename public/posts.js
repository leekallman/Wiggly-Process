// Please don't use JQuery for DOM manipulation and form submission IRL. Please use React/Vue/Angular instead!

$(function () {
    let apiRoot = '/api/posts';

    function getPostRowHtml(post) {
        return `<div class="row" data-post-id="${post.id}">
        <div class="col-sm">
            ${post.id}
        </div>
        <div class="col-sm">
            <b>${post.title}</b>
        </div>
        <div class="col-sm">
            ${post.created}
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
});
