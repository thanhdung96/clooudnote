<?php

namespace App\AppBundle\Entity;

use App\AppBundle\Repository\UserRepository;
use App\BaseBundle\Entity\BaseEntity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User extends BaseEntity implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    /**
     * @var Collection<int, Notebook>
     */
    #[ORM\OneToMany(targetEntity: Notebook::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $notebooks;

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function __construct()
    {
        parent::__construct();
        
        $this->notebooks = new ArrayCollection();
    }

    /**
     * @return Collection<int, Notebook>
     */
    public function getNotebooks(): Collection
    {
        return $this->notebooks;
    }

    public function addNotebook(Notebook $notebook): static
    {
        if (!$this->notebooks->contains($notebook)) {
            $this->notebooks->add($notebook);
            $notebook->setUser($this);
        }

        return $this;
    }

    public function removeNotebook(Notebook $notebook): static
    {
        if ($this->notebooks->removeElement($notebook)) {
            // set the owning side to null (unless already changed)
            if ($notebook->getUser() === $this) {
                $notebook->setUser(null);
            }
        }

        return $this;
    }
}
