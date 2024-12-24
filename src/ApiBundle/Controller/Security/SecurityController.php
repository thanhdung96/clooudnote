<?php

namespace App\ApiBundle\Controller\Security;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class SecurityController extends AbstractController
{
    #[Route('/api/bundle/controller/security/security', name: 'app_api_bundle_controller_security_security')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ApiBundle/Controller/Security/SecurityController.php',
        ]);
    }
}
