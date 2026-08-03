# ADR 0002 - Contrats de données versionnés

- Statut : accepted
- Date : 2026-08-03

## Contexte

Circuits, topologies, partitions et résultats proviennent de sources et d'outils
différents. Une convention implicite sur l'ordre des sommets, les unités ou la
fonction objectif rendrait les comparaisons non reproductibles.

## Décision

- Décrire les manifestes en JSON et les valider avec JSON Schema 2020-12.
- Conserver un format CSV long pour l'échange de nombreuses exécutions.
- Inclure `schema_version` dans chaque document racine.
- Identifier les objets par `id`, `version` et empreinte SHA-256 des artefacts.
- Réserver les changements incompatibles à une nouvelle version majeure.
- Maintenir des validations sémantiques au-delà de ce que JSON Schema exprime.

La version du jalon 0 est `1.0.0-draft.1`. Elle devient `1.0.0` après revue des
premiers imports réels.

## Conséquences

- Les consommateurs doivent refuser une version majeure inconnue.
- Une simple modification de métadonnées incrémente la version du manifeste mais
  ne change pas nécessairement l'empreinte de l'artefact scientifique.
- Les valeurs déclarées et recalculées peuvent coexister sans être confondues.
- Des migrations explicites seront nécessaires lors d'un changement incompatible.
