<?php

namespace App\ApiBundle\Controller\Security;

use App\ApiBundle\Dto\Security\LoginDto;
use App\AppBundle\Service\SecurityService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class SecurityController extends AbstractController
{
    public function __construct(
        private readonly SecurityService $securityService
    ) {}

    #[Route('/login', name: 'api_security_login', methods: [Request::METHOD_POST])]
    public function login(
        #[MapRequestPayload] LoginDto $loginDto
    ): JsonResponse {
        dd($loginDto);

        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ApiBundle/Controller/Security/SecurityController.php',
        ]);
    }
}
