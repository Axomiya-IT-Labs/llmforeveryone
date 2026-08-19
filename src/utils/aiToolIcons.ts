/**
 * Generates DuckDuckGo favicon service URL for any given website URL or domain.
 * Format: https://icons.duckduckgo.com/ip3/{domain}.ico
 */
export function getDuckDuckGoIconUrl(urlOrDomain: string): string {
  try {
    let domain = urlOrDomain;
    if (urlOrDomain.startsWith('http://') || urlOrDomain.startsWith('https://')) {
      const parsed = new URL(urlOrDomain);
      domain = parsed.hostname;
    }
    // Remove leading 'www.' for cleaner matching if present
    domain = domain.replace(/^www\./, '');
    return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  } catch {
    return `https://icons.duckduckgo.com/ip3/openai.com.ico`;
  }
}
