"""
Simple in-memory cache for AWS Lambda.

This cache persists only while the Lambda execution
environment remains warm.

Features:
- Time-to-Live (TTL)
- Cache hit/miss logging
- Easy replacement with Redis or DynamoDB
"""

import logging
import time
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)

# Default cache lifetime (seconds)
DEFAULT_TTL = 3600  # 1 hour


class MemoryCache:
    """
    Simple in-memory cache.

    Data survives only for the lifetime of the
    current Lambda execution environment.
    """

    def __init__(self):

        self._cache: Dict[str, Dict[str, Any]] = {}

    def get(self, key: str) -> Optional[Any]:
        """
        Retrieve cached value.

        Args:
            key: Cache key.

        Returns:
            Cached object or None.
        """

        item = self._cache.get(key)

        if item is None:
            logger.info("Cache MISS: %s", key)
            return None

        if item["expires_at"] < time.time():

            logger.info("Cache EXPIRED: %s", key)

            del self._cache[key]

            return None

        logger.info("Cache HIT: %s", key)

        return item["value"]

    def set(
        self,
        key: str,
        value: Any,
        ttl: int = DEFAULT_TTL,
    ) -> None:
        """
        Store object in cache.

        Args:
            key:
                Cache key.

            value:
                Object to cache.

            ttl:
                Time-to-live in seconds.
        """

        self._cache[key] = {
            "value": value,
            "expires_at": time.time() + ttl,
        }

        logger.info(
            "Cached '%s' for %d seconds",
            key,
            ttl,
        )

    def delete(self, key: str) -> None:
        """
        Remove cache entry.
        """

        self._cache.pop(key, None)

    def clear(self) -> None:
        """
        Clear entire cache.
        """

        self._cache.clear()

        logger.info("Cache cleared.")

    def size(self) -> int:
        """
        Number of cached objects.
        """

        return len(self._cache)


# Singleton cache instance
cache = MemoryCache()