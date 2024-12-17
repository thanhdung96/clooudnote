<?php

namespace App\AppBundle\Repository;

use App\AppBundle\Entity\Notebook;
use App\BaseBundle\Repository\BaseDeletableRepository;
use Doctrine\Persistence\ManagerRegistry;

class NotebookRepository extends BaseDeletableRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Notebook::class);
    }
}
