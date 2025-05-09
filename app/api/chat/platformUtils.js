// Utility functions for platform-related operations

export async function fetchPlatformId(platformName) {
  const platformMapping = {
    "pc": 6,
    "psp":38,
    "PlayStation Portable":38,
    "ps1": 7,
    "ps2": 8,
    "ps3": 9,
    "ps4": 48,
    "ps5": 167,
    "xbox": 11,
    "xbox 360": 12,
    "xbox one": 49,
    "xbox series x": 169,
    "nintendo switch": 130,
    "switch": 130,
    "ios": 39,
    "android": 34
  }

  const normalizedPlatformName = platformName.toLowerCase();
  const platformId = platformMapping[normalizedPlatformName];

  if (platformId) {
    return platformId;
  }

  const response = await fetch("https://api.igdb.com/v4/platforms", {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: `
      fields id;
      where name ~ *"${platformName}"*;
      limit 1;
    `,
  });

  if (!response.ok) throw new Error("Failed to fetch platform ID");

  const data = await response.json();
  return data[0]?.id || null;
}