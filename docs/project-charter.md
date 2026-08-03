# Charte du projet

## Mission

Circuit Partitioning doit devenir une référence web ouverte permettant de
comprendre, d'étudier et de comparer les méthodes de partitionnement de circuits
pour plateformes multi-FPGA, avec une attention particulière portée à la
dégradation du chemin critique et à la topologie cible.

Le portail réunit quatre usages aujourd'hui souvent séparés : apprentissage,
veille bibliographique, exploration de jeux de données et comparaison
reproductible d'algorithmes.

## Publics

### Étudiants et nouveaux lecteurs

Ils doivent pouvoir progresser depuis les graphes et hypergraphes jusqu'à la
formulation complète du problème, avec des exemples manipulables et sans devoir
connaître au préalable les outils de CAO électronique.

### Chercheurs

Ils doivent pouvoir identifier les hypothèses et fonctions objectif d'un travail,
trouver des instances adaptées, vérifier une partition et comparer plusieurs
méthodes sur un protocole commun.

### Développeurs d'algorithmes

Ils doivent disposer de formats stables, d'exemples minimaux, d'un validateur et
d'une procédure documentée pour publier des résultats reproductibles.

## Périmètre fonctionnel

Le projet couvre à terme :

- un cours progressif sur les graphes, hypergraphes, circuits synchrones,
  hypergraphes rouge-noir, partitions et schémas multiniveaux ;
- un état de l'art structuré, daté et citable ;
- un catalogue de circuits avec métadonnées, téléchargement et analyses ;
- un catalogue de partitions avec métriques recalculées ;
- un tableau de bord de benchmarks alimenté par CSV ;
- un explorateur visuel adapté aux petites et grandes instances ;
- une procédure de contribution et de reproduction des expériences ;
- à terme, l'exécution isolée d'analyses ou d'algorithmes autorisés.

## Hors périmètre initial

Le jalon 0 exclut explicitement :

- le développement de l'interface web ;
- l'hébergement et l'exécution de code utilisateur ;
- la redistribution de benchmarks dont la licence n'a pas été vérifiée ;
- la promesse d'une synchronisation automatique de toute la littérature ;
- la définition d'un classement scalaire universel entre algorithmes
  multiobjectifs.

## Langues

L'interface et le contenu pédagogique visent le français et l'anglais. Les
identifiants, noms de champs et API sont en anglais. Les termes scientifiques
doivent être accompagnés de leur équivalent lors de leur première apparition.
Une page non encore traduite peut être publiée si sa langue est clairement
indiquée ; une traduction obsolète ne doit jamais masquer une version source plus
récente.

## Principes éditoriaux et scientifiques

- Une affirmation bibliographique importante référence une source primaire.
- Une fiche d'état de l'art indique sa date de dernière vérification.
- Une donnée dérivée est distinguée d'une donnée fournie par son auteur.
- Une métrique calculée précise sa version de définition et son unité.
- Une expérience conserve algorithme, version, paramètres, graine et environnement.
- Un artefact redistribué indique sa licence et son origine.
- Les résultats multiobjectifs sont présentés avec leurs compromis, notamment via
  des fronts de Pareto, et non par un score arbitraire implicite.

## Critères de réussite

### Fin du jalon 0

- un circuit, une topologie, une partition et une exécution de benchmark peuvent
  être décrits sans ambiguïté ;
- des exemples minimaux passent les validations structurelles et sémantiques ;
- les choix d'architecture et les questions encore ouvertes sont visibles ;
- le périmètre de chaque jalon suivant possède des critères de sortie.

### Première version publique utile

- un lecteur termine un parcours pédagogique introductif ;
- au moins une famille de circuits est publiée légalement ;
- les statistiques principales sont recalculées par le moteur ;
- les artefacts publiés sont téléchargeables et citables.

### Version communautaire

- une contribution externe peut être validée et intégrée ;
- une expérience publiée peut être reproduite à partir de sa fiche ;
- les modifications de contrats de données suivent une politique de version claire.

## Risques principaux

| Risque | Réponse prévue |
| --- | --- |
| Licences hétérogènes des circuits | Registre de provenance et blocage de redistribution par défaut |
| Graphes trop grands pour le navigateur | Agrégation, sous-graphes, calcul hors thread et pré-calculs |
| Définitions de métriques divergentes | Versionner les conventions et recalculer côté moteur |
| Résultats CSV incomplets | Schéma strict, statut d'exécution et liens vers les artefacts |
| État de l'art rapidement obsolète | Date de revue, propriétaires éditoriaux et historique Git |
| Formats prématurément figés | Version `1.0.0-draft.1` pendant le jalon 0, stabilisation par PR |

