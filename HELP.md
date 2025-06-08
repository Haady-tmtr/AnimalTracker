# Framework Web 
# Université d'Orléans
# 2023-2024

Utilisation
-----------

1. Modifier les valeurs de USERNAME, NAME, EMAIL et UID dans
   compose.yml. UID et USERNAME doit correspondre au résultat de
   l'exécution de la commande `id` dans le système d'exploitation hôte. **ATTENTION** ces valeurs doivent être modifiée à deux endroits chacune. 

2. Lancer les conteneurs avec :

	`docker-compose up -d`
	
3. Connecter un terminal au conteneur contenant le back-end symfony avec 

	`docker exec -ti symfony_server /bin/bash`
		
4. Connecter un terminal au conteneur contenant le front-end angular avec

	`docker exec -ti angular_server /bin/bash`