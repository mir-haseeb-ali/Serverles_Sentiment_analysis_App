"""
AWS Lambda entry point.

This module orchestrates the complete sentiment analysis workflow.

Workflow:

Client
    ↓
Request Validation
    ↓
Cache Lookup
    ↓
YouTube API
    ↓
Sentiment Analysis
    ↓
Aspect Analysis
    ↓
Keyword Extraction
    ↓
JSON Response
"""

from analysis import (
    aspect_sentiment_analysis,
    confidence_score,
    extract_keywords,
    generate_summary,
    reliability_flag,
)
from cache import cache
from sentiment import (
    analyze_sentiment,
    overall_rating,
)
from utils import (
    configure_logging,
    error_response,
    get_product_name,
    is_options_request,
    json_response,
)
from youtube import fetch_youtube_comments

logger = configure_logging()


def lambda_handler(event, context):
    """
    AWS Lambda entry point.
    """

    # Handle CORS preflight request
    if is_options_request(event):
        return json_response({})

    # Extract product name
    product = get_product_name(event)

    if not product:
        return error_response(
            "Product name is required.",
            400,
        )

    logger.info("Processing request for '%s'", product)

    # ------------------------------------------------------------------
    # Cache
    # ------------------------------------------------------------------

    cached = cache.get(product)

    if cached:

        logger.info("Returning cached response.")

        return json_response(cached)

    # ------------------------------------------------------------------
    # Fetch YouTube data
    # ------------------------------------------------------------------

    videos, comments = fetch_youtube_comments(product)

    if not comments:

        return error_response(
            "No comments found.",
            404,
            product=product,
        )

    # ------------------------------------------------------------------
    # Sentiment Analysis
    # ------------------------------------------------------------------

    sentiment_distribution, total = analyze_sentiment(comments)

    rating = overall_rating(
        sentiment_distribution
    )

    # ------------------------------------------------------------------
    # Advanced Analytics
    # ------------------------------------------------------------------

    aspects = aspect_sentiment_analysis(
        comments
    )

    keywords = extract_keywords(
        comments
    )

    confidence = confidence_score(total)

    reliability = reliability_flag(total)

    summary = generate_summary(
        rating,
        sentiment_distribution,
        aspects,
    )

    # ------------------------------------------------------------------
    # Build Response
    # ------------------------------------------------------------------

    result = {

        "product": product,

        "rating": rating,

        "confidence": confidence,

        "summary": summary,

        "data_reliability": reliability,

        "total_analyzed": total,

        "sentiment_distribution": sentiment_distribution,

        "aspect_analysis": aspects,

        "trending_keywords": keywords,

        "top_comments": comments[:5],

        "videos": videos,

        "meta": {

            "videos_scanned": len(videos),

            "comments_collected": total,

        },
    }

    # ------------------------------------------------------------------
    # Cache Result
    # ------------------------------------------------------------------

    cache.set(product, result)

    logger.info(
        "Analysis completed successfully."
    )

    return json_response(result)