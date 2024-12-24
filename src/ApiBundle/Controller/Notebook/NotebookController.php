<?php

namespace App\ApiBundle\Controller\Notebook;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class NotebookController extends AbstractController
{
    #[Route('/app/api/bundle/controller/notebook/notebook', name: 'app_api_bundle_controller_notebook_notebook')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/App/ApiBundle/Controller/Notebook/NotebookController.php',
        ]);
    }
}
