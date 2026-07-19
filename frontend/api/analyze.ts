import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({
      error: "Missing or invalid product query.",
    });
  }

  if (!API_BASE_URL) {
    console.error("API_BASE_URL environment variable is not configured.");

    return res.status(500).json({
      error: "Server configuration error.",
    });
  }

  const endpoint = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  try {
    console.log(`[API] Fetching sentiment for "${query}"`);

    const response = await axios.get(endpoint, {
      params: {
        query,
      },
      timeout: 25000,
    });

    // Cache responses on Vercel Edge
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate"
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error("[Backend Error]", error.message);

    return res.status(error.response?.status || 500).json({
      error: "Backend communication failed.",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error.",
    });
  }
}