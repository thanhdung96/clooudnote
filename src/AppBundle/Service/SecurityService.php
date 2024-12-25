<?php

namespace App\AppBundle\Service;

use App\ApiBundle\Dto\Security\LoginDto;
use App\AppBundle\Repository\UserRepository;

final class SecurityService {
    public function __construct(
        private readonly UserRepository $userRepository
    ) { }

    /**
     * Summary of authenticate
     * @param LoginDto $loginDto
     * @return string|null
     */
    public function authenticate(LoginDto $loginDto): ?string {
        
    }
}
