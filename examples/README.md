# Exemples de référence

`mini-pipeline` est une instance volontairement petite permettant de vérifier les
contrats et les formules à la main.

## Circuit

Le circuit contient deux chemins rouge-rouge :

```text
r-in -> fast -> r-out              coût = 1
r-in -> slow-a -> slow-b -> r-out  coût = 3
```

Le second est donc le chemin critique non partitionné.

## Topologie et partition

La topologie comporte deux FPGA. Toute traversée entre eux ajoute `10 ns`.
L'affectation coupe :

- `fast -> r-out` ;
- `slow-a -> slow-b`.

Chaque chemin traverse une fois la frontière. Le chemin court coûte alors `11`
et le chemin critique `13`. La taille de coupe et le coût
connectivity-minus-one valent tous deux `2`.

## Fichiers

| Fichier | Contrat |
| --- | --- |
| `circuits/mini-pipeline.circuit.json` | `circuit.schema.json` |
| `data/mini-pipeline.rbh.json` | `red-black-hypergraph.schema.json` |
| `topologies/two-fpga-link.topology.json` | `topology.schema.json` |
| `partitions/mini-pipeline-split.partition.json` | `partition.schema.json` |
| `runs/mini-pipeline-reference.run.json` | `benchmark-run.schema.json` |
| `benchmarks/reference-runs.csv` | `benchmark-runs.csv.md` |

Les empreintes sont vérifiées automatiquement. Toute modification d'un artefact
référencé nécessite donc de mettre à jour les références qui en dépendent.
