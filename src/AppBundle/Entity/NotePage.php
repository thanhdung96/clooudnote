<?php

namespace App\AppBundle\Entity;

use App\AppBundle\Repository\NotePageRepository;
use App\BaseBundle\Entity\DeletableEntity;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NotePageRepository::class)]
class NotePage extends DeletableEntity
{
    #[ORM\Column(length: 128)]
    private ?string $pageHeader = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $content = null;

    #[ORM\ManyToOne(inversedBy: 'notePages')]
    #[ORM\JoinColumn(nullable: false)]
    private ?NoteSection $notesection = null;

    public function getPageHeader(): ?string
    {
        return $this->pageHeader;
    }

    public function setPageHeader(string $pageHeader): static
    {
        $this->pageHeader = $pageHeader;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getNotesection(): ?NoteSection
    {
        return $this->notesection;
    }

    public function setNotesection(?NoteSection $notesection): static
    {
        $this->notesection = $notesection;

        return $this;
    }

    public function __construct()
    {
        parent::__construct();
    }
}
