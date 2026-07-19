"""
Sentiment analysis utilities.

This module uses the VADER Sentiment Analyzer to evaluate
user comments and generate overall sentiment statistics.
"""

from typing import Dict, List, Tuple

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from config import (
    NEGATIVE_THRESHOLD,
    POSITIVE_THRESHOLD,
)

# Initialize once (recommended for AWS Lambda)
analyzer = SentimentIntensityAnalyzer()


def sentiment_score(text: str) -> float:
    """
    Calculate the VADER compound sentiment score.

    Args:
        text: Input text.

    Returns:
        Compound sentiment score in the range [-1.0, 1.0].
    """

    return analyzer.polarity_scores(text)["compound"]


def classify_sentiment(score: float) -> str:
    """
    Convert a compound score into a sentiment label.

    Args:
        score: VADER compound score.

    Returns:
        "Positive", "Negative", or "Neutral".
    """

    if score >= POSITIVE_THRESHOLD:
        return "Positive"

    if score <= NEGATIVE_THRESHOLD:
        return "Negative"

    return "Neutral"


def analyze_sentiment(
    comments: List[str],
) -> Tuple[Dict[str, float], int]:
    """
    Analyze sentiment distribution for a collection of comments.

    Args:
        comments: List of comments.

    Returns:
        Tuple containing:
            - sentiment percentage distribution
            - total comments analyzed
    """

    counts = {
        "Positive": 0,
        "Negative": 0,
        "Neutral": 0,
    }

    for comment in comments:

        label = classify_sentiment(
            sentiment_score(comment)
        )

        counts[label] += 1

    total = len(comments)

    if total == 0:
        return (
            {
                "Positive": 0.0,
                "Negative": 0.0,
                "Neutral": 0.0,
            },
            0,
        )

    distribution = {
        key: round((value / total) * 100, 2)
        for key, value in counts.items()
    }

    return distribution, total


def overall_rating(
    sentiment_distribution: Dict[str, float],
) -> float:
    """
    Convert sentiment percentages into a simple 5-star rating.

    Formula:
        (Positive - Negative) / 100 * 5

    Args:
        sentiment_distribution:
            Sentiment percentage dictionary.

    Returns:
        Rating between 0 and 5.
    """

    rating = (
        sentiment_distribution["Positive"]
        - sentiment_distribution["Negative"]
    ) / 100 * 5

    rating = max(0, min(5, rating))

    return round(rating, 2)