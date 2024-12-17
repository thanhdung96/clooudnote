<?php

namespace App\AppBundle\Entity;

use App\AppBundle\Repository\NotebookRepository;
use App\BaseBundle\Entity\DeletableEntity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NotebookRepository::class)]
class Notebook extends DeletableEntity
{
    #[ORM\Column(length: 128)]
    private ?string $title = null;

    #[ORM\Column(length: 512, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'notebooks')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    /**
     * @var Collection<int, NoteSection>
     */
    #[ORM\OneToMany(targetEntity: NoteSection::class, mappedBy: 'notebook', orphanRemoval: true)]
    private Collection $noteSections;

    /**
     * @var Collection<int, Tag>
     */
    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'notebooks')]
    private Collection $tags;

    public function __construct()
    {
        parent::__construct();

        $this->noteSections = new ArrayCollection();
        $this->tags = new ArrayCollection();

        $noteSection = new NoteSection();
        $this->addNoteSection($noteSection);
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, NoteSection>
     */
    public function getNoteSections(): Collection
    {
        return $this->noteSections;
    }

    public function addNoteSection(NoteSection $noteSection): static
    {
        if (!$this->noteSections->contains($noteSection)) {
            $this->noteSections->add($noteSection);
            $noteSection->setNotebook($this);
        }

        return $this;
    }

    public function removeNoteSection(NoteSection $noteSection): static
    {
        if ($this->noteSections->removeElement($noteSection)) {
            // set the owning side to null (unless already changed)
            if ($noteSection->getNotebook() === $this) {
                $noteSection->setNotebook(null);
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
