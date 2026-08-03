from __future__ import annotations

import copy
import unittest

from scripts.validate_data import (
    EXAMPLES,
    Validation,
    compute_critical_path,
    compute_cut_metrics,
    load_json,
    validate_partition,
    validate_topology,
)


class MetricTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.graph = load_json(EXAMPLES / "data" / "mini-pipeline.rbh.json")
        cls.topology = load_json(
            EXAMPLES / "topologies" / "two-fpga-link.topology.json"
        )
        cls.partition = load_json(
            EXAMPLES / "partitions" / "mini-pipeline-split.partition.json"
        )
        cls.assignment = {
            item["vertex_id"]: item["part_id"]
            for item in cls.partition["assignment"]["items"]
        }

    def test_reference_critical_paths(self) -> None:
        self.assertEqual(compute_critical_path(self.graph, None, None), 3)
        self.assertEqual(
            compute_critical_path(self.graph, self.assignment, self.topology), 13
        )

    def test_reference_cut_metrics(self) -> None:
        self.assertEqual(compute_cut_metrics(self.graph, self.assignment), (2, 2))

    def test_duplicate_assignment_is_rejected(self) -> None:
        partition = copy.deepcopy(self.partition)
        partition["assignment"]["items"][1]["vertex_id"] = "r-in"
        validation = Validation()
        validate_partition(
            validation,
            EXAMPLES / "partitions" / "invalid.partition.json",
            partition,
            self.graph,
            self.topology,
        )
        self.assertTrue(
            any("duplicate vertex assignment" in error for error in validation.errors)
        )

    def test_capacity_overflow_is_rejected_for_feasible_partition(self) -> None:
        topology = copy.deepcopy(self.topology)
        topology["parts"][0]["capacity"]["logic"] = 1
        validation = Validation()
        validate_partition(
            validation,
            EXAMPLES / "partitions" / "invalid.partition.json",
            self.partition,
            self.graph,
            topology,
        )
        self.assertTrue(
            any("declared feasible" in error for error in validation.errors)
        )

    def test_asymmetric_matrix_is_rejected_when_declared_symmetric(self) -> None:
        topology = copy.deepcopy(self.topology)
        topology["routing_costs"]["matrix"][1][0] = 9
        validation = Validation()
        validate_topology(
            validation,
            EXAMPLES / "topologies" / "invalid.topology.json",
            topology,
        )
        self.assertTrue(any("symmetric costs" in error for error in validation.errors))


if __name__ == "__main__":
    unittest.main()
