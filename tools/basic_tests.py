#!/usr/bin/env python3
"""Lightweight sanity tests for Selfix utilities."""

from __future__ import annotations

import json
import sys
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.generate_registry import AgentDefinition, discover_agent_classes, write_registry  # noqa: E402


class GenerateRegistryTestCase(unittest.TestCase):
    def test_discover_returns_empty_when_root_missing(self) -> None:
        missing = ROOT / "not_a_real_directory"
        self.assertEqual(discover_agent_classes(missing), [])

    def test_discover_finds_agent_classes(self) -> None:
        with TemporaryDirectory() as tmp:
            agent_root = Path(tmp)
            module_path = agent_root / "business"
            module_path.mkdir(parents=True)
            agent_file = module_path / "example_agent.py"
            agent_file.write_text(
                """
class ExampleAgent:
    pass

class AnotherHelper:
    pass

class ComplianceAgent:
    pass
"""
            )

            agents = discover_agent_classes(agent_root)
            names = {agent.name for agent in agents}
            self.assertIn("ExampleAgent", names)
            self.assertIn("ComplianceAgent", names)
            self.assertNotIn("AnotherHelper", names)

    def test_write_registry_outputs_expected_json(self) -> None:
        with TemporaryDirectory() as tmp:
            output = Path(tmp) / "registry.json"
            agents = [
                AgentDefinition(name="TestAgent", module="demo.test_agent", file="demo/test_agent.py")
            ]
            write_registry(agents, output)
            data = json.loads(output.read_text())
            self.assertEqual(data["total_agents"], 1)
            self.assertEqual(data["agents"][0]["name"], "TestAgent")


if __name__ == "__main__":
    unittest.main()
