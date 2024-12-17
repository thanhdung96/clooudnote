<?php

namespace App\AppBundle\Repository;

use App\AppBundle\Entity\NotePage;
use App\BaseBundle\Repository\BaseDeletableRepository;
use Doctrine\Persistence\ManagerRegistry;

class NotePageRepository extends BaseDeletableRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NotePage::class);
    }
}
