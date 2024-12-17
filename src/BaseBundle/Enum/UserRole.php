<?php

namespace App\BaseBundle\Enum;

enum UserRole implements IToString
{
    case Common;
    case Admin;

    public function toString(): string
    {
        return match ($this) {
            UserRole::Admin => 'ROLE_ADMIN',
            UserRole::Common => 'ROLE_USER',
        };
    }
}
