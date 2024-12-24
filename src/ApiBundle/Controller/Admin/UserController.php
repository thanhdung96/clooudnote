<?php

namespace App\ApiBundle\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/app/api/bundle/controller/admin/user', name: 'app_api_bundle_controller_admin_user')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/App/ApiBundle/Controller/Admin/UserController.php',
        ]);
    }
}
