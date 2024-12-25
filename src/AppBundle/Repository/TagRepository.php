<?php

namespace App\AppBundle\Repository;

use App\AppBundle\Entity\Tag;
use App\BaseBundle\Repository\BaseDeletableRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends BaseDeletableRepository<Tag>
 */
class TagRepository extends BaseDeletableRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tag::class);
    }
}
