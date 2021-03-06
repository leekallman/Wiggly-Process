<?php
declare(strict_types=1);

namespace App;


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

class PostApi
{
    /**
     * @var PostService
     */
    private PostService $postService;


    /**
     * PostApi constructor.
     * @param PostService $postService
     */
    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function setup(Group $group)
    {
        $group->get('', function (Request $request, Response $response, $args) { // GET /api/posts       Get all posts
            $response->getBody()->write(json_encode($this->postService->getPosts()));
            return $response->withHeader('Content-Type', 'application/json');
        });

        $group->post('', function (Request $request, Response $response, $args) { // POST /api/posts          Create post
            $input = json_decode(file_get_contents('php://input'));
            $image = $input->image;
            $title =  $input->title;
            $content =  $input->content;
            $author=  $input->author;
            $response->getBody()->write(json_encode($this->postService->createPost($image, $title, $content, $author)));
            return $response->withHeader('Content-Type', 'application/json');
        });

        $group->get('/{id}', function (Request $request, Response $response, $args) { // GET /api/posts/{id}    Get specific post
            $response->getBody()->write(json_encode($this->postService->getPost((int)$args['id'])));
            return $response->withHeader('Content-Type', 'application/json');
        });
        $group->delete('/{id}', function (Request $request, Response $response, $args) { // DELETE /api/posts/{id}    Get specific post
            $this->postService->deletePost((int)$args['id']);
            return $response->withStatus(code:204);
        });

        $group->put('/{id}', function (Request $request, Response $response, $args) { // PUT /api/posts/{id}    Change specific post
            $input = json_decode(file_get_contents('php://input'));
            $image =  $input->image;
            $title =  $input->title;
            $content =  $input->content;
            $author=  $input->author;
            $response->getBody()->write(json_encode($this->postService->updatePost((int)$args['id'], $image, $title, $content, $author )));
            return $response->withHeader('Content-Type', 'application/json');
        });

/*        $group->put('', function (Request $request, Response $response, $args) { // PUT /api/posts/   Create extract column

            $extract = substr(content, 0, 100);  // returns an extract of content

            $input = json_decode(file_get_contents('php://input'));
            $content =  $input->content;
            $extract=  $input->extract;
            $response->getBody()->write(json_encode($this->postService->createExtract( $content, $extract )));
            return $response->withHeader('Content-Type', 'application/json');
        });*/


    }
}
