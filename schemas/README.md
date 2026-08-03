# Contrats de données

Version courante : `1.0.0-draft.1`.

Les schémas utilisent JSON Schema Draft 2020-12. Ils valident la structure ; le
script `scripts/validate_data.py` complète cette validation par les invariants qui
portent sur plusieurs objets ou éléments.

## Schémas

| Fichier | Objet |
| --- | --- |
| `common.schema.json` | Définitions partagées : références, artefacts, provenance et métriques |
| `circuit.schema.json` | Manifeste d'un circuit |
| `red-black-hypergraph.schema.json` | Représentation JSON canonique d'un hypergraphe rouge-noir |
| `topology.schema.json` | Capacités et matrice des coûts inter-parties |
| `partition.schema.json` | Affectation des sommets et métriques de partition |
| `benchmark-run.schema.json` | Une exécution d'algorithme normalisée |
| `benchmark-runs.csv.md` | Projection CSV de plusieurs exécutions |

## Compatibilité

- Un consommateur doit refuser une version majeure inconnue.
- Un champ non documenté est refusé, sauf dans les objets explicitement ouverts
  comme `parameters` et `environment.details`.
- La version draft peut encore recevoir des changements incompatibles avant sa
  stabilisation en `1.0.0`.
- Les exemples de `examples/` font partie du contrat : tout changement doit les
  migrer ou ajouter une nouvelle version.

## Validation structurelle et sémantique

JSON Schema vérifie notamment les types, champs obligatoires et formats. Le
validateur sémantique vérifie notamment :

- `red_vertices + black_vertices = vertices` ;
- unicité des identifiants de sommets et d'hyperarcs ;
- existence des sommets référencés par les hyperarcs ;
- cohérence des dimensions de ressources ;
- matrice carrée, diagonale nulle et symétrie déclarée ;
- affectation unique et exhaustive d'une partition intégrée ;
- cohérence des références et empreintes entre les exemples ;
- en-tête, types et contraintes conditionnelles du CSV.

## Emplacements d'artefacts

Un emplacement est soit un chemin relatif POSIX, soit une URL HTTPS. Les chemins
absolus, `..` et les URL non chiffrées sont interdits. L'empreinte SHA-256 porte
sur les octets téléchargés ou lus au chemin indiqué.

