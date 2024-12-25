<?php

namespace App\BaseBundle\Repository;

use App\BaseBundle\Entity\DeletableEntity;
use App\BaseBundle\Repository\Interface\IBaseDeletableRepository;
use Doctrine\Persistence\ManagerRegistry;

abstract class BaseDeletableRepository extends BaseRepository implements IBaseDeletableRepository
{
    public function __construct(ManagerRegistry $registry, string $entityClass) {
        parent::__construct($registry, $entityClass);
    }

    /**
     * Summary of deleteOne
     * @param DeletableEntity $entity
     * @param bool $flush
     * @return void
     */
    public function deleteOne(DeletableEntity $entity, bool $flush): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->remove($entity);

        if ($flush) {
            $entityManager->flush();
        }
    }
}