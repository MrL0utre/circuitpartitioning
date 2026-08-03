# Format CSV des exécutions de benchmark

Version : `1.0.0-draft.1`.

Le fichier est encodé en UTF-8, séparé par des virgules et contient exactement
une ligne d'en-tête. Chaque ligne décrit une exécution indépendante. Les champs
JSON utilisent la syntaxe CSV standard pour échapper les guillemets.

## Colonnes

| Colonne | Type | Requis | Description |
| --- | --- | --- | --- |
| `run_id` | resource-id | oui | Identifiant unique de l'exécution |
| `circuit_id` | resource-id | oui | Identifiant du circuit |
| `circuit_version` | semver | oui | Version du manifeste du circuit |
| `circuit_sha256` | sha256 | oui | Empreinte de l'artefact d'hypergraphe |
| `topology_id` | resource-id | oui | Identifiant de la topologie |
| `topology_version` | semver | oui | Version du manifeste de topologie |
| `topology_sha256` | sha256 | oui | Empreinte du manifeste de topologie |
| `algorithm` | texte non vide | oui | Nom de l'algorithme |
| `algorithm_version` | texte non vide | oui | Version exacte ou commit de l'algorithme |
| `parameters` | objet JSON | oui | Paramètres structurés, `{}` si aucun |
| `seed` | entier >= 0 | non | Graine lorsque l'algorithme est aléatoire |
| `status` | enum | oui | `succeeded`, `failed`, `timeout`, `out-of-memory` ou `cancelled` |
| `started_at` | RFC 3339 | oui | Début de l'exécution en UTC |
| `duration_ms` | nombre >= 0 | succès | Durée murale |
| `memory_peak_mb` | nombre >= 0 | non | Pic mémoire observé |
| `critical_path` | nombre >= 0 | non | Chemin critique non partitionné |
| `partitioned_critical_path` | nombre >= 0 | succès | Chemin critique après placement |
| `cut_size` | nombre >= 0 | succès | `f_c` |
| `connectivity_minus_one` | nombre >= 0 | succès | `f_lambda` |
| `partition_id` | resource-id | succès | Partition produite |
| `partition_version` | semver | succès | Version de son manifeste |
| `partition_sha256` | sha256 | succès | Empreinte de son manifeste |
| `error_message` | texte | échec | Diagnostic synthétique |

`succès` signifie que la colonne est requise lorsque `status = succeeded`.
`échec` signifie qu'elle est requise pour `failed`, `timeout` et `out-of-memory`.

## Normalisation

À l'import :

- les chaînes vides deviennent des valeurs absentes, jamais zéro ;
- `parameters` est parsé comme un objet JSON ;
- les nombres sont lus sans unité depuis les colonnes ; l'unité temporelle est
  celle du circuit et doit correspondre à la topologie ;
- les quatre colonnes de métriques deviennent des métriques `declared` sous les
  conventions `1.0.0-draft.1` ;
- les références sont regroupées selon `benchmark-run.schema.json` ;
- les colonnes inconnues sont refusées dans cette version draft afin de détecter
  les fautes de frappe.

