<?php
namespace App\Doctrine;

use ApiPlatform\Core\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;
use App\Entity\Observation;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct(private Security $security) {}

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        if ($resourceClass !== Observation::class) {
            return;
        }

        $user = $this->security->getUser();

        if ($user) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder
                ->andWhere(sprintf('%s.user = :current_user', $rootAlias))
                ->setParameter('current_user', $user);
        } else {
            // Si pas connecté ➔ interdiction de voir quoi que ce soit
            $queryBuilder
                ->andWhere('1 = 0');
        }
    }
}