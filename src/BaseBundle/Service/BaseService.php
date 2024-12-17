<?php

namespace App\BaseBundle\Service;

use App\BaseBundle\Entity\BaseEntity;
use App\BaseBundle\Repository\Interface\IBaseRepository;
use App\BaseBundle\Service\Interface\IBaseService;

final class BaseService implements IBaseService
{
    public function __construct(
        private readonly IBaseRepository $baseRepository
    ) { }

    public function save(BaseEntity $data): BaseEntity
    {
        return $this->baseRepository->saveOne($data, true);
    }
}