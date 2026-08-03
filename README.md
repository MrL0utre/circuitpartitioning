# Circuit Partitioning

Portail scientifique consacré au partitionnement de circuits numériques pour les
plateformes multi-FPGA. Le projet s'appuie initialement sur la thèse de Julien
Rodriguez, *Circuit partitioning for multi-FPGA platforms* (Université de
Bordeaux, 2024), et a vocation à devenir une ressource pédagogique et
expérimentale ouverte à la communauté.

Le site doit permettre de :

- apprendre les fondements du partitionnement de graphes et d'hypergraphes ;
- suivre l'état de l'art et comparer les objectifs des méthodes publiées ;
- explorer des circuits modélisés par des hypergraphes rouge-noir ;
- analyser et comparer des partitions sur différentes topologies multi-FPGA ;
- consulter des benchmarks reproductibles importés depuis des données tabulaires ;
- télécharger les jeux de données, partitions et métadonnées associés.

## État du projet

Le dépôt se trouve au **jalon 0 - Foundations**. Ce jalon ne développe pas encore
l'application web : il fixe le périmètre, l'architecture, les conventions
scientifiques et les contrats de données nécessaires pour la construire sans
ambiguïté.

| Ressource | Description |
| --- | --- |
| [Charte du projet](docs/project-charter.md) | Vision, publics, périmètre et critères de réussite |
| [Architecture](docs/architecture.md) | Composants, responsabilités et décisions structurantes |
| [Conventions scientifiques](docs/scientific-conventions.md) | Modèle rouge-noir, chemins, partitions et métriques |
| [Modèle de données](docs/data-model.md) | Identifiants, versions, artefacts et relations |
| [Feuille de route](docs/roadmap.md) | Jalons, dépendances et définition du MVP |
| [ADR](docs/adr/README.md) | Journal des décisions d'architecture |
| [Schémas](schemas/README.md) | Contrats JSON Schema et format CSV |

## Organisation cible

```text
content/       contenu pédagogique et état de l'art
docs/          cadrage, architecture, conventions et décisions
examples/      petits artefacts de référence validés
schemas/       contrats de données versionnés
scripts/       outils de validation et d'import
web/           application web (jalon 1)
engine/        analyse scientifique indépendante (jalon 3)
```

Les dossiers cibles ne sont créés que lorsqu'ils contiennent un artefact utile.

## Principes

1. **Traçabilité** : chaque circuit, partition et résultat possède une provenance,
   une version et une empreinte de contenu.
2. **Reproductibilité** : une métrique publiée doit pouvoir être recalculée à
   partir des artefacts référencés.
3. **Séparation des responsabilités** : le site présente les données ; un moteur
   indépendant les analyse ; les schémas constituent leur contrat commun.
4. **Passage à l'échelle** : l'expérience reste utilisable pour quelques sommets
   comme pour des circuits de plus d'un million de sommets.
5. **Ouverture** : formats documentés, contenu citable et contributions revues.

## Référence fondatrice

Julien Rodriguez, *Circuit partitioning for multi-FPGA platforms*, thèse de
doctorat, Université de Bordeaux, 2024. HAL :
[tel-04731886](https://theses.hal.science/tel-04731886).

## Développement

Les changements passent par une branche dédiée et une pull request vers `main`.
Les conventions de contribution et les commandes de validation sont décrites
dans [CONTRIBUTING.md](CONTRIBUTING.md).
