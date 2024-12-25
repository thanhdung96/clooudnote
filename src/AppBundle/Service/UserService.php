<?php

namespace App\AppBundle\Service;

use App\AppBundle\Entity\User;
use App\AppBundle\Repository\UserRepository;
use App\BaseBundle\Entity\BaseEntity;
use App\BaseBundle\Enum\UserRole;
use App\BaseBundle\Service\Interface\IBaseService;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * Summary of UserService
 */
final class UserService implements IBaseService
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly UserPasswordHasherInterface $passwordHasherInterface
    ) { }

    /**
     * Summary of createUser
     * @param \App\BaseBundle\Enum\UserRole $role
     * @return \App\AppBundle\Entity\User
     */
    public function createUser(UserRole $role = UserRole::Common): User
    {
        $user = new User();
        $user->setEmail('dung.don.96@gmail.com');
        $user->setRoles([$role->value]);
        $password = $this->hashPassword($user, 'hello');
        $user->setPassword($password);

        return $user;
    }

    /**
     * Summary of save
     * @param \App\BaseBundle\Entity\BaseEntity $data
     * @return \App\AppBundle\Entity\User
     */
    public function save(BaseEntity $data): User
    {
        return $this->userRepository->saveOne($data);
    }

    /**
     * Summary of getAdmin
     * @return User|null
     */
    public function getAdmin(): ?User
    {
        $result = $this->userRepository->getUserByRole(UserRole::Admin);

        return sizeof($result) === 0 ? null : $result[0];
    }

    /**
     * Summary of hashPassword
     * 
     * @param \App\AppBundle\Entity\User $user
     * @param string $plaintext
     * @return string
     */
    public function hashPassword(User $user, string $plaintext): string {
        return $this->passwordHasherInterface->hashPassword($user, $plaintext);
    }
}