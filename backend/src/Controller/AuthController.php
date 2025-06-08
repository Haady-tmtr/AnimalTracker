<?php

namespace App\Controller;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;


final class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $em): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    $user = new User();
    $user->setEmail($data['email']);
    $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
    $user->setRoles($data['roles'] ?? ['ROLE_USER']);
    $user->setNom($data['nom']);
    $user->setPrenom($data['prenom']);

    $em->persist($user);
    $em->flush();

    return new JsonResponse(['message' => 'Utilisateur créé avec succès'], 201);
}




}
