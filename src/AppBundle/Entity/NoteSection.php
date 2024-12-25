<?php

namespace App\AppBundle\Entity;

use App\AppBundle\Repository\NoteSectionRepository;
use App\BaseBundle\Entity\DeletableEntity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NoteSectionRepository::class)]
class NoteSection extends DeletableEntity
{
    #[ORM\Column(length: 128, nullable: false)]
    private string $sectionName;

    #[ORM\Column(length: 512, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'noteSections')]
    #[ORM\JoinColumn(nullable: false)]
    private Notebook $notebook;

    /**
     * @var Collection<int, NotePage>
     */
    #[ORM\OneToMany(targetEntity: NotePage::class, mappedBy: 'notesection', orphanRemoval: true)]
    private Collection $notePages;

    /**
     * @var Collection<int, Tag>
     */
    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'noteSections')]
    private Collection $tags;

    public function __construct()
    {
        parent::__construct();

        $this->notePages = new ArrayCollection();
        $this->tags = new ArrayCollection();

        $notePage = new NotePage();
        $this->addNotePage($notePage);
    }

    /**
     * Summary of getSectionName
     * @return string
     */
    public function getSectionName(): string
    {
        return $this->sectionName;
    }

    /**
     * Summary of setSectionName
     * @param string $sectionName
     * @return NoteSection
     */
    public function setSectionName(string $sectionName): static
    {
        $this->sectionName = $sectionName;

        return $this;
    }

    /**
     * Summary of getDescription
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * Summary of setDescription
     * @param mixed $description
     * @return NoteSection
     */
    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Summary of getNotebook
     * @return Notebook
     */
    public function getNotebook(): Notebook
    {
        return $this->notebook;
    }

    /**
     * Summary of setNotebook
     * @param Notebook $notebook
     * @return NoteSection
     */
    public function setNotebook(Notebook $notebook): static
    {
        $this->notebook = $notebook;

        return $this;
    }

    /**
     * @return Collection<int, NotePage>
     */
    public function getNotePages(): Collection
    {
        return $this->notePages;
    }

    /**
     * Summary of addNotePage
     * @param NotePage $notePage
     * @return NoteSection
     */
    public function addNotePage(NotePage $notePage): static
    {
        if (!$this->notePages->contains($notePage)) {
            $this->notePages->add($notePage);
            $notePage->setNotesection($this);
        }

        return $this;
    }

    /**
     * Summary of removeNotePage
     * @param NotePage $notePage
     * @return NoteSection
     */
    public function removeNotePage(NotePage $notePage): static
    {
        $this->notePages->removeElement($notePage);

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    /**
     * Summary of addTag
     * @param Tag $tag
     * @return NoteSection
     */
    public function addTag(Tag $tag): static
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    /**
     * Summary of removeTag
     * @param Tag $tag
     * @return NoteSection
     */
    public function removeTag(Tag $tag): static
    {
        $this->tags->removeElement($tag);

        return $this;
    }
}
