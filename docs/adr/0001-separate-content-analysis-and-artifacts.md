# ADR 0001 - Séparer contenu, analyse et artefacts

- Statut : accepted
- Date : 2026-08-03

## Contexte

Le projet doit servir du contenu pédagogique, présenter des métadonnées et
analyser des hypergraphes dont la taille varie de quelques dizaines à plus d'un
million de sommets. Un unique projet web contenant toutes les données et toute la
logique lierait le cycle éditorial au coût des analyses et rendrait les outils
difficiles à réutiliser.

## Décision

Séparer quatre responsabilités :

1. contenu éditorial versionné dans Git ;
2. application web de présentation ;
3. moteur scientifique indépendant ;
4. stockage d'artefacts immuables identifié par empreinte.

Les contrats versionnés de `schemas/` constituent l'interface entre elles.

## Conséquences

- Le moteur doit offrir une bibliothèque ou une CLI avant toute API réseau.
- L'index du site est dérivé des manifestes et peut être reconstruit.
- Les gros artefacts ne gonflent pas nécessairement l'historique Git.
- Le déploiement comporte éventuellement plusieurs composants, mais seulement
  lorsque la charge le justifie.

