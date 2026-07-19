"""
YouTube API helper functions.

This module handles:
- Searching review videos
- Fetching YouTube comments
- Filtering comments
"""

import json
import logging
import urllib.error
import urllib.parse
import urllib.request
from typing import Dict, List

from config import (
    DEFAULT_MAX_COMMENTS,
    DEFAULT_MAX_VIDEOS,
    REQUEST_TIMEOUT,
    YOUTUBE_API_KEY,
)
from filters import filter_comments

logger = logging.getLogger(__name__)


def youtube_get(endpoint: str, params: Dict) -> Dict:
    """
    Perform a GET request to the YouTube Data API.

    Args:
        endpoint: YouTube API endpoint.
        params: Query parameters.

    Returns:
        JSON response as a dictionary.

    Raises:
        RuntimeError: If API key is missing.
    """

    if not YOUTUBE_API_KEY:
        raise RuntimeError("YOUTUBE_API_KEY environment variable is missing.")

    params["key"] = YOUTUBE_API_KEY

    url = (
        f"https://www.googleapis.com/youtube/v3/{endpoint}?"
        + urllib.parse.urlencode(params)
    )

    logger.info("Calling YouTube API: %s", endpoint)

    with urllib.request.urlopen(url, timeout=REQUEST_TIMEOUT) as response:
        return json.loads(response.read().decode("utf-8"))


def search_videos(
    product_name: str,
    max_videos: int = DEFAULT_MAX_VIDEOS,
) -> List[Dict]:
    """
    Search YouTube for review videos.

    Args:
        product_name: Product to search.
        max_videos: Maximum videos to return.

    Returns:
        List of video metadata.
    """

    data = youtube_get(
        "search",
        {
            "q": f"{product_name} review",
            "part": "id,snippet",
            "type": "video",
            "maxResults": max_videos,
            "relevanceLanguage": "en",
            "safeSearch": "moderate",
        },
    )

    videos = []

    for item in data.get("items", []):

        video_id = item.get("id", {}).get("videoId")

        if not video_id:
            continue

        videos.append(
            {
                "videoId": video_id,
                "title": item["snippet"]["title"],
                "channel": item["snippet"]["channelTitle"],
            }
        )

    logger.info("Found %d videos", len(videos))

    return videos


def fetch_comments_for_video(
    video_id: str,
    max_comments: int = DEFAULT_MAX_COMMENTS,
) -> List[str]:
    """
    Fetch comments from a single YouTube video.

    Args:
        video_id: YouTube video ID.
        max_comments: Maximum comments.

    Returns:
        List of cleaned comments.
    """

    try:

        data = youtube_get(
            "commentThreads",
            {
                "part": "snippet",
                "videoId": video_id,
                "maxResults": max_comments,
                "textFormat": "plainText",
                "order": "relevance",
            },
        )

        raw_comments = []

        for item in data.get("items", []):

            text = (
                item.get("snippet", {})
                .get("topLevelComment", {})
                .get("snippet", {})
                .get("textDisplay", "")
            )

            if text:
                raw_comments.append(text)

        filtered = filter_comments(raw_comments)

        logger.info(
            "Video %s: %d/%d comments accepted",
            video_id,
            len(filtered),
            len(raw_comments),
        )

        return filtered

    except urllib.error.HTTPError as e:

        logger.error(
            "HTTP Error while fetching comments for %s : %s",
            video_id,
            e,
        )

        return []

    except urllib.error.URLError as e:

        logger.error(
            "Network Error while fetching comments for %s : %s",
            video_id,
            e,
        )

        return []

    except Exception:

        logger.exception(
            "Unexpected error while fetching comments for %s",
            video_id,
        )

        return []


def fetch_youtube_comments(
    product_name: str,
    max_videos: int = DEFAULT_MAX_VIDEOS,
    max_comments_per_video: int = DEFAULT_MAX_COMMENTS,
):
    """
    Fetch comments across multiple review videos.

    Args:
        product_name: Product name.
        max_videos: Number of videos.
        max_comments_per_video: Comments per video.

    Returns:
        Tuple:
            videos,
            comments
    """

    videos = search_videos(
        product_name,
        max_videos,
    )

    comments = []

    for video in videos:

        comments.extend(
            fetch_comments_for_video(
                video["videoId"],
                max_comments_per_video,
            )
        )

    logger.info(
        "Collected %d comments from %d videos",
        len(comments),
        len(videos),
    )

    return videos, comments