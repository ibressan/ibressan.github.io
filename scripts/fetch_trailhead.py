"""Busca as estatísticas públicas do Trailhead (GraphQL público, sem login)
e grava public/trailhead.json para o site consumir em runtime.

A API do Trailhead não libera CORS para chamadas do navegador, então esses
dados são buscados aqui, em build time, e servidos como arquivo estático."""

import json
import urllib.request
from pathlib import Path

GRAPHQL_URL = "https://profile.api.trailhead.com/graphql"
SLUG = "ibressan"
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "public" / "trailhead.json"

RANK_QUERY = """
query GetTrailheadRank($slug: String, $hasSlug: Boolean!) {
  profile(slug: $slug) @include(if: $hasSlug) {
    ... on PublicProfile {
      trailheadStats {
        earnedPointsSum
        earnedBadgesCount
        completedTrailCount
        rank {
          title
          imageUrl
        }
      }
    }
  }
}
"""


def graphql(query: str, operation_name: str, variables: dict) -> dict:
    payload = json.dumps(
        {"query": query, "operationName": operation_name, "variables": variables}
    ).encode("utf-8")
    request = urllib.request.Request(
        GRAPHQL_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def main() -> None:
    result = graphql(RANK_QUERY, "GetTrailheadRank", {"slug": SLUG, "hasSlug": True})
    stats = result["data"]["profile"]["trailheadStats"]
    if stats is None:
        print("Trailhead API retornou dados vazios — mantendo trailhead.json anterior.")
        return

    OUTPUT_PATH.write_text(
        json.dumps(
            {
                "rankTitle": stats["rank"]["title"],
                "rankImageUrl": stats["rank"]["imageUrl"],
                "badges": stats["earnedBadgesCount"],
                "points": stats["earnedPointsSum"],
                "trails": stats["completedTrailCount"],
                "profileUrl": f"https://www.salesforce.com/trailblazer/{SLUG}",
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"trailhead.json atualizado em {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
