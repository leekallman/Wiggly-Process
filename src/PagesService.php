<?php
declare(strict_types=1);

namespace App;


use PDO;
use PDOStatement;
// Handles communication with DB. Has all functions(increaceCounter, createCounter, etc)
class PagesService
{
    private PDO $pdo;

    /**
     * CounterService constructor.
     * @param PDO $pdo
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
   /*     $this->createDatabaseTable();*/
    }

    /**
     * @param string $query
     * @return bool|PDOStatement
     */
    private function prepare(string $query)
    {
        return $this->pdo->prepare($query);
    }

    public function getPages(): array
    {
        $query = "select * from pages";
        $statement = $this->prepare($query);
        $statement->execute();

        $pages = array();
        while ($entry = $statement->fetchObject(PageModel::class)) {
            $pages[] = $entry;
        }
        return $pages;
    }

    //Update single page
    public function updatePage(int $id, string $title, string $url): ?PageModel
    {
        $query = "update pages set title=:title, url=:url where id=:id";
        $statement = $this->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->bindParam(':title', $title);
        $statement->bindParam(':url', $url);


        $statement->execute();
        $id = (int) $id;

        return $this->getPage($id); //send back the updates
    }

    public function getPage(int $id): ?PageModel
    {
        $query = "select * from pages where id=:id";
        $statement = $this->prepare($query);
        $statement->execute(compact('id'));
        return $statement->fetchObject(PageModel::class) ?: null;
    }

    public function createPage(string $name): PageModel
    {
        $query = "insert into pages (name) values (:name);";
        $statement = $this->prepare($query);
        $statement->execute(compact('name'));

        $id = (int)$this->pdo->lastInsertId();
        return $this->getPage($id);
    }

    /*public function createDatabaseTable(): void
    {
        $ddl = <<<EOF
        create table IF NOT EXISTS counters
        (
            id int auto_increment
                primary key,
            value int default 0 not null,
            name varchar(50) null
        );
EOF;
        $this->pdo->exec($ddl);
    }*/
}
