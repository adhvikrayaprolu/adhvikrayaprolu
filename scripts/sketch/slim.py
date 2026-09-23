# Re-subset embedded fonts in each SVG to only the glyphs that SVG actually uses
import re, base64, io, glob, os, html
from fontTools import subset
srcs = {'Hand': 'node_modules/@fontsource/caveat/files/caveat-latin-700-normal.woff2',
        'Marker': 'node_modules/@fontsource/permanent-marker/files/permanent-marker-latin-400-normal.woff2'}
for path in glob.glob('../../assets/*.svg'):
    s = open(path).read()
    for fam, src in srcs.items():
        texts = re.findall(r'<text[^>]*font-family="%s"[^>]*>(.*?)</text>' % fam, s)
        chars = set(html.unescape(''.join(texts))) | {' '}
        m = re.search(r"(font-family:'%s';src:url\(data:font/woff2;base64,)([A-Za-z0-9+/=]+)" % fam, s)
        if not m: continue
        opts = subset.Options(); opts.flavor = 'woff2'; opts.layout_features = ['*']
        f = subset.load_font(src, opts); sub = subset.Subsetter(opts); sub.populate(text=''.join(chars)); sub.subset(f)
        buf = io.BytesIO(); subset.save_font(f, buf, opts)
        s = s[:m.start(2)] + base64.b64encode(buf.getvalue()).decode() + s[m.end(2):]
    open(path, 'w').write(s)
    print(path, round(os.path.getsize(path)/1024,1), 'KB')
