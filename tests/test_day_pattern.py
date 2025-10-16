"""Tests for day pattern parsing."""

from simulator.constraints import DayOfWeek, DayPattern


def test_day_pattern_from_compound_string() -> None:
    pattern = DayPattern.from_string("MWF")
    assert pattern.days == (
        DayOfWeek.MONDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.FRIDAY,
    )


def test_day_pattern_from_comma_separated_string() -> None:
    pattern = DayPattern.from_string("Mon,Wed,Fri")
    assert pattern.days == (
        DayOfWeek.MONDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.FRIDAY,
    )


def test_day_pattern_from_hyphenated_string() -> None:
    pattern = DayPattern.from_string("Tue-Thu")
    assert pattern.days == (
        DayOfWeek.TUESDAY,
        DayOfWeek.THURSDAY,
    )


def test_day_pattern_weekdays() -> None:
    pattern = DayPattern.weekdays()
    assert pattern.days == (
        DayOfWeek.MONDAY,
        DayOfWeek.TUESDAY,
        DayOfWeek.WEDNESDAY,
        DayOfWeek.THURSDAY,
        DayOfWeek.FRIDAY,
    )
