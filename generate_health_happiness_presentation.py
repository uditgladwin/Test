#!/usr/bin/env python3
"""Generate the "Effect of Health on Happiness" PowerPoint presentation."""

from pptx import Presentation
from pptx.util import Pt

TITLE_TEXT = "Effect of Health on Happiness"
OUTPUT_FILENAME = "health_happiness_presentation.pptx"

INTRO_POINTS = [
    "Health and happiness are intertwined pillars of overall well-being.",
    "Positive health behaviors fuel emotional balance, resilience, and life satisfaction.",
    "Unmanaged health challenges can diminish day-to-day joy and perceived quality of life.",
]

PHYSICAL_HEALTH_POINTS = [
    {"text": "Exercise", "bold": True},
    {
        "text": "Releases endorphins that elevate mood and reduce symptoms of depression",
        "level": 1,
    },
    {
        "text": "Improves cardiovascular health, energy levels, and confidence",
        "level": 1,
    },
    {"text": "Nutrition", "bold": True},
    {
        "text": "Balanced meals fuel brain function and stabilize blood sugar for steady energy",
        "level": 1,
    },
    {
        "text": "Vitamins and minerals support hormone production linked to mood",
        "level": 1,
    },
    {"text": "Sleep", "bold": True},
    {
        "text": "Consistent, restorative sleep regulates stress hormones and emotional responses",
        "level": 1,
    },
    {
        "text": "Sleep deprivation increases irritability and impairs decision-making",
        "level": 1,
    },
]

MENTAL_HEALTH_POINTS = [
    {
        "text": "Stress management techniques (mindfulness, breathing, time management)",
    },
    {
        "text": "Lower perceived stress improves satisfaction with relationships and work",
        "level": 1,
    },
    {"text": "Access to mental health support", "bold": True},
    {
        "text": "Counseling and peer support reduce anxiety and foster optimism",
        "level": 1,
    },
    {"text": "Mental well-being", "bold": True},
    {
        "text": "Positive self-talk and emotional resilience promote life enjoyment",
        "level": 1,
    },
    {
        "text": "Isolation or burnout can erode happiness even when physical health is strong",
        "level": 1,
    },
]

RESEARCH_POINTS = [
    "Gallup Global Emotions Report (2023) links daily movement with a 20% higher positive experience score.",
    "Harvard Study of Adult Development highlights that long-term health habits underpin life satisfaction in later years.",
    "World Health Organization estimates depression and anxiety cost $1 trillion annually in productivity, reflecting their impact on happiness.",
]

LIFESTYLE_POINTS = [
    {"text": "Nutritious diet", "bold": True},
    {
        "text": "Prioritize whole foods, hydration, and balanced meals for sustained vitality",
        "level": 1,
    },
    {"text": "Regular movement", "bold": True},
    {
        "text": "Blend aerobic, strength, and flexibility activities to enhance mood",
        "level": 1,
    },
    {"text": "Social connections", "bold": True},
    {
        "text": "Supportive relationships buffer stress and increase life satisfaction",
        "level": 1,
    },
    {
        "text": "Recovery rituals", "bold": True},
    {
        "text": "Quality sleep and downtime help restore mental and emotional resources",
        "level": 1,
    },
]

CONCLUSION_POINTS = [
    "Health is a cornerstone of happiness that encompasses physical, mental, and social well-being.",
    "Intentional habits—movement, nourishment, connection, and rest—create a positive feedback loop with mood.",
    "Investing in preventive care and mental health support leads to more resilient, joyful lives.",
]


def add_title_slide(presentation: Presentation) -> None:
    """Add the opening title slide."""
    title_slide_layout = presentation.slide_layouts[0]
    slide = presentation.slides.add_slide(title_slide_layout)
    slide.shapes.title.text = TITLE_TEXT
    subtitle = slide.placeholders[1]
    subtitle.text = (
        "Exploring how physical and mental well-being influence life satisfaction"
    )


def add_bullet_slide(
    presentation: Presentation, title: str, bullet_points
) -> None:
    """Add a content slide with bullet points."""
    bullet_slide_layout = presentation.slide_layouts[1]
    slide = presentation.slides.add_slide(bullet_slide_layout)
    slide.shapes.title.text = title

    text_frame = slide.shapes.placeholders[1].text_frame
    text_frame.clear()
    text_frame.word_wrap = True

    for index, bullet in enumerate(bullet_points):
        text, level, bold = normalize_bullet_point(bullet)
        paragraph = (
            text_frame.paragraphs[0]
            if index == 0
            else text_frame.add_paragraph()
        )
        paragraph.text = text
        paragraph.level = level
        paragraph.font.name = "Calibri"
        paragraph.font.size = Pt(26 if level == 0 else 24)
        paragraph.font.bold = bold


def normalize_bullet_point(bullet):
    """Ensure bullet points have consistent structure."""
    if isinstance(bullet, dict):
        text = str(bullet.get("text", "")).strip()
        level = int(bullet.get("level", 0))
        bold = bool(bullet.get("bold", False))
    else:
        text = str(bullet).strip()
        level = 0
        bold = False
    return text, max(level, 0), bold


def build_presentation() -> Presentation:
    """Create the presentation with the required slides."""
    presentation = Presentation()
    add_title_slide(presentation)
    add_bullet_slide(presentation, "Introduction", INTRO_POINTS)
    add_bullet_slide(presentation, "Physical Health Impacts", PHYSICAL_HEALTH_POINTS)
    add_bullet_slide(presentation, "Mental Health Impacts", MENTAL_HEALTH_POINTS)
    add_bullet_slide(presentation, "Research Findings & Statistics", RESEARCH_POINTS)
    add_bullet_slide(presentation, "Lifestyle Factors", LIFESTYLE_POINTS)
    add_bullet_slide(presentation, "Conclusion & Key Takeaways", CONCLUSION_POINTS)
    return presentation


def main() -> None:
    """Generate and save the presentation."""
    presentation = build_presentation()
    presentation.save(OUTPUT_FILENAME)
    print(f"Presentation saved to {OUTPUT_FILENAME}")


if __name__ == "__main__":
    main()
