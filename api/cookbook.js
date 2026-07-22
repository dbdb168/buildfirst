// api/cookbook.js — BuildFirst → The AI Cookbook (Substack) feed proxy.
//
// Fetches and parses the AI Cookbook Substack RSS feed server-side (avoids the
// browser CORS block), normalises each post, and returns JSON. Responses are
// edge-cached for an hour (with a day of stale-while-revalidate) so the
// homepage always shows fresh posts without hammering Substack. Zero deps —
// runs on the Vercel Node runtime.

const FEED_URL = 'https://theaicookbook.substack.com/feed';

function safeCodePoint(n) {
  try { return String.fromCodePoint(n); } catch (_) { return ''; }
}

function decodeEntities(s) {
  return (s || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => safeCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => safeCodePoint(parseInt(n, 10)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();
}

function tagText(block, name) {
  const re = new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>');
  const m = block.match(re);
  return m ? decodeEntities(m[1]) : '';
}

// Strip leading markdown heading markers that occasionally leak into titles.
function cleanTitle(t) {
  return (t || '').replace(/^#+\s*/, '').trim();
}

function formatDate(pub) {
  const d = new Date(pub);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

// Ask Substack's image CDN for a card-appropriate width to keep payloads light.
function sizedImage(u) {
  if (!u) return '';
  return u.includes(',f_auto,q_auto')
    ? u.replace(',f_auto,q_auto:good,', ',w_848,c_limit,f_auto,q_auto:good,')
    : u;
}

function parseFeed(xml, limit) {
  const posts = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null && posts.length < limit) {
    const block = m[1];
    const title = cleanTitle(tagText(block, 'title'));
    const link = tagText(block, 'link');
    if (!title || !link) continue;
    const encl = block.match(/<enclosure\s+url="([^"]+)"/i);
    posts.push({
      title,
      link,
      date: formatDate(tagText(block, 'pubDate')),
      author: tagText(block, 'dc:creator') || 'David Beath',
      image: sizedImage(encl ? decodeEntities(encl[1]) : ''),
      excerpt: tagText(block, 'description').slice(0, 200)
    });
  }
  return posts;
}

module.exports = async (req, res) => {
  let limit = 4;
  try {
    const q = new URL(req.url || '', 'http://localhost').searchParams.get('limit');
    if (q) limit = parseInt(q, 10);
  } catch (_) { /* keep default */ }
  if (!Number.isFinite(limit) || limit < 1) limit = 4;
  if (limit > 12) limit = 12;

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const upstream = await fetch(FEED_URL, {
      signal: ctrl.signal,
      headers: { 'user-agent': 'BuildFirst-site/1.0 (+https://buildfirst.io)' }
    });
    clearTimeout(timer);
    if (!upstream.ok) throw new Error('Upstream responded ' + upstream.status);

    const xml = await upstream.text();
    const posts = parseFeed(xml, limit);

    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json({
      posts,
      count: posts.length,
      source: 'https://theaicookbook.substack.com'
    });
  } catch (err) {
    // Never cache a failure — let the homepage fall back to its baked-in cards.
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json({ posts: [], error: String((err && err.message) || err) });
  }
};
