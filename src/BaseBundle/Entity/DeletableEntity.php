<?php

namespace App\BaseBundle\Entity;

abstract class DeletableEntity extends BaseEntity
{
    public function __construct()
    {
        parent::__construct();
    }
}