// Gates the whole installer site behind HTTP Basic Auth. Credentials live only
// in Netlify env vars (OTA_AUTH_USER / OTA_AUTH_PASSWORD), never in the repo.
//
// iOS OTA install is the reason this is an edge function and not Netlify's
// built-in password protection: after the user taps "Install on iOS", the OS
// install daemon fetches the manifest and the .ipa itself, with no browser
// session and no interactive auth prompt. It only sends credentials it finds
// embedded in the URL (which it converts into an Authorization header). So for
// the .plist and the page that builds the install URL, this function injects
// the credentials into the same-host asset URLs on the fly, keeping the
// committed files credential-free.

const REALM = "Bezzy Installs";

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: { "www-authenticate": `Basic realm="${REALM}"` },
  });
}

export default async (request, context) => {
  const user = Netlify.env.get("OTA_AUTH_USER") || "bezzy";
  const password = Netlify.env.get("OTA_AUTH_PASSWORD");

  // Fail closed: if the password isn't configured, deny rather than expose.
  if (!password) {
    return unauthorized();
  }

  const expected = `Basic ${btoa(`${user}:${password}`)}`;
  if (request.headers.get("authorization") !== expected) {
    return unauthorized();
  }

  const response = await context.next();
  const url = new URL(request.url);
  const path = url.pathname;
  const isPlist = path.endsWith(".plist");
  const isHtml = path === "/" || path.endsWith(".html");
  if (!isPlist && !isHtml) {
    return response;
  }

  // Embed credentials into same-host asset URLs so the install daemon's
  // follow-up fetches carry them. `url.host` (not a hardcoded host) keeps this
  // correct on draft deploys, where the host differs from production.
  const cred = `${encodeURIComponent(user)}:${encodeURIComponent(password)}@`;
  const plain = `https://${url.host}`;
  const authed = `https://${cred}${url.host}`;

  const body = (await response.text()).split(plain).join(authed);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(body, { status: response.status, headers });
};
