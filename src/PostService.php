<?php
/** @noinspection ALL */
declare(strict_types=1);

namespace App;

use \DateTime;
use PDO;
use PDOStatement;

class PostService
{
    private PDO $pdo;

    /**
     * PostService constructor.
     * @param PDO $pdo
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
/*        $this->createDatabaseTable();*/
    }

    /**
     * @param string $query
     * @return bool|PDOStatement
     */
    private function prepare(string $query)
    {
        return $this->pdo->prepare($query);
    }

    // Get all posts
    public function getPosts(): array
    {
        $query = "select * from posts";
        $statement = $this->prepare($query);
        $statement->execute();

        $posts = array();
        while ($entry = $statement->fetchObject(PostModel::class)) {
            $posts[] = $entry;
        }
        return $posts;
    }

    //Update single post
    public function updatePost(int $id, string $title, string $image, string $content, string $author): ?PostModel
    {
        $query = "update posts set title=:title, image=:image, content=:content, author=:author where id=:id";
        $statement = $this->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->bindParam(':title', $title);
        $statement->bindParam(':image', $image);
        $statement->bindParam(':content', $content);
        $statement->bindParam(':author', $author);
        $statement->execute();
        $id = (int) $id;

        return $this->getPost($id); //send back the updates
    }

    // Get specific posts
    public function getPost(int $id): ?PostModel
    {
        $query = "select * from posts where id=:id";
        $statement = $this->prepare($query);
        $statement->execute(compact('id'));
        return $statement->fetchObject(PostModel::class) ?: null;
    }

    // Delete specific posts
    public function deletePost(int $id): ?PostModel
    {
        $query = "delete from posts where id=:id";
        $statement = $this->prepare($query);
        $statement->execute(compact('id'));
        return $statement->fetchObject(PostModel::class) ?: null;
    }


    //create new post
    public function createPost(string $title, string $image, string $content, string $author): ?PostModel
    {
        $created = (new DateTime())->getTimestamp(); //maybe need to change to int in DataGrip
        $image = "";
        $query = "insert into posts (title, image, content, author) values (:title, :image, :content, :author);";
        $statement = $this->prepare($query);
        $statement->bindParam(':title', $title);
        $statement->bindParam(':image', $image);
        $statement->bindParam(':content', $content);
        $statement->bindParam(':author', $author);
        /*      $statement->bindParam(':created', $created);*/

        $statement->execute();


        $id = (int)$this->pdo->lastInsertId(); // get the id for the new post
        return $this->getPost($id);
    }

    /*public function createDatabaseTable(): void
    {
        $ddl = <<<EOF
create table IF NOT EXISTS counters
(
	id int auto_increment
		primary key,
	title varchar(50) not null,
	author varchar(50) not null,
	content varchar(255),
	created int(10)

);
EOF;
        $this->pdo->exec($ddl);
    }*/
}
