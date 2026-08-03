# Conventions scientifiques

Ce document fixe la sémantique initiale utilisée par les contrats de données. Il
s'appuie sur les chapitres 1 et 3 de la thèse fondatrice. Toute modification qui
change le résultat d'une métrique nécessite une nouvelle version des conventions.

Version des conventions : `1.0.0-draft.1`.

## Hypergraphe orienté rouge-noir

Un circuit est représenté par un hypergraphe orienté `H = (V, A)` :

- `V = V_R ∪ V_B` est l'ensemble des sommets ;
- `V_R` contient les sommets rouges, typiquement registres et ports d'E/S ;
- `V_B` contient les sommets noirs, typiquement cellules combinatoires ;
- chaque hyperarc possède une source et au moins un puits dans le contrat canonique.

Les ensembles rouge et noir sont disjoints. Tout sommet possède un identifiant
unique dans le circuit.

Un bloc combinatoire compris entre des sommets rouges est un hypergraphe orienté
acyclique. Par conséquent, tout cycle du circuit complet doit contenir au moins un
sommet rouge. Cette propriété permet de calculer le chemin critique par
propagation topologique bloc par bloc.

## Chemins rouge-rouge

Seuls les chemins combinatoires commençant et finissant par un sommet rouge sont
pris en compte pour la fréquence du circuit. Les sommets internes d'un tel chemin
sont noirs. Un sommet rouge rencontré interrompt donc le chemin courant et sert
de source à un nouveau bloc.

Le coût non partitionné d'un chemin `p` est :

```text
d(p) = somme des délais des sommets de p
     + somme des délais intrinsèques des connexions traversées
```

Le délai intrinsèque des connexions vaut zéro lorsqu'il n'est pas fourni. Les
délais sont des nombres réels finis et positifs ou nuls, exprimés dans l'unité
déclarée par le circuit.

Le chemin critique non partitionné est :

```text
d_max(H) = max { d(p) | p est un chemin rouge-rouge de H }
```

La criticalité d'un sommet est la longueur maximale d'un chemin rouge-rouge qui
le traverse selon la méthode de calcul déclarée. Une criticalité importée est une
donnée déclarée ; le moteur peut publier séparément une valeur recalculée.

## Partition

Une `k`-partition est une affectation totale des sommets à `k` parties telle que :

- chaque sommet appartient à exactement une partie ;
- chaque partie référencée existe dans la topologie cible ;
- pour chaque dimension de ressource, la somme des poids ne dépasse pas la
  capacité de la partie, sauf si la partition est explicitement publiée avec le
  statut `infeasible`.

La réplication de sommets n'appartient pas au contrat de partition `1.x`. Elle
pourra être introduite dans une version majeure distincte.

## Connectivité et coupe

Pour une partition `Π`, la connectivité `lambda_Π(a)` d'un hyperarc est le nombre
de parties distinctes contenant sa source ou ses puits.

Un hyperarc est coupé si `lambda_Π(a) > 1`. L'ensemble des hyperarcs coupés est
la coupe `omega(Π)`. La frontière contient tous les sommets appartenant à au
moins un hyperarc coupé.

La taille pondérée de coupe est :

```text
f_c(Π) = somme de weight(a) pour les hyperarcs coupés
```

Le poids par défaut d'un hyperarc vaut `1`. Le coût connectivity-minus-one est :

```text
f_lambda(Π) = somme de (lambda_Π(a) - 1) pour tous les hyperarcs
```

Une variante pondérée doit porter un autre identifiant de métrique et documenter
sa formule ; elle ne peut pas être publiée sous `connectivity_minus_one`.

## Coût dépendant de la topologie

Une topologie associe une partie à chaque FPGA logique et fournit une matrice de
coûts `D`. `D(i, i) = 0`. Les coûts peuvent être asymétriques si la topologie le
déclare.

Le coût d'un chemin après partitionnement est :

```text
d_Π(p) = d(p) + somme de D(part(u), part(v))
```

La somme porte sur chaque relation source-puits de l'hyperarc suivie par le
chemin. Le chemin critique partitionné, objectif principal de la thèse, est :

```text
f_p(H, Π, D) = max { d_Π(p) | p est un chemin rouge-rouge de H }
```

Dans les manifestes, `critical_path` désigne `d_max(H)` sans coût inter-parties et
`partitioned_critical_path` désigne `f_p`. La dégradation absolue et relative est
calculée à partir de ces deux valeurs ; elle n'est pas une entrée faisant autorité.

## Capacités et équilibre

Les ressources sont des dimensions nommées, par exemple `logic`, `registers`,
`dsp` ou `bram`. Chaque sommet porte un poids positif ou nul par dimension. Une
dimension omise par un sommet vaut zéro ; une dimension utilisée par un sommet
doit exister dans les capacités de toutes les parties.

Le portail expose au minimum, pour chaque dimension :

- charge absolue par partie ;
- taux d'utilisation `load / capacity` ;
- maximum des taux d'utilisation ;
- faisabilité.

Il n'existe pas de définition universelle de l'imbalance multi-contraintes. Toute
valeur d'équilibre publiée indique donc son `metric_id` et sa version. La première
implémentation retiendra une définition dans une ADR du moteur.

## Unités et précision

- Les unités temporelles autorisées par le contrat initial sont `ps`, `ns` et `us`.
- Tous les délais d'un même circuit et de sa topologie sont exprimés dans la même unité.
- Aucune conversion implicite n'est réalisée pendant la validation.
- Les calculs utilisent au minimum la précision IEEE 754 double.
- La comparaison de valeurs recalculées utilise une tolérance documentée par le moteur.
- Les valeurs `NaN`, infinies et négatives sont interdites.

## Jeux de données initiaux envisagés

Les familles mentionnées dans la thèse sont ITC99, Titan, Chipyard et des circuits
d'inférence neuronale. Leur présence dans la thèse ne suffit pas à autoriser leur
redistribution. Chaque import attend une revue de licence, une citation, une
version de transformation et l'empreinte des données sources.

## Traçabilité des métriques

Une métrique publiée est accompagnée de :

- son identifiant stable ;
- la version des conventions ;
- la version du moteur ;
- les empreintes du circuit, de la topologie et de la partition ;
- la date du calcul.

Cette information permet de distinguer une évolution du moteur, une évolution de
la donnée et un changement de définition scientifique.

