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

// create a news list
const main = document.querySelector('#main');
let posts = createNode('ul'),
    banner = createNode('div'),
    bannerH3 = createNode('h3'),
    dot = createNode('span');

dot.id = "dot";
posts.id = "posts";
banner.id = "banner";
bannerH3.id = "bannerH3";
bannerH3.innerText = "Wiggly News";

appendNode(banner, dot);
appendNode(banner, bannerH3);
appendNode(posts, banner);
appendNode(main, posts);


/*fetch the data from post table*/
fetch(apiRoot)
    .then(res => res.json())
    .then (data => {
        //iterate over posts
        data.map((post) =>{
            //create the elements
            let li = createNode('li'),
                postLink = createNode('button'),
                title = createNode('h3'),
                author = createNode('p'),
                content = createNode('p'),
                extract = createNode('p'),
                img = createNode('img'),
                span = createNode('span'),

                str = post.created;
                res = str.substring(0, 10);
                postLink.onclick = singlePost;
                title.id = post.id;
                title.innerText = post.title;
                author.innerText = post.author;
                content.innerText = post.content;
                content.style.display = "none";
                extract.innerText = post.extract;
                content.id = post.id;
                img.src = post.image;
                img.id = post.id;
                span.innerText = res;


            // append all elements
            appendNode(postLink, img);
            appendNode(postLink, title);
            appendNode(postLink, extract);
            appendNode(postLink, content);
            appendNode(postLink, author);
            appendNode(postLink, span);
            appendNode(li, postLink);
            appendNode(posts, li);
        });
        //code to handle response
    }).catch(err => {
    //code to handle errors
    console.error('An error occurred: ', err);
})


/*function to open single post*/
function singlePost(event) {
    let postId = event.target.id;
    fetch(apiRoot + "/" + postId)
        .then(res => res.json())
        .then (data => {
                let li = createNode('li'),
                    title = createNode('h3'),
                    author = createNode('p'),
                    content = createNode('p'),
                    img = createNode('img'),
                    span = createNode('span'),
                    str = data.created,
                    res = str.substring(0, 10);

                title.innerText = data.title;
                author.innerText = data.author;
                content.innerText = data.content;
                img.src = data.image;
                span.innerText = res;
                posts.innerText = "";


                // append all elements
                appendNode(li, img);
                appendNode(li, title);
                appendNode(li, content);
                appendNode(li, author);
                appendNode(li, span);
                appendNode(main, li);

            }).catch(err => {
                console.error('An error occurred: ', err);
            })
        }



/*function addEditEventListener(display, data) {
    let editBtns = document.querySelectorAll(".edit-btn")

    editBtns.forEach(editBtn => {
        editBtn .addEventListener("click", function(e){
            let clickedBtn = getClickedBtn(e.target)
            let clickedId = clickedBtn.parentNode.id

            let dataToEdit = data.find(function(item) {
                if(item.id === clickedId) {
                    return true
                }
            })

            displayForm(clickedBtn, display, dataToEdit)
            addEditRecipeSubmitListener(clickedId)
            addEditPageSubmitListener(clickedId)
        })
    })
}*/



/*
function convertUnixToDate(unix) {
    const milliseconds = unix * 1000;
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleString();
}
*/
