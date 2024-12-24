<?php

namespace App\BaseBundle\Enum;

enum UserRole: string
{
    case Common = 'ROLE_USER';
    case Admin = 'ROLE_ADMIN';
}
