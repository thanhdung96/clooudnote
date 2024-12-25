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
    #[ORM\Column(length: 128, nullable: false)]
    private string $title;

    #[ORM\Column(length: 512, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'notebooks')]
    #[ORM\JoinColumn(nullable: false)]
    private User $user;

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

    /**
     * Summary of getTitle
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * Summary of setTitle
     * @param string $title
     * @return Notebook
     */
    public function setTitle(string $title): static
    {
        $this->title = $title;

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
     * @return Notebook
     */
    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Summary of getUser
     * @return User|null
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * Summary of setUser
     * @param User $user
     * @return Notebook
     */
    public function setUser(User $user): static
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

    /**
     * Summary of addNoteSection
     * @param NoteSection $noteSection
     * @return Notebook
     */
    public function addNoteSection(NoteSection $noteSection): static
    {
        if (!$this->noteSections->contains($noteSection)) {
            $this->noteSections->add($noteSection);
            $noteSection->setNotebook($this);
        }

        return $this;
    }

    /**
     * Summary of removeNoteSection
     * @param NoteSection $noteSection
     * @return Notebook|null
     */
    public function removeNoteSection(NoteSection $noteSection): static
    {
        $this->noteSections->removeElement($noteSection);

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
     * @return Notebook
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
     * @return Notebook
     */
    public function removeTag(Tag $tag): static
    {
        $this->tags->removeElement($tag);

        return $this;
    }
}
