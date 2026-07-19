"""
Advanced analytics utilities.

This module provides:
- Aspect-based sentiment analysis
- Keyword extraction
- Confidence estimation
- Data reliability checks
- Human-readable summaries
"""

import re
from collections import Counter
from typing import Dict, List

from config import (
    ASPECT_KEYWORDS,
    HIGH_CONFIDENCE_THRESHOLD,
    MEDIUM_CONFIDENCE_THRESHOLD,
    MIN_ASPECT_MENTIONS,
    MIN_RELIABLE_SAMPLE,
    STOPWORDS,
)

from sentiment import sentiment_score


def aspect_sentiment_analysis(
    comments: List[str],
) -> Dict[str, Dict]:
    """
    Perform aspect-based sentiment analysis.

    Args:
        comments: List of user comments.

    Returns:
        Dictionary containing sentiment statistics
        for each detected aspect.
    """

    results = {}

    for aspect, keywords in ASPECT_KEYWORDS.items():

        positive = 0
        negative = 0
        neutral = 0
        mentions = 0

        for comment in comments:

            comment_lower = comment.lower()

            if not any(word in comment_lower for word in keywords):
                continue

            mentions += 1

            score = sentiment_score(comment)

            if score >= 0.05:
                positive += 1
            elif score <= -0.05:
                negative += 1
            else:
                neutral += 1

        if mentions < MIN_ASPECT_MENTIONS:
            continue

        results[aspect] = {
            "Positive%": round((positive / mentions) * 100, 2),
            "Negative%": round((negative / mentions) * 100, 2),
            "Neutral%": round((neutral / mentions) * 100, 2),
            "mentions": mentions,
        }

    return results


def extract_keywords(
    comments: List[str],
    top_n: int = 10,
) -> List[str]:
    """
    Extract frequently occurring keywords.

    Args:
        comments: List of comments.
        top_n: Number of keywords.

    Returns:
        List of keywords.
    """

    words = []

    for comment in comments:

        tokens = re.findall(
            r"\b[a-zA-Z]{4,}\b",
            comment.lower(),
        )

        words.extend(
            word
            for word in tokens
            if word not in STOPWORDS
        )

    return [
        word
        for word, _ in Counter(words).most_common(top_n)
    ]


def confidence_score(total_comments: int) -> str:
    """
    Estimate confidence based on sample size.

    Args:
        total_comments: Number of analyzed comments.

    Returns:
        High, Medium or Low.
    """

    if total_comments >= HIGH_CONFIDENCE_THRESHOLD:
        return "High"

    if total_comments >= MEDIUM_CONFIDENCE_THRESHOLD:
        return "Medium"

    return "Low"


def reliability_flag(total_comments: int) -> str:
    """
    Estimate data reliability.

    Args:
        total_comments: Number of analyzed comments.

    Returns:
        Human-readable reliability message.
    """

    if total_comments < MIN_RELIABLE_SAMPLE:
        return (
            "Low sample size. "
            "Insights may be less reliable."
        )

    return "Sufficient data for analysis."


def generate_summary(
    rating: float,
    sentiment_distribution: Dict[str, float],
    aspects: Dict[str, Dict],
) -> str:
    """
    Generate a human-readable summary.

    Args:
        sentiment_distribution:
            Overall sentiment percentages.

        aspects:
            Aspect sentiment analysis.

    Returns:
        Summary sentence.
    """

    positive = sentiment_distribution["Positive"]
    negative = sentiment_distribution["Negative"]

    if positive >= 70:
        opening = (
            "Overall customer sentiment is strongly positive."
        )

    elif positive >= 50:
        opening = (
            "Overall customer sentiment is generally positive."
        )

    elif negative >= 50:
        opening = (
            "Overall customer sentiment is largely negative."
        )

    else:
        opening = (
            "Customer opinions are mixed."
        )

    positives = []
    negatives = []

    for aspect, values in aspects.items():

        if values["Positive%"] >= 60:
            positives.append(aspect)

        if values["Negative%"] >= 40:
            negatives.append(aspect)

    summary = opening

    if positives:
        summary += (
            " Users particularly appreciate "
            + ", ".join(positives)
            + "."
        )

    if negatives:
        summary += (
            " Common concerns include "
            + ", ".join(negatives)
            + "."
        )

    return summary