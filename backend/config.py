"""
Application configuration and constants.

This module centralizes application-wide configuration, API settings,
sentiment thresholds, keyword mappings, stopwords, and CORS headers.
"""

import os

# =============================================================================
# API CONFIGURATION
# =============================================================================

YOUTUBE_API_KEY = os.environ.get("YOUTUBE_API_KEY")

# =============================================================================
# YOUTUBE SETTINGS
# =============================================================================

DEFAULT_MAX_VIDEOS = 5
DEFAULT_MAX_COMMENTS = 10
REQUEST_TIMEOUT = 10

# =============================================================================
# SENTIMENT THRESHOLDS
# =============================================================================

POSITIVE_THRESHOLD = 0.05
NEGATIVE_THRESHOLD = -0.05

# =============================================================================
# CONFIDENCE SCORE THRESHOLDS
# =============================================================================

HIGH_CONFIDENCE_THRESHOLD = 30
MEDIUM_CONFIDENCE_THRESHOLD = 15

# =============================================================================
# RELIABILITY THRESHOLD
# =============================================================================

MIN_RELIABLE_SAMPLE = 20

# =============================================================================
# ASPECT ANALYSIS
# =============================================================================

MIN_ASPECT_MENTIONS = 3

ASPECT_KEYWORDS = {
    "battery": [
        "battery",
        "charging",
        "charge",
        "drain",
        "backup"
    ],
    "camera": [
        "camera",
        "photo",
        "photos",
        "picture",
        "pictures",
        "video",
        "lens"
    ],
    "performance": [
        "performance",
        "speed",
        "fast",
        "slow",
        "lag",
        "processor",
        "gaming"
    ],
    "price": [
        "price",
        "cost",
        "expensive",
        "cheap",
        "value",
        "budget"
    ]
}

# =============================================================================
# COMMENT FILTERING
# =============================================================================

MIN_COMMENT_WORDS = 8

SPAM_KEYWORDS = [
    "http",
    "https",
    "www",
    ".com",
    ".in",
    ".ly",
    "buy",
    "sale",
    "offer",
    "discount",
    "subscribe",
    "channel",
    "link"
]

GENERIC_PHRASES = [
    "same as last year",
    "nothing exciting"
]

LOW_QUALITY_PATTERNS = [
    "shirt",
    "ripped",
    "subscribe",
    "lol",
    "😂"
]

# =============================================================================
# STOPWORDS
# =============================================================================

STOPWORDS = {
    "this", "that", "with", "have", "from",
    "they", "their", "there", "about",
    "would", "could", "should", "after",
    "before", "your", "just", "like",
    "what", "when", "where", "which",
    "while", "still", "been", "being",
    "also", "very", "more", "than",
    "some", "such", "only", "other",
    "year", "years", "using", "phone",
    "iphone", "apple", "good", "great",
    "best", "nice", "awesome", "amazing",
    "love", "happy"
}

# =============================================================================
# CACHE
# =============================================================================

CACHE_ENABLED = True

# =============================================================================
# CORS
# =============================================================================

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Content-Type": "application/json",
}