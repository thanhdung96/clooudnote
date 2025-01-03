<?php

namespace App\AppBundle\Repository;

use App\AppBundle\Entity\User;
use App\BaseBundle\Enum\UserRole;
use App\BaseBundle\Repository\BaseRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

class UserRepository extends BaseRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }

    /**
     * @param UserRole $role
     * @return User[]
     */
    public function getUserByRole(UserRole $role = UserRole::Common): array
    {
        $queryBuilder = $this->getEntityManager()->createQueryBuilder();

        $queryBuilder
            ->select('user')
            ->from(User::class, 'user')
            ->where($queryBuilder->expr()->like('user.roles', $queryBuilder->expr()->literal("%$role->name")));

        return $queryBuilder->getQuery()->getResult();
    }
}
