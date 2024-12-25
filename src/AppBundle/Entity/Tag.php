<?php

namespace App\AppBundle\Entity;

use App\AppBundle\Repository\TagRepository;
use App\BaseBundle\Entity\DeletableEntity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TagRepository::class)]
class Tag extends DeletableEntity
{
    #[ORM\Column(length: 32, nullable: true)]
    private string $name;

    #[ORM\Column(length: 128, nullable: true)]
    private ?string $description = null;

    /**
     * @var Collection<int, Notebook>
     */
    #[ORM\ManyToMany(targetEntity: Notebook::class, mappedBy: 'tags')]
    private Collection $notebooks;

    /**
     * @var Collection<int, NoteSection>
     */
    #[ORM\ManyToMany(targetEntity: NoteSection::class, mappedBy: 'tags')]
    private Collection $noteSections;

    #[ORM\ManyToOne(inversedBy: 'tags')]
    #[ORM\JoinColumn(nullable: false)]
    private User $user;

    public function __construct()
    {
        parent::__construct();

        $this->notebooks = new ArrayCollection();
        $this->noteSections = new ArrayCollection();
    }

    /**
     * Summary of getName
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Summary of setName
     * @param string $name
     * @return Tag
     */
    public function setName(string $name): static
    {
        $this->name = $name;

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
     * @return Tag
     */
    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Notebook>
     */
    public function getNotebooks(): Collection
    {
        return $this->notebooks;
    }

    /**
     * Summary of addNotebook
     * @param Notebook $notebook
     * @return Tag
     */
    public function addNotebook(Notebook $notebook): static
    {
        if (!$this->notebooks->contains($notebook)) {
            $this->notebooks->add($notebook);
            $notebook->addTag($this);
        }

        return $this;
    }

    /**
     * Summary of removeNotebook
     * @param Notebook $notebook
     * @return Tag
     */
    public function removeNotebook(Notebook $notebook): static
    {
        if ($this->notebooks->removeElement($notebook)) {
            $notebook->removeTag($this);
        }

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
     * @return Tag
     */
    public function addNoteSection(NoteSection $noteSection): static
    {
        if (!$this->noteSections->contains($noteSection)) {
            $this->noteSections->add($noteSection);
            $noteSection->addTag($this);
        }

        return $this;
    }

    /**
     * Summary of removeNoteSection
     * @param NoteSection $noteSection
     * @return Tag
     */
    public function removeNoteSection(NoteSection $noteSection): static
    {
        if ($this->noteSections->removeElement($noteSection)) {
            $noteSection->removeTag($this);
        }

        return $this;
    }

    /**
     * Summary of getUser
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * Summary of setUser
     * @param User $user
     * @return Tag
     */
    public function setUser(User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
