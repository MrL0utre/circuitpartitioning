# Backlog de développement

Ce backlog transforme la feuille de route en lots indépendants et vérifiables. Il
ne remplace pas les issues : il fournit leur découpage initial et leurs critères
d'acceptation. Les priorités sont `P0` (bloquant), `P1` (important) et `P2`
(amélioration).

## Jalon 0 - Foundations

| ID | Priorité | Lot | État |
| --- | --- | --- | --- |
| FND-001 | P0 | Charte, publics et périmètre | terminé |
| FND-002 | P0 | Architecture et décisions structurantes | terminé |
| FND-003 | P0 | Conventions scientifiques | terminé |
| FND-004 | P0 | Schémas circuit, topologie, partition et exécution | terminé |
| FND-005 | P0 | Exemple de référence et métriques vérifiables | terminé |
| FND-006 | P0 | Validation sémantique et CI | terminé |
| FND-007 | P1 | Workflow de contribution et modèles GitHub | terminé |

La stabilisation des contrats de `1.0.0-draft.1` vers `1.0.0` reste conditionnée
par l'import d'au moins un circuit réel. Elle appartient donc au jalon 3.

## Jalon 1 - Socle web

### WEB-001 - Choisir le socle applicatif

- Priorité : P0
- Dépendances : FND-002
- Livrable : ADR comparant les options sur rendu MDX, i18n, déploiement, recherche
  et visualisation.
- Acceptation : la décision comporte un prototype de page avec formule et contenu
  bilingue ; les alternatives et coûts de migration sont documentés.

### WEB-002 - Initialiser l'application et la qualité

- Priorité : P0
- Dépendances : WEB-001
- Livrable : application TypeScript, formatage, lint, tests et build en CI.
- Acceptation : un clone neuf peut installer, tester et construire le site avec
  les commandes du README ; la CI bloque une régression.

### WEB-003 - Créer la navigation et le design system

- Priorité : P0
- Dépendances : WEB-002
- Livrable : en-tête, pied de page, navigation principale, typographie, couleurs
  scientifiques et composants de base.
- Acceptation : navigation clavier complète, contrastes WCAG 2.2 AA et affichage
  mobile sans débordement.

### WEB-004 - Internationaliser routes et contenu

- Priorité : P0
- Dépendances : WEB-002
- Livrable : routes françaises et anglaises, sélecteur de langue, fallback explicite.
- Acceptation : aucune langue manquante n'affiche silencieusement un contenu
  obsolète ; les URL canoniques et alternatives sont exposées.

### WEB-005 - Rendre le contenu scientifique

- Priorité : P0
- Dépendances : WEB-002
- Livrable : MDX contrôlé, formules, figures, pseudo-codes, notes et bibliographie.
- Acceptation : une page de démonstration reprend correctement `f_c`, `f_lambda`
  et `f_p`, avec alternative accessible aux figures.

### WEB-006 - Ajouter recherche et métadonnées

- Priorité : P1
- Dépendances : WEB-004, WEB-005
- Livrable : index du contenu, recherche clavier, métadonnées sociales et citations.
- Acceptation : une recherche retrouve les termes français et anglais ainsi que
  leurs synonymes définis dans le glossaire.

### WEB-007 - Déployer les aperçus de pull request

- Priorité : P1
- Dépendances : WEB-002
- Livrable : environnement de préproduction et procédure de promotion.
- Acceptation : chaque PR applicative reçoit une URL éphémère ; aucun secret n'est
  exposé au code provenant d'une contribution non approuvée.

## Jalon 2 - Cours interactif

| ID | Priorité | Lot | Acceptation synthétique |
| --- | --- | --- | --- |
| EDU-001 | P0 | Plan du cours et objectifs pédagogiques | progression et prérequis revus |
| EDU-002 | P0 | Graphes et hypergraphes | exemples, définitions et exercices corrigés |
| EDU-003 | P0 | Circuits et modèle rouge-noir | chemins rouge-rouge manipulables |
| EDU-004 | P0 | Partitions et métriques | effets d'un déplacement recalculés en direct |
| EDU-005 | P1 | Topologies multi-FPGA | comparaison de coûts uniformes et non uniformes |
| EDU-006 | P1 | Schéma multiniveau | contraction, initialisation et raffinement visualisés |
| EDU-007 | P1 | Glossaire bilingue | termes reliés au contenu et recherchables |
| EDU-008 | P2 | Auto-évaluation | progression locale sans collecte de données personnelle |

Chaque chapitre doit citer ses sources, annoncer ses objectifs, offrir un exemple
minimal et être testé auprès d'au moins un lecteur ne travaillant pas déjà sur le
partitionnement.

## Jalon 3 - Catalogue et moteur de circuits

### ENG-001 - Définir l'API interne du moteur

- Priorité : P0
- Dépendances : FND-003, FND-004
- Acceptation : chargement et analyse fonctionnent depuis une bibliothèque et une
  CLI sans dépendre du framework web.

### ENG-002 - Parser le JSON rouge-noir

- Priorité : P0
- Dépendances : ENG-001
- Acceptation : erreurs localisées, limites configurables et conformité avec les
  validations du jalon 0.

### ENG-003 - Parser le format rouge-noir dérivé de `hygr`

- Priorité : P0
- Dépendances : ENG-001
- Acceptation : spécification normative, tests de cas limites et conversion sans
  perte vers le modèle interne.

### ENG-004 - Calculer les statistiques structurelles

- Priorité : P0
- Dépendances : ENG-002
- Acceptation : comptages, degrés, connectivité et composantes sont comparés à des
  résultats calculables à la main.

### ENG-005 - Calculer le chemin critique

- Priorité : P0
- Dépendances : ENG-002
- Acceptation : implémentation topologique testée sur plusieurs DAH, cycles via
  sommets rouges, délais de sommets et délais de connexions.

### DATA-001 - Auditer les licences des benchmarks

- Priorité : P0
- Dépendances : aucune
- Acceptation : ITC99, Titan, Chipyard et circuits neuronaux possèdent chacun une
  décision `redistribuable`, `liens uniquement` ou `non publiable`, avec preuve.

### DATA-002 - Importer une première famille

- Priorité : P0
- Dépendances : DATA-001, ENG-003, ENG-004, ENG-005
- Acceptation : provenance, commande de transformation, empreintes et statistiques
  sont reproduites sur une machine propre.

### CAT-001 - Générer l'index du catalogue

- Priorité : P0
- Dépendances : DATA-002, WEB-002
- Acceptation : index entièrement reconstructible depuis les manifestes et rejet
  de toute donnée invalide.

### CAT-002 - Créer les pages liste et détail

- Priorité : P0
- Dépendances : CAT-001, WEB-003
- Acceptation : filtres partageables par URL, provenance visible, métriques
  distinguées entre déclarées et vérifiées, téléchargements avec empreinte.

### DATA-003 - Stabiliser les contrats `1.0.0`

- Priorité : P0
- Dépendances : DATA-002
- Acceptation : retour d'expérience documenté, ADR de stabilisation, migration des
  exemples et aucun point bloquant connu sur la première famille réelle.

## Jalons 4 à 9 - Épics préparatoires

| ID | Jalon | Épic |
| --- | ---: | --- |
| PART-001 | 4 | Validation et calcul des métriques de partitions |
| PART-002 | 4 | Catalogue de topologies et partitions |
| VIZ-001 | 5 | Prototype de rendu multi-niveaux |
| VIZ-002 | 5 | Inspection de sous-graphes et chemins critiques |
| BENCH-001 | 6 | Import transactionnel du CSV |
| BENCH-002 | 6 | Comparaisons statistiques et fronts de Pareto |
| SOTA-001 | 7 | Taxonomie et modèle bibliographique |
| SOTA-002 | 7 | Revue de l'état de l'art postérieure à 2024 |
| COMM-001 | 8 | Pipeline de soumission et revue de licences |
| COMM-002 | 8 | Publication de versions citables |
| LAB-001 | 9 | Modèle de menace et isolation des exécutions |
| LAB-002 | 9 | File de travaux et intégration d'un partitionneur |

Ces épics seront découpés lorsque leurs dépendances approcheront de la livraison,
afin de ne pas figer aujourd'hui des détails qui dépendront des mesures des
premiers jalons.

## Questions ouvertes

- Quelle première famille possède la licence et les sources les plus adaptées à
  une publication complète ?
- Le moteur scientifique réutilise-t-il directement RaiSin ou commence-t-il par
  une implémentation de référence indépendante destinée à la vérification ?
- Quelles dimensions de ressources communes permettent de comparer des circuits
  synthétisés pour des technologies différentes ?
- Quelle tolérance numérique doit séparer une métrique vérifiée d'une divergence ?
- Quels identifiants pérennes utiliser avant une éventuelle publication Zenodo ?
