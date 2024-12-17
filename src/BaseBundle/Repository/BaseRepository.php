<?php

namespace App\BaseBundle\Repository;

use App\BaseBundle\Entity\BaseEntity;
use App\BaseBundle\Repository\Interface\IBaseRepository;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

abstract class BaseRepository extends ServiceEntityRepository implements IBaseRepository
{
    public function __construct(ManagerRegistry $registry, string $entityClass) {
        parent::__construct($registry, $entityClass);
    }

    public function saveOne(BaseEntity $entity, bool $flush = true): BaseEntity {
        $entityManager = $this->getEntityManager();
        $entityManager->persist($entity);

        if ($flush) {
            $entityManager->flush();
        }

        return $entity;
    }
}
