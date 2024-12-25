<?php

namespace App\ApiBundle\Dto\Security;

final class LoginDto {
    
    private string $email;
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
