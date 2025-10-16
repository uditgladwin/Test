from contextlib import contextmanager
from typing import Iterable, Iterator, TypeVar, Optional

T = TypeVar('T')

try:
    from rich.progress import Progress
except ImportError:  # pragma: no cover - fallback if Rich not present
    Progress = None  # type: ignore


@contextmanager
def progress_task(description: str):
    if Progress is None:
        print(description)
        yield lambda total: None
    else:  # pragma: no cover - interactive CLI behavior
        with Progress() as progress:
            task = progress.add_task(description, total=None)
            yield lambda total: progress.update(task, total=total)


def track_iterable(iterable: Iterable[T], description: str = "Processing") -> Iterator[T]:
    if Progress is None:
        for item in iterable:
            yield item
    else:  # pragma: no cover - interactive CLI behavior
        with Progress() as progress:
            task_id = progress.add_task(description, total=len(iterable))
            for item in iterable:
                yield item
                progress.advance(task_id)


class ProgressReporter:
    def __init__(self, description: str, total: Optional[int] = None):
        self.description = description
        self.total = total
        self.progress = None
        self.task_id = None
    
    def __enter__(self):
        if Progress is None:
            print(self.description)
            return self
        self.progress = Progress()
        self.progress.__enter__()
        self.task_id = self.progress.add_task(self.description, total=self.total)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.progress is not None:
            self.progress.__exit__(exc_type, exc_val, exc_tb)
            self.progress = None
            self.task_id = None
    
    def advance(self, steps: int = 1):
        if self.progress is not None and self.task_id is not None:
            self.progress.advance(self.task_id, steps)
