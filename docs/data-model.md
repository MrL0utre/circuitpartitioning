# Modèle de données

Ce document décrit les objets échangés entre le catalogue, le moteur scientifique
et l'application. Les contraintes exécutables se trouvent dans `schemas/`.

## Principes communs

### Identité

Chaque ressource scientifique possède :

- `id` : identifiant stable, lisible et indépendant du nom de fichier ;
- `version` : version SemVer du manifeste ;
- `schema_version` : version du contrat utilisé ;
- une ou plusieurs empreintes SHA-256 pour les artefacts qui portent les données.

Une référence scientifique complète est le triplet `(id, version, sha256)`. `id`
seul est pratique pour les URL mais insuffisant pour reproduire une expérience.

Pour éviter les références circulaires, `sha256` désigne l'artefact primaire de
l'hypergraphe pour un circuit, et le manifeste JSON pour une topologie ou une
partition. Un hypergraphe embarque seulement l'identité `(id, version)` du
circuit dont il constitue l'artefact primaire.

Les identifiants utilisent les minuscules ASCII, chiffres et tirets. Ils sont
uniques dans leur type de ressource. Exemples : `itc99-b01`, `cycle-4`,
`b01-k4-dkfm-seed-42`.

### Version

La version du manifeste évolue ainsi :

- `major` : changement incompatible du sens ou de la structure publiée ;
- `minor` : ajout compatible de métadonnées ou d'artefacts ;
- `patch` : correction qui ne change pas les données scientifiques référencées.

La transformation d'une netlist en hypergraphe possède sa propre version dans la
provenance. Deux transformations différentes ne doivent pas réutiliser
silencieusement la même version de circuit.

### Artefact

Un artefact est un fichier local ou distant contenant une donnée scientifique.
Il comporte :

- un rôle (`red-black-hypergraph`, `partition-assignment`, `source-netlist`, etc.) ;
- un format et un type de média ;
- un emplacement relatif ou une URL HTTPS ;
- une empreinte SHA-256 en hexadécimal minuscule ;
- une taille en octets ;
- éventuellement une compression.

L'empreinte porte sur les octets effectivement téléchargés. Si un fichier est
compressé, elle porte donc sur le fichier compressé et non sur son contenu après
décompression. Un manifeste peut fournir un second artefact pour la forme
décompressée.

### Provenance et licence

La provenance distingue :

- la source primaire et sa citation ;
- l'URL de récupération ;
- la licence déclarée par la source ;
- le droit de redistribution, représenté explicitement ;
- la chaîne de transformation ayant produit l'artefact publié.

`redistribution = unknown` interdit la copie de l'artefact dans le stockage public
du projet tant qu'une revue humaine n'a pas tranché.

## Circuit

Le manifeste `circuit` décrit une instance et pointe vers son hypergraphe. Il
contient :

- identité, titre et description ;
- provenance et licence ;
- unité temporelle ;
- dimensions de ressources ;
- comptages déclarés ;
- artefacts disponibles ;
- statistiques déclarées ou vérifiées, avec leur provenance de calcul.

L'hypergraphe lui-même est séparé du manifeste pour permettre aux métadonnées de
rester compactes. Le format JSON canonique `red-black-hypergraph` est prévu pour
les exemples et les échanges. Les gros jeux de données pourront utiliser le
format texte rouge-noir dérivé de `hygr`, référencé par le même manifeste.

### Sommet

Un sommet possède un identifiant, une couleur, un délai et un vecteur de poids de
ressources. `criticality` est facultative car elle peut être recalculée. Un libellé
humain ou un type de cellule est informatif et ne participe pas aux métriques sans
convention supplémentaire.

### Hyperarc

Un hyperarc canonique possède :

- un identifiant unique ;
- exactement une source ;
- au moins un puits distinct de la source ;
- un poids de coupe, égal à `1` par défaut ;
- éventuellement un délai intrinsèque par relation source-puits.

Le modèle à plusieurs sources n'est pas admis en `1.x`. Un importeur doit le
normaliser ou refuser l'entrée.

## Topologie

Une topologie décrit les parties physiques possibles :

- liste ordonnée de FPGA logiques et capacités par ressource ;
- matrice complète des coûts de communication `D` ;
- unité temporelle ;
- caractère symétrique ou asymétrique ;
- liens physiques facultatifs pour la visualisation et leurs capacités.

La matrice complète fait autorité pour le calcul de `f_p`. Les liens servent à
expliquer ou reconstruire une topologie, mais le moteur ne doit pas deviner
implicitement si leur coût représente un lien direct ou un plus court chemin.

L'ordre des lignes et colonnes de la matrice est défini par le tableau `part_ids`.

## Partition

Une partition référence exactement un circuit et une topologie par identité,
version et empreinte. L'affectation est :

- intégrée sous forme d'une liste `(vertex_id, part_id)` pour les exemples ; ou
- placée dans un artefact pour les grandes instances.

Les deux formes sont mutuellement exclusives. L'ordre des affectations n'a pas de
sémantique. La validation sémantique vérifie l'unicité et l'exhaustivité.

Le manifeste peut contenir des métriques déclarées. Elles comprennent toujours
un `metric_id`, une valeur et un statut `declared` ou `verified`. Seul le moteur
peut produire le statut `verified` avec sa version et les empreintes d'entrée.

## Exécution de benchmark

Une exécution relie :

- le circuit, la topologie et éventuellement la partition produite ;
- un algorithme et sa version ;
- des paramètres structurés et une graine ;
- l'environnement logiciel et matériel ;
- les temps, mémoire, statut et message d'erreur éventuel ;
- les métriques déclarées ou vérifiées ;
- les journaux et artefacts de sortie.

Une ligne en échec reste une donnée utile : elle possède un `status` non réussi et
peut omettre partition et métriques indisponibles.

## CSV de benchmark

Le CSV est une représentation plate d'exécutions. Il utilise :

- UTF-8 ;
- virgule comme séparateur ;
- en-tête obligatoire ;
- point comme séparateur décimal ;
- chaîne vide pour une valeur absente ;
- JSON compact pour `parameters` et autres champs structurés ;
- horodatage UTC RFC 3339.

Les identifiants et versions restent dans des colonnes séparées afin d'éviter les
jointures implicites. Après import, chaque ligne est convertie vers le contrat
`benchmark-run` et validée.

## Relations

```text
Circuit 1 <──── n Partition n ────> 1 Topology
   │                  │
   │                  └──── produite par ──── BenchmarkRun
   └─────────────────────────────────────────┘
```

Une partition ne contient pas une copie des métadonnées du circuit ou de la
topologie. Les références complètes empêchent qu'une mise à jour de catalogue ne
change rétroactivement le sens d'une expérience.

## Source de vérité

| Information | Source faisant autorité |
| --- | --- |
| Métadonnées et provenance | Manifeste versionné |
| Structure d'un circuit | Artefact d'hypergraphe identifié par SHA-256 |
| Coûts inter-parties | Matrice de la topologie |
| Affectation des sommets | Affectation intégrée ou artefact de partition |
| Résultat soumis | Exécution, statut `declared` |
| Résultat publié comme vérifié | Sortie du moteur, statut `verified` |
| Index et pages du site | Données dérivées et reconstructibles |
