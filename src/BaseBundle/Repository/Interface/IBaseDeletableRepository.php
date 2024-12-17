<?php

namespace App\BaseBundle\Repository\Interface;

use App\BaseBundle\Entity\DeletableEntity;

interface IBaseDeletableRepository extends IBaseRepository
{
    function deleteOne(DeletableEntity $entity, bool $flush): void;
}