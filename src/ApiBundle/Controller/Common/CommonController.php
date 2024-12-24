<?php

namespace App\ApiBundle\Controller\Common;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class CommonController extends AbstractController
{
    #[Route('/app/api/bundle/controller/common/common', name: 'app_api_bundle_controller_common_common')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/App/ApiBundle/Controller/Common/CommonController.php',
        ]);
    }
}
