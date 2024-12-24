<?php

namespace App\AppBundle\Service;

use App\AppBundle\Entity\User;
use App\AppBundle\Repository\UserRepository;
use App\BaseBundle\Entity\BaseEntity;
use App\BaseBundle\Enum\UserRole;
use App\BaseBundle\Service\Interface\IBaseService;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserService implements IBaseService
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly UserPasswordHasherInterface $passwordHasherInterface
    ) { }

    public function createUser(UserRole $role = UserRole::Common): User
    {
        $user = new User();
        $user->setEmail('dung.don.96@gmail.com');
        $user->setRoles([$role->value]);
        $password = $this->hashPassword($user, 'hello');
        $user->setPassword($password);

        return $user;
    }

    public function save(BaseEntity $data): User
    {
        return $this->userRepository->saveOne($data);
    }

    public function getAdmin(): ?User
    {
        $result = $this->userRepository->getUserByRole(UserRole::Admin);

        return sizeof($result) === 0 ? null : $result[0];
    }

    public function hashPassword(User $user, string $plaintext): string {
        return $this->passwordHasherInterface->hashPassword($user, $plaintext);
    }
}