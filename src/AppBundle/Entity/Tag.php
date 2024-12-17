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
    #[ORM\Column(length: 32)]
    private ?string $name = null;

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

    public function __construct()
    {
        parent::__construct();

        $this->notebooks = new ArrayCollection();
        $this->noteSections = new ArrayCollection();
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

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

    /**
     * @return Collection<int, Notebook>
     */
    public function getNotebooks(): Collection
    {
        return $this->notebooks;
    }

    public function addNotebook(Notebook $notebook): static
    {
        if (!$this->notebooks->contains($notebook)) {
            $this->notebooks->add($notebook);
            $notebook->addTag($this);
        }

        return $this;
    }

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

    public function addNoteSection(NoteSection $noteSection): static
    {
        if (!$this->noteSections->contains($noteSection)) {
            $this->noteSections->add($noteSection);
            $noteSection->addTag($this);
        }

        return $this;
    }

    public function removeNoteSection(NoteSection $noteSection): static
    {
        if ($this->noteSections->removeElement($noteSection)) {
            $noteSection->removeTag($this);
        }

        return $this;
    }
}
