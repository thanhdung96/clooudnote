<?php

namespace App\BaseBundle\Entity;

use App\BaseBundle\Repository\BaseRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\MappedSuperclass(repositoryClass: BaseRepository::class)]
#[ORM\HasLifecycleCallbacks]
abstract class BaseEntity {
    #[ORM\Id]
    #[ORM\Column(
        name: 'id',
        type: Types::STRING,
        length: 36
    )]
    private string $id;

    #[ORM\Column]
    private DateTimeImmutable $created;

    #[ORM\Column]
    private DateTimeImmutable $modified;

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return DateTimeImmutable
     */
    public function getCreated(): DateTimeImmutable
    {
        return $this->created;
    }

    /**
     * @param DateTimeImmutable $created
     * @return BaseEntity
     */
    public function setCreated(DateTimeImmutable $created): BaseEntity
    {
        $this->created = $created;

        return $this;
    }

    /**
     * @return DateTimeImmutable
     */
    public function getModified(): DateTimeImmutable
    {
        return $this->modified;
    }

    /**
     * @param DateTimeImmutable $modified
     * @return BaseEntity
     */
    public function setModified(DateTimeImmutable $modified): BaseEntity
    {
        $this->modified = $modified;

        return $this;
    }

    public function __construct()
    {
        $this->id = Uuid::v7()->toString();

        $currentTime = new DateTimeImmutable();
        $this->created = $currentTime;
        $this->modified = $currentTime;
    }

    #[ORM\PrePersist]
    public function prePersis(): void
    {
        $this->modified = new DateTimeImmutable();
    }
}
