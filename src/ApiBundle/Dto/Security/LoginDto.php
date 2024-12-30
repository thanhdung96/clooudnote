<?php

namespace App\ApiBundle\Dto\Security;

use Symfony\Component\Validator\Constraints as Assert;

final class LoginDto {
    #[Assert\NotBlank]
    #[Assert\Length(
        max: 180
    )]
    #[Assert\Email]
    private string $email;

    #[Assert\NotBlank]
    #[Assert\Length(
        max: 100
    )]
    private string $password;

    /**
     * Summary of getEmail
     * @return string
     */
    public function getEmail(): string {
        return $this->email;
    }

    /**
     * Summary of setEmail
     * @param string $email
     * @return LoginDto
     */
    public function setEmail(string $email): static {
        $this->email = $email;

        return $this;
    }

    /**
     * Summary of getPassword
     * @return string
     */
    public function getPassword(): string {
        return $this->password;
    }

    /**
     * Summary of setPassword
     * @param string $password
     * @return LoginDto
     */
    public function setPassword(string $password): static {
        $this->password = $password;

        return $this;
    }
}
