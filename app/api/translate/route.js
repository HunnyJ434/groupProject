export async function POST(req) {
  const { str, translateTo } = await req.json();

  if (!str || !translateTo) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // 🔄 Step 1: Fetch supported languages
    const langRes = await fetch(
      `https://translation.googleapis.com/language/translate/v2/languages?target=en&key=AIzaSyC-0bui2BGQZThrEP-IcyFkWxaXrv-3PeU`
    );
    const langData = await langRes.json();
    const supported = langData.data.languages;

    // 🔄 Step 2: Build name → code map
    const nameToCodeMap = {};
    supported.forEach(({ name, language }) => {
      nameToCodeMap[name] = language;
    });

    // 🔄 Step 3: Convert name to code, fallback to code if already
    const langCode = nameToCodeMap[translateTo] || translateTo;

    // 🧠 Translate request
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=AIzaSyC-0bui2BGQZThrEP-IcyFkWxaXrv-3PeU`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: str,
          target: langCode,
          format: 'text',
        }),
      }
    );

    const data = await res.json();

    const translatedText = data?.data?.translations?.[0]?.translatedText;

    if (!translatedText) {
      throw new Error(data?.error?.message || 'Translation failed');
    }

    return new Response(JSON.stringify({ translation: translatedText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Translation error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
