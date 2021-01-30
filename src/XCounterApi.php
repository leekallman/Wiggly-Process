<?php
declare(strict_types=1);

namespace App;


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

// Handles the catching of API URIs
class CounterApi
{
    /**
     * @var PagesService
     */
    private PagesService $counterService;


    /**
     * CounterApi constructor.
     * @param PagesService $counterService
     */
    public function __construct(PagesService $counterService)
    {
        $this->counterService = $counterService;
    }

    public function setup(Group $group)
    {
        $group->get('', function (Request $request, Response $response, $args) { # GET api/counters
            $response->getBody()->write(json_encode($this->counterService->getPages()));
            return $response->withHeader('Content-Type', 'application/json');
        });
        $group->post('', function (Request $request, Response $response, $args) { # POST api/counters
            $input = json_decode(file_get_contents('php://input'));
            $name =  $input->name;
            $response->getBody()->write(json_encode($this->counterService->createPage($name)));
            return $response->withHeader('Content-Type', 'application/json');
        });
        $group->get('/{id}', function (Request $request, Response $response, $args) { # GET api/counters/{id}
            $response->getBody()->write(json_encode($this->counterService->getPage((int)$args['id'])));
            return $response->withHeader('Content-Type', 'application/json');
        });
        $group->post('/{id}', function (Request $request, Response $response, $args) { # POST api/counters/{id}
            $response->getBody()->write(json_encode($this->counterService->increaseCounter((int)$args['id'])));
            return $response->withHeader('Content-Type', 'application/json');
        });
    }
}
