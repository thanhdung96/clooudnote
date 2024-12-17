<?php

namespace App\AppBundle\Repository;

use App\AppBundle\Entity\NoteSection;
use App\BaseBundle\Repository\BaseDeletableRepository;
use Doctrine\Persistence\ManagerRegistry;

class NoteSectionRepository extends BaseDeletableRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NoteSection::class);
    }
}
