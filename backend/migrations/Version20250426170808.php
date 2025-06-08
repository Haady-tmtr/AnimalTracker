<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250426170808 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE animal (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom_commun VARCHAR(255) NOT NULL, nom_savant VARCHAR(255) NOT NULL, embranchement VARCHAR(255) NOT NULL, classe VARCHAR(255) NOT NULL, ordre VARCHAR(255) NOT NULL, sous_ordre VARCHAR(255) NOT NULL, famille VARCHAR(255) NOT NULL, genre VARCHAR(255) NOT NULL, statut_iucn VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE observation (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, animal_id INTEGER DEFAULT NULL, date DATETIME NOT NULL, longitude DOUBLE PRECISION NOT NULL, latitude DOUBLE PRECISION NOT NULL, description CLOB NOT NULL, CONSTRAINT FK_C576DBE08E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id) NOT DEFERRABLE INITIALLY IMMEDIATE)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_C576DBE08E962C16 ON observation (animal_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP TABLE animal
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE observation
        SQL);
    }
}
