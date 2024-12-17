<?php

namespace App\BaseBundle\Service\Interface;

use App\BaseBundle\Entity\BaseEntity;

interface IBaseService
{
    public function save(BaseEntity $data): BaseEntity;
}