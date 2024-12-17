<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241224035642 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE note_page (id VARCHAR(36) NOT NULL, notesection_id VARCHAR(36) NOT NULL, created DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', modified DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', page_header VARCHAR(128) NOT NULL, content LONGTEXT NOT NULL, INDEX IDX_B470A7788218A7F8 (notesection_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE note_section (id VARCHAR(36) NOT NULL, notebook_id VARCHAR(36) NOT NULL, created DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', modified DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', section_name VARCHAR(128) NOT NULL, description VARCHAR(512) DEFAULT NULL, INDEX IDX_ACD5BE75F74303D6 (notebook_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE note_section_tag (note_section_id VARCHAR(36) NOT NULL, tag_id VARCHAR(36) NOT NULL, INDEX IDX_FEECF354B884CA4A (note_section_id), INDEX IDX_FEECF354BAD26311 (tag_id), PRIMARY KEY(note_section_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notebook (id VARCHAR(36) NOT NULL, user_id VARCHAR(36) NOT NULL, created DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', modified DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', title VARCHAR(128) NOT NULL, description VARCHAR(512) DEFAULT NULL, INDEX IDX_F67D9A2BA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notebook_tag (notebook_id VARCHAR(36) NOT NULL, tag_id VARCHAR(36) NOT NULL, INDEX IDX_71AEBF2F74303D6 (notebook_id), INDEX IDX_71AEBF2BAD26311 (tag_id), PRIMARY KEY(notebook_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tag (id VARCHAR(36) NOT NULL, created DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', modified DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', name VARCHAR(32) NOT NULL, description VARCHAR(128) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id VARCHAR(36) NOT NULL, created DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', modified DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE note_page ADD CONSTRAINT FK_B470A7788218A7F8 FOREIGN KEY (notesection_id) REFERENCES note_section (id)');
        $this->addSql('ALTER TABLE note_section ADD CONSTRAINT FK_ACD5BE75F74303D6 FOREIGN KEY (notebook_id) REFERENCES notebook (id)');
        $this->addSql('ALTER TABLE note_section_tag ADD CONSTRAINT FK_FEECF354B884CA4A FOREIGN KEY (note_section_id) REFERENCES note_section (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE note_section_tag ADD CONSTRAINT FK_FEECF354BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE notebook ADD CONSTRAINT FK_F67D9A2BA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE notebook_tag ADD CONSTRAINT FK_71AEBF2F74303D6 FOREIGN KEY (notebook_id) REFERENCES notebook (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE notebook_tag ADD CONSTRAINT FK_71AEBF2BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE note_page DROP FOREIGN KEY FK_B470A7788218A7F8');
        $this->addSql('ALTER TABLE note_section DROP FOREIGN KEY FK_ACD5BE75F74303D6');
        $this->addSql('ALTER TABLE note_section_tag DROP FOREIGN KEY FK_FEECF354B884CA4A');
        $this->addSql('ALTER TABLE note_section_tag DROP FOREIGN KEY FK_FEECF354BAD26311');
        $this->addSql('ALTER TABLE notebook DROP FOREIGN KEY FK_F67D9A2BA76ED395');
        $this->addSql('ALTER TABLE notebook_tag DROP FOREIGN KEY FK_71AEBF2F74303D6');
        $this->addSql('ALTER TABLE notebook_tag DROP FOREIGN KEY FK_71AEBF2BAD26311');
        $this->addSql('DROP TABLE note_page');
        $this->addSql('DROP TABLE note_section');
        $this->addSql('DROP TABLE note_section_tag');
        $this->addSql('DROP TABLE notebook');
        $this->addSql('DROP TABLE notebook_tag');
        $this->addSql('DROP TABLE tag');
        $this->addSql('DROP TABLE `user`');
    }
}
