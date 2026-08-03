# Contribuer

Le projet accepte les contributions documentaires, scientifiques et logicielles.
Pendant le jalon 0, les contrats sont encore en version draft : les retours sur
leur capacité à décrire des jeux de données réels sont particulièrement utiles.

## Workflow Git

1. partir de `main` à jour ;
2. créer une branche descriptive, par exemple `dev/milestone-1-web-foundation` ;
3. limiter chaque commit à une intention cohérente ;
4. exécuter les validations locales ;
5. ouvrir une pull request expliquant le contexte et les décisions ;
6. attendre la revue avant fusion dans `main`.

Les changements directs sur `main` sont déconseillés. Les changements de schéma
ou de convention scientifique doivent décrire leur compatibilité et fournir ou
mettre à jour les exemples concernés.

## Style des commits

Le projet utilise des messages courts inspirés de Conventional Commits :

```text
docs: establish scientific conventions
feat(data): add partition manifest schema
fix(validation): reject duplicate vertex assignments
```

Un commit ne doit pas mélanger une refonte de format avec une modification
éditoriale sans rapport.

## Pull request

La description précise au minimum :

- le besoin traité ;
- les fichiers ou contrats concernés ;
- les validations effectuées ;
- les effets sur la reproductibilité et la compatibilité ;
- les questions restant à arbitrer.

## Contribution de données

Ne pas ajouter un circuit ou un autre artefact tiers avant d'avoir documenté :

- sa source primaire et sa citation ;
- sa licence ;
- son droit de redistribution ;
- les transformations appliquées ;
- son empreinte SHA-256 ;
- le logiciel et la commande ayant produit les données dérivées.

Les données personnelles, confidentielles ou couvertes par un accord de
non-divulgation ne sont pas acceptées.

## Changer une convention scientifique

Une modification de formule ou de sémantique doit :

1. citer la motivation scientifique ;
2. identifier les métriques affectées ;
3. indiquer si les résultats existants doivent être recalculés ;
4. mettre à jour la version des conventions ;
5. ajouter une ADR si la décision est structurante ;
6. ajouter un cas de test qui distingue l'ancienne et la nouvelle définition.

## Validation locale

Créer un environnement Python, installer les dépendances et exécuter :

```text
python -m pip install --requirement requirements-dev.txt
python scripts/validate_data.py
python -m unittest discover -s tests
git diff --check
```

Le validateur contrôle les schémas, exemples, empreintes, références et métriques
scientifiques. À terme, une contribution devra également exécuter les tests du
moteur concerné et vérifier les liens documentaires.
