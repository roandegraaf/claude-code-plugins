# Chunking Strategies

## Table of Contents
- [General Principles](#general-principles)
- [Strategy: Directory-Based Chunking](#strategy-directory-based-chunking)
- [Strategy: Dependency-Based Chunking](#strategy-dependency-based-chunking)
- [Strategy: Plan-Based Chunking](#strategy-plan-based-chunking)
- [Strategy: Test-Based Chunking](#strategy-test-based-chunking)
- [Chunk Size Guidelines](#chunk-size-guidelines)
- [Handling Large Files](#handling-large-files)
- [Chunk Metadata](#chunk-metadata)

Detailed patterns for dividing large tasks into manageable chunks.

## General Principles

1. **Independence**: Chunks should be processable without knowledge of other chunks
2. **Atomicity**: Each chunk should be all-or-nothing (complete or rollback)
3. **Bounded Size**: Never exceed 20 files per chunk
4. **Clear Boundaries**: Chunk by directory, module, or logical unit

## Strategy: Directory-Based Chunking

**Best for**: Codebase-wide operations (simplify, lint fixes, migrations)

### Algorithm

```python
def chunk_by_directory(files, max_size=20):
    # Group files by parent directory
    by_dir = group_by(files, lambda f: os.path.dirname(f))

    chunks = []
    for dir_path, dir_files in by_dir.items():
        if len(dir_files) <= max_size:
            # Directory fits in one chunk
            chunks.append({
                'id': f'chunk-{len(chunks)+1}',
                'description': f'Process {dir_path}',
                'files': dir_files
            })
        else:
            # Split large directories
            for i, batch in enumerate(batched(dir_files, max_size)):
                chunks.append({
                    'id': f'chunk-{len(chunks)+1}',
                    'description': f'Process {dir_path} (part {i+1})',
                    'files': batch
                })

    return chunks
```

### Ordering

Process directories in dependency order:
1. **Leaf directories first**: Directories with no subdirectories
2. **Shared modules last**: `utils/`, `common/`, `shared/`
3. **Core modules last**: Base classes, interfaces

```
src/
├── utils/          # Process 3rd (shared)
├── models/         # Process 1st (leaf)
├── views/          # Process 2nd (depends on models)
└── core/           # Process 4th (everything depends on this)
```

## Strategy: Dependency-Based Chunking

**Best for**: Refactoring with import changes, API migrations

### Algorithm

```python
def chunk_by_dependencies(files, dependency_graph, max_size=20):
    # Topological sort based on imports
    sorted_files = topological_sort(files, dependency_graph)

    # Group into levels (files at same level have no interdependencies)
    levels = []
    current_level = []
    seen = set()

    for file in sorted_files:
        deps = dependency_graph.get(file, [])
        if all(d in seen for d in deps):
            current_level.append(file)
            if len(current_level) >= max_size:
                levels.append(current_level)
                seen.update(current_level)
                current_level = []

    if current_level:
        levels.append(current_level)

    # Create chunks from levels
    chunks = []
    for i, level in enumerate(levels):
        chunks.append({
            'id': f'chunk-{i+1}',
            'description': f'Dependency level {i+1}',
            'files': level,
            'depends_on': [f'chunk-{i}'] if i > 0 else []
        })

    return chunks
```

## Strategy: Plan-Based Chunking

**Best for**: Implementing feature plans, multi-step workflows

### Algorithm

```python
def chunk_by_plan_steps(plan_text):
    # Parse plan into steps
    steps = parse_plan_steps(plan_text)

    chunks = []
    for i, step in enumerate(steps):
        # Identify files this step will touch
        files = extract_file_references(step)

        # Identify dependencies on previous steps
        deps = extract_dependencies(step, steps[:i])

        chunks.append({
            'id': f'step-{i+1}',
            'description': step.title,
            'plan_section': step.content,
            'files': files,
            'depends_on': deps
        })

    return chunks
```

### Dependency Detection

Look for explicit markers:
- "After step N..."
- "Once X is complete..."
- "Requires Y to exist..."

And implicit dependencies:
- Creating file in step A, modifying in step B → B depends on A
- Defining interface in step A, implementing in step B → B depends on A

## Strategy: Test-Based Chunking

**Best for**: Adding tests, test migrations

### Algorithm

```python
def chunk_by_test_files(source_files, test_dir='tests/', max_size=10):
    # Map source files to test files
    source_to_test = {}
    for f in source_files:
        test_file = find_test_file(f, test_dir)
        source_to_test[f] = test_file

    # Group by test file existence
    with_tests = [f for f in source_files if source_to_test[f]]
    without_tests = [f for f in source_files if not source_to_test[f]]

    chunks = []

    # Chunk files needing new tests
    for batch in batched(without_tests, max_size):
        chunks.append({
            'id': f'chunk-{len(chunks)+1}',
            'description': 'Add tests for files without coverage',
            'files': batch,
            'type': 'create_tests'
        })

    # Chunk files with existing tests (for updates)
    for batch in batched(with_tests, max_size):
        chunks.append({
            'id': f'chunk-{len(chunks)+1}',
            'description': 'Update existing tests',
            'files': batch,
            'type': 'update_tests'
        })

    return chunks
```

## Chunk Size Guidelines

| Task Type | Recommended Size | Rationale |
|-----------|-----------------|-----------|
| Simplification | 15-20 files | Low complexity per file |
| New features | 1-5 files | High complexity, need context |
| Bug fixes | 1-3 files | Focused changes |
| Test writing | 5-10 files | Medium complexity |
| Migrations | 10-15 files | Mechanical changes |
| Documentation | 20 files | Very low complexity |

## Handling Large Files

When a single file is too large for one chunk:

1. **Don't split files** - Process large files in their own chunk
2. **Increase context** - Give subagent more detail about the file
3. **Focus instructions** - "Only simplify functions X, Y, Z"

## Chunk Metadata

Always include in chunk definition:

```json
{
  "id": "unique-chunk-id",
  "description": "Human-readable description",
  "files": ["list", "of", "file", "paths"],
  "depends_on": ["chunk-ids"],
  "subagent_type": "appropriate-agent",
  "priority": 1-10,
  "estimated_complexity": "low|medium|high"
}
```
