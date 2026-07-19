"""
General utility functions.

This module contains reusable helper functions for:

- Parsing Lambda requests
- Building JSON responses
- Building error responses
- Product name sanitization
- Logging configuration
"""

import json
import logging
from typing import Any, Dict, Optional

from config import CORS_HEADERS


def configure_logging() -> logging.Logger:
    """
    Configure the application logger.

    Returns:
        Configured logger.
    """

    logger = logging.getLogger()

    if not logger.handlers:
        logging.basicConfig(level=logging.INFO)

    logger.setLevel(logging.INFO)

    return logger


def json_response(
    body: Dict[str, Any],
    status_code: int = 200,
) -> Dict[str, Any]:
    """
    Create a Lambda JSON response.

    Args:
        body:
            Response payload.

        status_code:
            HTTP status code.

    Returns:
        Lambda-compatible response.
    """

    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": json.dumps(body),
    }


def error_response(
    message: str,
    status_code: int = 400,
    **extra: Any,
) -> Dict[str, Any]:
    """
    Create an error response.

    Example:
        error_response(
            "No comments found",
            404,
            product="iPhone 16"
        )

    Args:
        message:
            Error message.

        status_code:
            HTTP status.

        extra:
            Additional JSON fields.

    Returns:
        Lambda response.
    """

    payload = {
        "error": message,
    }

    payload.update(extra)

    return json_response(
        payload,
        status_code,
    )


def sanitize_product_name(
    product: str,
) -> str:
    """
    Normalize product names.

    Removes:

    - leading/trailing spaces
    - double quotes
    - repeated whitespace

    Args:
        product:
            User input.

    Returns:
        Cleaned product name.
    """

    if not product:
        return ""

    product = product.strip()

    product = product.replace('"', "")

    product = " ".join(product.split())

    return product


def get_product_name(
    event: Dict[str, Any],
) -> str:
    """
    Extract product name from Lambda event.

    Supports:

    GET
        /?query=iphone

    POST

        {
            "product":"iphone"
        }

    Args:
        event:
            AWS Lambda event.

    Returns:
        Product name.
    """

    product = ""

    query = event.get("queryStringParameters")

    if query:

        product = query.get("query", "")

    if not product:

        try:

            body = json.loads(
                event.get("body") or "{}"
            )

            product = body.get(
                "product",
                "",
            )

        except (
            json.JSONDecodeError,
            TypeError,
        ):

            product = ""

    return sanitize_product_name(product)


def is_options_request(
    event: Dict[str, Any],
) -> bool:
    """
    Determine whether the request is
    an HTTP OPTIONS request.

    Args:
        event:
            Lambda event.

    Returns:
        True if OPTIONS.
    """

    return event.get("httpMethod") == "OPTIONS"