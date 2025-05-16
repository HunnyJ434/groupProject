import { Translate } from '@google-cloud/translate/build/src/v2';

const translate = new Translate({
  key: 'AIzaSyC-0bui2BGQZThrEP-IcyFkWxaXrv-3PeU',
});


export async function GET() {
  try {
    const [languages] = await translate.getLanguages('en');
    return new Response(JSON.stringify(languages), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
