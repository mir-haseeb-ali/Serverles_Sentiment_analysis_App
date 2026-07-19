"""
Comment filtering utilities.

This module removes spam, promotional content, timestamps,
short comments, and other low-quality comments before
performing sentiment analysis.
"""

import re

from config import (
    GENERIC_PHRASES,
    LOW_QUALITY_PATTERNS,
    MIN_COMMENT_WORDS,
    SPAM_KEYWORDS,
)


def is_valid_comment(text: str) -> bool:
    """
    Validate whether a YouTube comment should be included.

    Filtering criteria:
        - Minimum word count
        - No promotional/spam links
        - No timestamp-only comments
        - No generic low-value comments

    Args:
        text: Raw YouTube comment.

    Returns:
        True if comment is suitable for analysis.
    """

    text = text.strip()

    if not text:
        return False

    text_lower = text.lower()

    # Require sufficient content
    if len(text.split()) < MIN_COMMENT_WORDS:
        return False

    # Reject promotional comments
    if any(keyword in text_lower for keyword in SPAM_KEYWORDS):
        return False

    # Reject comments containing multiple timestamps
    timestamps = re.findall(
        r"\b\d{1,2}:\d{2}(?::\d{2})?\b",
        text
    )

    if len(timestamps) >= 2:
        return False

    # Reject comments beginning with a timestamp
    if re.match(r"^\d{1,2}:\d{2}", text):
        return False

    # Reject known generic comments
    if any(phrase in text_lower for phrase in GENERIC_PHRASES):
        return False

    return True


def is_low_quality(text: str) -> bool:
    """
    Detect low-quality comments.

    Examples:
        - Emoji spam
        - Repeated characters
        - Irrelevant comments

    Args:
        text: Cleaned YouTube comment.

    Returns:
        True if the comment should be discarded.
    """

    if len(set(text)) < 10:
        return True

    if text.count("😂") > 3:
        return True

    text_lower = text.lower()

    if any(pattern in text_lower for pattern in LOW_QUALITY_PATTERNS):
        return True

    return False


def clean_comment(text: str) -> str:
    """
    Normalize a comment before analysis.

    Performs:
        - Trim whitespace
        - Collapse multiple spaces

    Args:
        text: Raw comment.

    Returns:
        Cleaned comment string.
    """

    text = text.strip()

    text = re.sub(r"\s+", " ", text)

    return text


def filter_comments(comments: list[str]) -> list[str]:
    """
    Filter a list of comments.

    Args:
        comments: Raw YouTube comments.

    Returns:
        List containing only high-quality comments.
    """

    filtered = []

    for comment in comments:

        cleaned = clean_comment(comment)

        if (
            is_valid_comment(cleaned)
            and not is_low_quality(cleaned)
        ):
            filtered.append(cleaned)

    return filtered