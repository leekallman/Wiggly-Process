<?php
declare(strict_types=1);

namespace App;


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

// Handles the catching of API URIs
class PagesApi
{
    /**
     * @var PagesService
     */
    private PagesService $pagesService;


    /**
     *
     * CounterApi constructor.
     * @param PagesService $pagesService
     */
    public function __construct(PagesService $pagesService)
    {
        $this->pagesService = $pagesService;
    }

    public function setup(Group $group)
    {
        $group->get('', function (Request $request, Response $response, $args) { # GET api/pages
            $response->getBody()->write(json_encode($this->pagesService->getPages()));
            return $response->withHeader('Content-Type', 'application/json');
        });
        $group->post('', function (Request $request, Response $response, $args) { // POST /api/pages          Create post
            $input = json_decode(file_get_contents('php://input'));
            $title =  $input->title;
            $href=  $input->href;
            $response->getBody()->write(json_encode($this->postService->createPost($title, $href)));
            return $response->withHeader('Content-Type', 'application/json');
        });

        $group->get('/{id}', function (Request $request, Response $response, $args) { # GET api/counters/{id}
            $response->getBody()->write(json_encode($this->pagesService->getPage((int)$args['id'])));
            return $response->withHeader('Content-Type', 'application/json');
        });
        $group->put('/{id}', function (Request $request, Response $response, $args) { // POST /api/posts/{id}    Change specific post
            $input = json_decode(file_get_contents('php://input'));
            $title =  $input->title;
            $href=  $input->href;
            $response->getBody()->write(json_encode($this->pagesService->updatePage((int)$args['id'], $title, $href)));
            return $response->withHeader('Content-Type', 'application/json');
        });
    }
}
