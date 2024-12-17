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
    #[ORM\Column(length: 128)]
    private ?string $sectionName = null;

    #[ORM\Column(length: 512, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'noteSections')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Notebook $notebook = null;

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

    public function getSectionName(): ?string
    {
        return $this->sectionName;
    }

    public function setSectionName(string $sectionName): static
    {
        $this->sectionName = $sectionName;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getNotebook(): ?Notebook
    {
        return $this->notebook;
    }

    public function setNotebook(?Notebook $notebook): static
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

    public function addNotePage(NotePage $notePage): static
    {
        if (!$this->notePages->contains($notePage)) {
            $this->notePages->add($notePage);
            $notePage->setNotesection($this);
        }

        return $this;
    }

    public function removeNotePage(NotePage $notePage): static
    {
        if ($this->notePages->removeElement($notePage)) {
            // set the owning side to null (unless already changed)
            if ($notePage->getNotesection() === $this) {
                $notePage->setNotesection(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): static
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    public function removeTag(Tag $tag): static
    {
        $this->tags->removeElement($tag);

        return $this;
    }
}
