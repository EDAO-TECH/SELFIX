#!/usr/bin/env python3
"""Generate an agents registry by discovering Agent classes dynamically."""

from __future__ import annotations

import argparse
import ast
import json
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Dict, Iterable, List

DEFAULT_AGENT_ROOT = Path("ai_engine") / "agents"
DEFAULT_OUTPUT = Path("ai_engine") / "agents_registry.json"


@dataclass
class AgentDefinition:
    name: str
    module: str
    file: str

    @classmethod
    def from_module(cls, class_name: str, module_path: Path, agent_root: Path) -> "AgentDefinition":
        relative_module = module_path.with_suffix("").relative_to(agent_root)
        module = ".".join(relative_module.parts)
        return cls(name=class_name, module=module, file=str(module_path))


def discover_agent_classes(agent_root: Path) -> List[AgentDefinition]:
    if not agent_root.exists():
        return []

    discovered: Dict[str, AgentDefinition] = {}

    for python_file in agent_root.rglob("*.py"):
        if python_file.name == "__init__.py":
            continue

        try:
            tree = ast.parse(python_file.read_text(), filename=str(python_file))
        except SyntaxError as exc:
            raise SyntaxError(f"Unable to parse {python_file}: {exc}") from exc

        for node in tree.body:
            if isinstance(node, ast.ClassDef) and node.name.endswith("Agent") and not node.name.startswith("_"):
                definition = AgentDefinition.from_module(node.name, python_file, agent_root)
                key = f"{definition.module}:{definition.name}"
                discovered[key] = definition

    return sorted(discovered.values(), key=lambda item: (item.module, item.name))


def write_registry(definitions: Iterable[AgentDefinition], output_path: Path) -> None:
    definition_list = list(definitions)
    registry = {
        "agents": [asdict(agent) for agent in definition_list],
        "total_agents": len(definition_list),
    }
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(registry, indent=2))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate the Selfix agent registry")
    parser.add_argument(
        "--root",
        type=Path,
        default=DEFAULT_AGENT_ROOT,
        help="Root directory containing agent definitions (default: ai_engine/agents)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help="Path to write the registry JSON file (default: ai_engine/agents_registry.json)",
    )
    parser.add_argument(
        "--print",
        dest="should_print",
        action="store_true",
        help="Print the generated registry to stdout in addition to writing the file",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    agents = discover_agent_classes(args.root)
    write_registry(agents, args.output)

    if args.should_print:
        print(json.dumps({"agents": [asdict(agent) for agent in agents]}, indent=2))

    print(f"Registry written to {args.output} ({len(agents)} agents discovered)")


if __name__ == "__main__":
    main()
