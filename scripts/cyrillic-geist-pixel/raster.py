import sys, json
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen
P = 38
class Flat(BasePen):
    def __init__(s, gs): super().__init__(gs); s.c=[]; s.cur=[]
    def _moveTo(s,p): s.cur=[p]
    def _lineTo(s,p): s.cur.append(p)
    def _qCurveToOne(s,a,b): s.cur.append(b)
    def _curveToOne(s,a,b,c): s.cur.append(c)
    def _closePath(s): s.c.append(s.cur); s.cur=[]
    _endPath=_closePath
def inside(cs, x, y):
    n=0
    for c in cs:
        for i in range(len(c)):
            (x1,y1),(x2,y2)=c[i],c[(i+1)%len(c)]
            if (y1>y)!=(y2>y) and x < x1+(y-y1)*(x2-x1)/(y2-y1): n+=1
    return n%2==1
def bitmap(f, gs, name):
    pen=Flat(gs); gs[name].draw(pen); cs=pen.c
    adv=f['hmtx'][name][0]
    rows=[]
    for j in range(20, -5, -1):
        rows.append("".join("#" if inside(cs, P*k+19, P*j+19) else "." for k in range(adv//P)))
    return adv//P, rows
if __name__=="__main__":
    f=TTFont(sys.argv[1]); gs=f.getGlyphSet(); cm=f.getBestCmap()
    out={}
    for c in cm:
        if c<0x20 or c>0x24F: continue
        w,rows=bitmap(f,gs,cm[c]); out[chr(c)]={"w":w,"rows":rows}
    json.dump(out, open(sys.argv[2],"w"), ensure_ascii=False)
    for ch in sys.argv[3]:
        print(ch, out[ch]["w"]); print("\n".join(out[ch]["rows"]))
