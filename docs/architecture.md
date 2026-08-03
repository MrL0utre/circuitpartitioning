# Architecture de référence

## Objectifs architecturaux

L'architecture doit servir trois charges très différentes : des pages
pédagogiques largement statiques, des recherches dans un catalogue, et des
analyses de graphes potentiellement volumineux. Ces responsabilités ne doivent
pas dépendre d'un même processus ni d'un format propre à l'interface.

```text
Contenu versionné ───────┐
                        ├──> génération/indexation ──> application web
Métadonnées validées ───┘               │
                                        │ requêtes d'analyse
Artefacts immuables ──> stockage <──── moteur scientifique / workers
                                        │
Résultats et partitions validés <────────┘
```

Les JSON Schema de `schemas/` forment le contrat entre ces blocs.

## Composants

### 1. Contenu éditorial

Les cours, glossaires, notices de l'état de l'art et pages institutionnelles sont
stockés dans Git, idéalement en MDX à partir du jalon 1. Cette approche permet la
revue scientifique par pull request, les citations stables et un historique précis.

Le contenu bibliographique sépare les données structurées (auteurs, DOI, année,
taxonomie) du commentaire éditorial.

### 2. Application web

Responsabilités :

- navigation, recherche et internationalisation ;
- rendu des cours, équations et figures ;
- consultation des catalogues ;
- visualisations interactives ;
- orchestration des demandes d'analyse sans contenir la logique scientifique.

Option recommandée pour le jalon 1 : TypeScript avec un framework web hybride
capable de générer les pages statiques et de rendre les pages de données côté
serveur. La sélection exacte du framework sera confirmée dans une ADR du jalon 1
afin de ne pas transformer le jalon 0 en choix technologique irréversible.

### 3. Moteur scientifique

Bibliothèque et outil en ligne de commande indépendants du web. Il charge les
artefacts, vérifie les invariants et calcule notamment :

- ordre topologique des sous-hypergraphes acycliques ;
- statistiques de sommets et d'hyperarcs ;
- chemins rouge-rouge et chemin critique ;
- coupe, frontière et connectivité ;
- capacité et équilibre ;
- coût après placement sur une topologie cible.

Une API réseau n'est ajoutée que lorsqu'un usage l'exige. Les calculs doivent être
testables localement et réutilisables dans la CI ou dans des workers.

### 4. Catalogue et index

Les manifestes JSON validés constituent la source de vérité descriptive. Un index
de recherche ou une base relationnelle peut être généré à partir d'eux pour le
site ; cet index est reconstructible et ne devient pas une seconde source de
vérité.

### 5. Stockage des artefacts

Les petits exemples restent dans Git. Les netlists, hypergraphes et partitions
volumineux sont placés dans un stockage d'objets ou un dépôt scientifique. Chaque
référence contient une URL, une empreinte SHA-256, une taille et un type de média.

Les chemins relatifs sont autorisés pour les artefacts distribués avec le dépôt.
Une URL n'implique jamais que le projet a le droit de la republier.

### 6. Pipeline d'ingestion

Le pipeline futur suit des étapes explicites :

1. réception et contrôle antivirus hors du moteur d'analyse ;
2. validation du manifeste et de la licence ;
3. vérification des empreintes ;
4. parsing dans un environnement limité ;
5. validation des invariants scientifiques ;
6. calcul des statistiques avec version du moteur ;
7. publication atomique du manifeste et des artefacts.

## Flux de données

### Consultation

Le navigateur reçoit des métadonnées compactes. Il ne télécharge le graphe ou un
sous-graphe qu'à la demande. Les statistiques coûteuses sont pré-calculées et
marquées avec la version du moteur qui les a produites.

### Analyse d'une partition

Le moteur charge le circuit, la topologie et l'affectation de sommets. Il vérifie
l'exhaustivité, l'unicité, les capacités, puis recalcule les métriques. Une valeur
soumise est conservée comme valeur déclarée ; elle n'est publiée comme vérifiée
qu'après comparaison avec la valeur calculée.

### Import de benchmark CSV

Le CSV décrit une exécution par ligne. Les champs complexes utilisent un JSON
canonique encodé dans une cellule. L'import produit des objets `benchmark-run`
validés ; le CSV n'est pas utilisé directement comme base de données du site.

## Exigences non fonctionnelles

### Performance

- aucune vue ne suppose que le graphe complet tient en mémoire dans le navigateur ;
- les tableaux sont paginés et filtrés côté serveur ou sur un index compact ;
- les analyses longues sont asynchrones et annulables ;
- les résultats dérivés sont mis en cache par empreinte des entrées et version du moteur.

### Sécurité

- aucun fichier soumis n'est interprété comme du code ;
- les parseurs imposent tailles, nombres d'éléments et durées maximales ;
- les exécutions futures sont isolées, sans réseau par défaut et avec quotas ;
- les contenus éditoriaux n'autorisent pas du HTML arbitraire non assaini.

### Reproductibilité

- versions et empreintes sont obligatoires dans les références scientifiques ;
- les horodatages utilisent UTC et RFC 3339 ;
- les nombres tabulaires utilisent le point comme séparateur décimal ;
- les paramètres d'algorithme sont conservés sous forme structurée.

### Accessibilité et pérennité

- WCAG 2.2 AA est la cible de l'interface ;
- les graphiques possèdent une alternative tabulaire ou textuelle ;
- les URL publiques importantes sont stables ;
- les artefacts essentiels peuvent être exportés hors de l'application.

## Déploiement cible

Le premier déploiement peut réunir application et index sur une plateforme web
gérée, avec stockage externe pour les artefacts. Le moteur lourd évoluera vers des
workers séparés. Ce découpage évite de déployer une infrastructure de calcul avant
que les catalogues statiques ne la nécessitent.

## Décisions différées

- framework web et hébergeur exacts ;
- langage d'implémentation du moteur scientifique ;
- base de données ou moteur de recherche ;
- fournisseur de stockage d'objets ;
- protocole d'authentification des contributeurs ;
- infrastructure d'exécution de RaiSin et des partitionneurs externes.

Ces décisions seront prises à partir de mesures ou d'un besoin du jalon concerné,
puis enregistrées dans `docs/adr/`.
