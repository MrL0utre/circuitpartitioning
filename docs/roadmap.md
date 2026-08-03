# Feuille de route

La durée est indicative et suppose une petite équipe. Chaque jalon se termine par
une pull request revue et une démonstration de ses critères de sortie.

## Jalon 0 - Foundations

**But :** rendre le projet et ses données non ambigus avant le développement web.

Livrables :

- charte, publics, périmètre et critères de réussite ;
- architecture de référence et journal ADR ;
- conventions scientifiques versionnées ;
- contrats de circuit, topologie, partition et exécution ;
- exemples minimaux et validation automatisée ;
- gouvernance des contributions et backlog des jalons suivants.

Critère de sortie : tous les exemples passent les validations et une revue peut
répondre précisément à « quelle donnée fait autorité ? » pour chaque objet.

## Jalon 1 - Socle web

**But :** fournir un site navigable et déployable.

- framework, design system, navigation et internationalisation ;
- rendu Markdown/MDX, formules et références ;
- recherche initiale ;
- accessibilité, tests et prévisualisation des pull requests.

Critère de sortie : accueil et pages documentaires sont utilisables en français
et en anglais sur mobile et ordinateur.

## Jalon 2 - Cours interactif

**But :** conduire un nouveau lecteur jusqu'à la formulation du problème.

- graphes et hypergraphes ;
- modèle rouge-noir et chemins rouge-rouge ;
- partitions, coupe, capacité et topologie ;
- schéma multiniveau ;
- petits exercices et visualisations manipulables.

Critère de sortie : le lecteur peut expliquer pourquoi minimiser uniquement la
coupe peut dégrader la fréquence du prototype.

## Jalon 3 - Catalogue de circuits

**But :** publier légalement une première famille de circuits analysables.

- parseur du format rouge-noir ;
- moteur de statistiques et chemin critique ;
- catalogue filtrable et pages de détail ;
- téléchargements, licences, citations et empreintes ;
- stratégie de visualisation agrégée pour les grandes instances.

Critère de sortie : au moins un petit et un grand circuit sont ingérés par le même
pipeline et leurs statistiques sont reproductibles.

## Jalon 4 - Partitions et topologies

**But :** analyser et comparer des partitions valides.

- catalogue de topologies ;
- validation des affectations et capacités ;
- calcul de la coupe, connectivité, frontière et chemin critique partitionné ;
- vues avant/après et comparaison de deux partitions.

Critère de sortie : toutes les métriques d'une partition publiée sont recalculées
depuis ses artefacts.

## Jalon 5 - Explorateur visuel

**But :** inspecter un circuit ou une partition sans supposer un graphe petit.

- coloration rouge-noir, par partie et par criticalité ;
- chemin critique et hyperarcs coupés ;
- sous-graphes centrés sur une sélection ;
- agrégation, niveaux de détail et calcul hors du thread d'interface.

Critère de sortie : l'explorateur reste réactif sur les tailles représentatives du
catalogue grâce aux vues agrégées.

## Jalon 6 - Benchmark CSV

**But :** comparer des exécutions multiobjectifs reproductibles.

- import strict du format CSV ;
- tables, filtres, distributions et intervalles ;
- fronts de Pareto chemin critique / coupe / temps ;
- liens de chaque ligne vers ses artefacts ;
- export de la sélection courante.

Critère de sortie : une figure affichée peut être reproduite depuis un export et
les artefacts référencés.

## Jalon 7 - État de l'art vivant

**But :** structurer et maintenir la littérature au-delà de la thèse de 2024.

- taxonomie des objectifs, modèles et phases algorithmiques ;
- fiches d'outils et de publications ;
- matrice comparative ;
- export BibTeX ;
- processus semestriel de revue.

Critère de sortie : chaque entrée indique source primaire, date de vérification,
disponibilité du code et reproductibilité.

## Jalon 8 - Contributions communautaires

**But :** intégrer une contribution externe auditable.

- modèles de soumission ;
- contrôle des licences et de la provenance ;
- validation automatique et recalcul des métriques ;
- fiches de reproductibilité et versions citables.

Critère de sortie : une contribution externe complète est intégrée sans opération
manuelle non documentée.

## Jalon 9 - Laboratoire en ligne

**But :** exécuter des analyses et partitionneurs autorisés sur des instances
contrôlées.

- file de travaux, quotas et isolation ;
- sélection du circuit, de la topologie et de l'algorithme ;
- progression, résultats et téléchargement ;
- intégration initiale de RaiSin ou d'un moteur de référence.

Critère de sortie : une exécution en ligne produit une fiche reproductible sans
mettre en danger les données ou l'infrastructure.

## Versions publiques proposées

| Version | Jalons | Promesse |
| --- | --- | --- |
| `0.1` | 0 à 2 | Comprendre le problème |
| `0.5` | 3 à 7 | Explorer et comparer les données scientifiques |
| `1.0` | 8 à 9 | Contribuer et reproduire des expériences |

## Dépendances critiques

- Le jalon 3 dépend de la stabilisation du format de circuit au jalon 0.
- Le jalon 4 dépend du moteur du jalon 3 et des topologies du jalon 0.
- Le jalon 6 dépend des identifiants stables des jalons 3 et 4.
- Le jalon 8 dépend de validations suffisamment robustes aux données non fiables.
- Le jalon 9 ne commence qu'après définition d'un modèle de menace et de quotas.

