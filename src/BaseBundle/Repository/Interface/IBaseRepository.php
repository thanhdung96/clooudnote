<?php

namespace App\BaseBundle\Repository\Interface;

use App\BaseBundle\Entity\BaseEntity;

interface IBaseRepository {
    function saveOne (BaseEntity $entity, bool $flush): BaseEntity;
}
