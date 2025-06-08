<?php

namespace App\DataFixtures;

use App\Entity\Animal;
use App\Entity\Observation;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        // Récupérer tous les utilisateurs existants
        $users = $manager->getRepository(User::class)->findAll();

        $animauxData = [
            ['Renard roux', 'Vulpes vulpes', 'Chordata', 'Mammalia', 'Carnivora', 'Caniformia', 'Canidae', 'Vulpes', 'LC', 'Canidé rusé, très répandu.'],
            ['Loup gris', 'Canis lupus', 'Chordata', 'Mammalia', 'Carnivora', 'Caniformia', 'Canidae', 'Canis', 'LC', 'Vivant en meute, carnivore.'],
            ['Hérisson commun', 'Erinaceus europaeus', 'Chordata', 'Mammalia', 'Eulipotyphla', '', 'Erinaceidae', 'Erinaceus', 'LC', 'Petit mammifère nocturne.'],
            ['Chouette hulotte', 'Strix aluco', 'Chordata', 'Aves', 'Strigiformes', '', 'Strigidae', 'Strix', 'LC', 'Rapace nocturne.'],
            ['Lynx boréal', 'Lynx lynx', 'Chordata', 'Mammalia', 'Carnivora', 'Feliformia', 'Felidae', 'Lynx', 'LC', 'Félin discret des forêts.'],
            ['Sanglier', 'Sus scrofa', 'Chordata', 'Mammalia', 'Artiodactyla', '', 'Suidae', 'Sus', 'LC', 'Omnivore, vit en groupe.'],
            ['Cerf élaphe', 'Cervus elaphus', 'Chordata', 'Mammalia', 'Artiodactyla', '', 'Cervidae', 'Cervus', 'LC', 'Grand cervidé des forêts.'],
            ['Blongios nain', 'Ixobrychus minutus', 'Chordata', 'Aves', 'Pelecaniformes', '', 'Ardeidae', 'Ixobrychus', 'LC', 'Petit héron farouche.'],
            ['Vipère aspic', 'Vipera aspis', 'Chordata', 'Reptilia', 'Squamata', '', 'Viperidae', 'Vipera', 'LC', 'Serpent venimeux d’Europe.'],
            ['Milan royal', 'Milvus milvus', 'Chordata', 'Aves', 'Accipitriformes', '', 'Accipitridae', 'Milvus', 'NT', 'Rapace planeur, en danger localement.']
        ];

        // Création des animaux
        foreach ($animauxData as $index => [$nom, $savant, $embr, $classe, $ordre, $sousOrdre, $famille, $genre, $iucn, $desc]) {
            $animal = new Animal();
            $animal->setNomCommun($nom)
                ->setNomSavant($savant)
                ->setEmbranchement($embr)
                ->setClasse($classe)
                ->setOrdre($ordre)
                ->setSousOrdre($sousOrdre)
                ->setFamille($famille)
                ->setGenre($genre)
                ->setStatutIUCN($iucn)
                ->setDescription($desc);

            $manager->persist($animal);
            $this->addReference("animal_$index", $animal);  
        }

        // Création des observations
        for ($i = 0; $i < 50; $i++) {
            $observation = new Observation();
            $observation->setDate($faker->dateTimeBetween('-2 years', 'now'))
                ->setLatitude($faker->latitude)
                ->setLongitude($faker->longitude)
                ->setDescription($faker->sentence(10));

            // Répartition non équilibrée des animaux
            $bias = [0, 0, 0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            $animalRef = 'animal_' . $faker->randomElement($bias);
            $observation->setAnimal($this->getReference($animalRef, Animal::class));  

            // Association d'un utilisateur aléatoire à l'observation
            if (count($users) > 0) {
                $userRef = $faker->randomElement($users);
                $observation->setUser($userRef);  // Ici, on associe un utilisateur à l'observation
            }

            $manager->persist($observation);
        }

        $manager->flush();
    }
}
