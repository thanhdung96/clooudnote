<?php

namespace App\AppBundle\Entity;

use App\AppBundle\Repository\NotePageRepository;
use App\BaseBundle\Entity\DeletableEntity;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NotePageRepository::class)]
class NotePage extends DeletableEntity
{
    #[ORM\Column(length: 128, nullable: false)]
    private string $pageHeader;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $content = null;

    #[ORM\ManyToOne(inversedBy: 'notePages')]
    #[ORM\JoinColumn(nullable: false)]
    private NoteSection $notesection;

    /**
     * Summary of getPageHeader
     * @return string
     */
    public function getPageHeader(): string
    {
        return $this->pageHeader;
    }

    /**
     * Summary of setPageHeader
     * @param string $pageHeader
     * @return NotePage
     */
    public function setPageHeader(string $pageHeader): static
    {
        $this->pageHeader = $pageHeader;

        return $this;
    }

    /**
     * Summary of getContent
     * @return string|null
     */
    public function getContent(): ?string
    {
        return $this->content;
    }

    /**
     * Summary of setContent
     * @param string $content
     * @return NotePage
     */
    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Summary of getNotesection
     * @return NoteSection
     */
    public function getNotesection(): NoteSection
    {
        return $this->notesection;
    }

    /**
     * Summary of setNotesection
     * @param NoteSection $notesection
     * @return NotePage
     */
    public function setNotesection(NoteSection $notesection): static
    {
        $this->notesection = $notesection;

        return $this;
    }

    public function __construct()
    {
        parent::__construct();
    }
}
