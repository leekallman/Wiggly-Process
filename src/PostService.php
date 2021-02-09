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
 /*       $query = "select *, substr(content, 1,100) as extract from posts";

        $statement = $this->prepare($query);
        $statement->execute();

        return $this->postExtract($id);
    }*/

    // Get all posts
    public function getPosts(): array
    {
        $query = "select * from posts order by created desc";

        $statement = $this->prepare($query);
        $statement->execute();

        $posts = array();
        while ($entry = $statement->fetchObject(PostModel::class)) {
            $posts[] = $entry;
        }
        return $posts;
    }

    //Update single post
    public function updatePost(int $id, string $image, string $title, string $content, string $author): ?PostModel
    {
        $query = "update posts set image=:image, title=:title, content=:content, author=:author where id=:id";
        $statement = $this->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->bindParam(':image', $image);
        $statement->bindParam(':title', $title);
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
    // Create extract from content
    public function postExtract(string $content, $limit)
    {
        if (str_word_count($content, 0) > $limit) {
            $words = str_word_count($content, 2);
            $pos = array_keys($words);
            $content = substr($content, 0, $pos[$limit]) . '...';
        }
        return $content;
    }

    //create new post
    public function createPost(string $image, string $title, string $content, string $author): ?PostModel
    {
        $created = (new DateTime())->getTimestamp();
        $extract = $this ->postExtract($content, 50);
        $query = "insert into posts (image, title, extract, content, author) values (:image, :title, :extract, :content, :author);";
        $statement = $this->prepare($query);
        $statement->bindParam(':image', $image);
        $statement->bindParam(':title', $title);
        $statement->bindParam(':extract', $extract);
        $statement->bindParam(':content', $content);
        $statement->bindParam(':author', $author);
        $statement->execute();


        $id = (int)$this->pdo->lastInsertId(); // get the id for the new post
        return $this->getPost($id);
    }
}
