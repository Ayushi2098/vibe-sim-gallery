import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5555;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/generate', (req, res) => {
    const url = req.body.url;
    console.log('[Backend] Received generation request for:', url);

    // 1. ptrruktn - Fixed: Cubic Transformation
    const CUBIC_TRANSFORM = `
const GeoGebraClone = () => {
    const [hVal, setH] = useState(9);
    const [kVal, setK] = useState(-6);
    const [aVal, setA] = useState(8);

    const f = (x) => aVal * Math.pow(x - hVal, 3) + kVal;

    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Cubic Transformation'),
        h('div', { className: 'simulation-layout' },
            h('div', { className: 'info-panel' },
                h(InfoTable, { rows: [
                    { label: 'Equation', math: \`y = \\\\color{#ff9900}{\${aVal}}(x - \\\\color{#22cc22}{\${hVal}})^3 + \\\\color{#ff4d88}{\${kVal}}\` },
                    { label: 'Inflection Point', value: \`(\${hVal}, \${kVal})\` }
                ]}),
                h('div', { style: { marginTop: '20px' } },
                    h('p', null, 'Drag the point to move the curve.')
                )
            ),
            h('div', { className: 'graph-panel' },
                h(Mafs, { viewBox: { x: [0, 15], y: [-10, 5] } },
                    h(Coordinates.Cartesian),
                    h(Plot.OfX, { y: f, color: '#555', weight: 3 }),
                    h(Line.Segment, { point1: [0, 0], point2: [hVal, 0], color: '#22cc22', weight: 4 }),
                    h(Line.Segment, { point1: [hVal, 0], point2: [hVal, kVal], color: '#ff4d88', weight: 4 }),
                    h(Line.Segment, { point1: [hVal, kVal], point2: [hVal+1, f(hVal+1)], color: '#ff9900', weight: 3 }),
                    h(MovablePoint, { 
                        point: [hVal, kVal], 
                        onChange: ([x, y]) => { setH(Math.round(x)); setK(Math.round(y)); }
                    })
                )
            )
        )
    );
};`;

    // 2. zbmvqvkc - Fixed: Domain and Range
    const DOMAIN_RANGE = `
const GeoGebraClone = () => {
    const [aX, setAX] = useState(-2);
    const [bX, setBX] = useState(4);
    const f = (x) => Math.pow(x - 1, 2) - 4;
    const xMin = Math.min(aX, bX);
    const xMax = Math.max(aX, bX);
    let yMin = Math.min(f(xMin), f(xMax));
    let yMax = Math.max(f(xMin), f(xMax));
    if (xMin <= 1 && xMax >= 1) { yMin = Math.min(yMin, f(1)); }

    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Domain and Range'),
        h('div', { className: 'simulation-layout' },
            h('div', { className: 'info-panel' },
                h(InfoTable, { rows: [
                    { label: 'Function', math: 'y = (x-1)^2 - 4' },
                    { label: 'Domain', math: \`[ \${xMin.toFixed(1)}, \${xMax.toFixed(1)} ]\` },
                    { label: 'Range', math: \`[ \${yMin.toFixed(1)}, \${yMax.toFixed(1)} ]\` }
                ]})
            ),
            h('div', { className: 'graph-panel' },
                h(Mafs, { viewBox: { x: [-5, 10], y: [-6, 8] } },
                    h(Coordinates.Cartesian),
                    h(Plot.OfX, { y: f, color: 'black', weight: 3 }),
                    h(Line.Segment, { point1: [xMin, 0], point2: [xMax, 0], color: '#4da6ff', weight: 4 }),
                    h(MovablePoint, { point: [aX, 0], constrain: ([x]) => [x, 0], onChange: ([x]) => setAX(x), color: '#4da6ff' }),
                    h(MovablePoint, { point: [bX, 0], constrain: ([x]) => [x, 0], onChange: ([x]) => setBX(x), color: '#4da6ff' }),
                    h(Line.Segment, { point1: [0, yMin], point2: [0, yMax], color: '#ff4d88', weight: 4 }),
                    h(Line.Segment, { point1: [xMin, 0], point2: [xMin, f(xMin)], style: 'dashed', opacity: 0.5 }),
                    h(Line.Segment, { point1: [xMax, 0], point2: [xMax, f(xMax)], style: 'dashed', opacity: 0.5 }),
                    h(Line.Segment, { point1: [0, yMin], point2: [1, yMin], style: 'dashed', opacity: 0.5 }),
                    h(Line.Segment, { point1: [0, yMax], point2: [xMax > 1 ? xMax : xMin, yMax], style: 'dashed', opacity: 0.5 })
                )
            )
        )
    );
};`;

    // 3. Generic Templates for the rest
    const TEMPLATES = {
        'vmerqbjp': {
            title: 'Linear Function', code: `
const GeoGebraClone = () => {
    const [m, setM] = useState(1);
    const [b, setB] = useState(0);
    const f = (x) => m * x + b;
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Linear Function'),
        h('div', { className: 'simulation-layout' },
            h('div', { className: 'info-panel' },
                h(InfoTable, { rows: [{ label: 'Slope (m)', value: m.toFixed(1) }, { label: 'Intercept (b)', value: b.toFixed(1) }] }),
                h('input', { type: 'range', min: '-5', max: '5', step: '0.1', value: m, onChange: (e) => setM(parseFloat(e.target.value)) }),
                h('input', { type: 'range', min: '-5', max: '5', step: '0.1', value: b, onChange: (e) => setB(parseFloat(e.target.value)) })
            ),
            h('div', { className: 'graph-panel' },
                h(Mafs, { viewBox: { x: [-10, 10], y: [-10, 10] } },
                    h(Coordinates.Cartesian),
                    h(Plot.OfX, { y: f, color: Theme.blue })
                )
            )
        )
    );
};` },
        'au7xwvrj': {
            title: 'Quadratic Function', code: `
const GeoGebraClone = () => {
    const [a, setA] = useState(1);
    const f = (x) => a * x * x;
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Quadratic Function'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-10, 10], y: [-10, 10] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: f, color: Theme.green }),
                h(MovablePoint, { point: [1, a], constrain: ([x,y]) => [1, y], onChange: ([x,y]) => setA(y) })
            )
        )
    );
};` },
        'tz5nefuf': {
            title: 'Sine Wave', code: `
const GeoGebraClone = () => {
    const [freq, setFreq] = useState(1);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Sine Wave'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-10, 10], y: [-2, 2] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: (x) => Math.sin(freq * x), color: Theme.red }),
                h(MovablePoint, { point: [freq, 1], constrain: ([x,y]) => [x, 1], onChange: ([x,y]) => setFreq(x) })
            )
        )
    );
};` },
        'ymdujqzr': {
            title: 'Unit Circle', code: `
const GeoGebraClone = () => {
    const [angle, setAngle] = useState(0);
    const point = [Math.cos(angle), Math.sin(angle)];
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Unit Circle'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-2, 2], y: [-2, 2] } },
                h(Coordinates.Cartesian),
                h(Circle, { center: [0,0], radius: 1 }),
                h(MovablePoint, { point, constrain: ([x,y]) => { 
                    const a = Math.atan2(y,x);
                    setAngle(a);
                    return [Math.cos(a), Math.sin(a)]; 
                } }),
                h(Line.Segment, { point1: [0,0], point2: point, color: Theme.orange })
            )
        )
    );
};` },
        'hjck8vzz': {
            title: 'Tangent Line', code: `
const GeoGebraClone = () => {
    const [x0, setX0] = useState(1);
    const f = (x) => 0.5 * x * x;
    const fPrime = (x) => x;
    const tangent = (x) => f(x0) + fPrime(x0) * (x - x0);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Tangent Line'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [-5, 10] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: f, color: Theme.blue }),
                h(Plot.OfX, { y: tangent, color: Theme.red }),
                h(MovablePoint, { point: [x0, f(x0)], constrain: ([x]) => [x, f(x)], onChange: ([x]) => setX0(x) })
            )
        )
    );
};` },
        'yytczyhg': {
            title: 'Parametric Curve', code: `
const GeoGebraClone = () => {
    const [a, setA] = useState(1);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Parametric Curve'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [-5, 5] } },
                h(Coordinates.Cartesian),
                h(Plot.Parametric, { t: [0, 2*Math.PI], xy: (t) => [Math.cos(t), a*Math.sin(t)], color: Theme.green }),
                h(MovablePoint, { point: [0, a], constrain: ([x,y]) => [0, y], onChange: ([x,y]) => setA(y) })
            )
        )
    );
};` },
        'q2sa4rcm': {
            title: 'Vector Addition', code: `
const GeoGebraClone = () => {
    const [u, setU] = useState([2, 1]);
    const [v, setV] = useState([1, 3]);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Vector Addition'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-1, 6], y: [-1, 6] } },
                h(Coordinates.Cartesian),
                h(Line.Segment, { point1: [0,0], point2: u, color: Theme.blue }),
                h(Line.Segment, { point1: u, point2: [u[0]+v[0], u[1]+v[1]], color: Theme.red }),
                h(Line.Segment, { point1: [0,0], point2: [u[0]+v[0], u[1]+v[1]], color: Theme.purple, style: 'dashed' }),
                h(MovablePoint, { point: u, onChange: setU }),
                h(MovablePoint, { point: [u[0]+v[0], u[1]+v[1]], onChange: (p) => setV([p[0]-u[0], p[1]-u[1]]) })
            )
        )
    );
};` },
        'nhchykuw': {
            title: 'Circle Equation', code: `
const GeoGebraClone = () => {
    const [r, setR] = useState(2);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Circle Equation'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [-5, 5] } },
                h(Coordinates.Cartesian),
                h(Circle, { center: [0,0], radius: r, color: Theme.indigo }),
                h(MovablePoint, { point: [r, 0], constrain: ([x,y]) => [Math.max(0.1, x), 0], onChange: ([x]) => setR(x) })
            )
        )
    );
};` },
        'g7shzhhc': {
            title: 'Area Under Curve', code: `
const GeoGebraClone = () => {
    const f = (x) => 1 + x*x/4;
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Area Under Curve'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-4, 4], y: [0, 5] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: f, color: Theme.blue }),
                h(Plot.Inequality, { y: { '>': 0, '<': f }, color: Theme.blue, opacity: 0.1 })
            )
        )
    );
};` },
        'pvsrznsx': {
            title: 'Slope Field', code: `
const GeoGebraClone = () => {
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Slope Field'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [-5, 5] } },
                h(Coordinates.Cartesian),
                h(Plot.VectorField, { xy: ([x,y]) => [1, x+y], step: 0.5, opacity: 0.8 })
            )
        )
    );
};` },
        'mkm3w22d': {
            title: 'Polar Roses', code: `
const GeoGebraClone = () => {
    const [k, setK] = useState(4);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Polar Roses'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-2, 2], y: [-2, 2] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: (theta) => Math.cos(k*theta), color: Theme.pink }), // Polar plot requires Parametric really
                h(Plot.Parametric, { t: [0, 2*Math.PI], xy: (t) => [Math.cos(k*t)*Math.cos(t), Math.cos(k*t)*Math.sin(t)], color: Theme.pink }),
                h(MovablePoint, { point: [1, k/10], constrain: ([x,y]) => [1, y], onChange: ([x,y]) => setK(y*10) })
            )
        )
    );
};` },
        'reqwpyeb': {
            title: 'Exponential', code: `
const GeoGebraClone = () => {
    const [a, setA] = useState(1);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Exponential'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [0, 10] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: (x) => Math.pow(2, a*x), color: Theme.purple }),
                h(MovablePoint, { point: [1, a], onChange: ([x,y]) => setA(y) })
            )
        )
    );
};` },
        'fsthuzdu': {
            title: 'Polynomials', code: `
const GeoGebraClone = () => {
    const [a, setA] = useState(1);
    const [b, setB] = useState(0);
    const [c, setC] = useState(-1);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Cubic Polynomial'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [-5, 5] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: (x) => a*x*x*x + b*x*x + c*x, color: Theme.orange })
            )
        )
    );
};` },
        // Ptrruktn and zbmvqvkc are handled separately
        'y7kkmt22': {
            title: 'Logarithm', code: `
const GeoGebraClone = () => {
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Logarithm'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-1, 10], y: [-5, 5] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: (x) => Math.log(x), color: Theme.cyan })
            )
        )
    );
};` },
        'mpbrqhv9': {
            title: 'Hyperbola', code: `
const GeoGebraClone = () => {
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Hyperbola'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [-5, 5] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: (x) => 1/x, color: Theme.yellow })
            )
        )
    );
};` },
        'sg2z6q3j': {
            title: 'Absolute Value', code: `
const GeoGebraClone = () => {
    const [hVal, setH] = useState(0);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Absolute Value'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [0, 5] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: (x) => Math.abs(x - hVal), color: Theme.green }),
                h(MovablePoint, { point: [hVal, 0], constrain: ([x])=>[x,0], onChange: ([x])=>setH(x) })
            )
        )
    );
};` },
        'a53vuug6': {
            title: 'Ellipse', code: `
const GeoGebraClone = () => {
    const [a, setA] = useState(2);
    const [b, setB] = useState(1);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Ellipse'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [-5, 5] } },
                h(Coordinates.Cartesian),
                h(Plot.Parametric, { t: [0, 2*Math.PI], xy: (t) => [a*Math.cos(t), b*Math.sin(t)], color: Theme.blue }),
                h(MovablePoint, { point: [a, 0], constrain: ([x])=>[x,0], onChange: ([x])=>setA(x) }),
                h(MovablePoint, { point: [0, b], constrain: ([x,y])=>[0,y], onChange: ([x,y])=>setB(y) })
            )
        )
    );
};` },
        'ppranb4f': {
            title: 'Normal Distribution', code: `
const GeoGebraClone = () => {
    const sigma = 1;
    const mu = 0;
    const f = (x) => (1/(sigma*Math.sqrt(2*Math.PI))) * Math.exp(-0.5 * Math.pow((x-mu)/sigma, 2));
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Normal Distribution'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-4, 4], y: [0, 0.5] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: f, color: Theme.red })
            )
        )
    );
};` },
        'skrwc3jj': {
            title: 'Sigmoid', code: `
const GeoGebraClone = () => {
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Sigmoid Function'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-6, 6], y: [0, 1] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: (x) => 1/(1+Math.exp(-x)), color: Theme.purple })
            )
        )
    );
};` },
        'mmajy4w3': {
            title: 'Step Function', code: `
const GeoGebraClone = () => {
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Step Function'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [-1, 2] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: (x) => x > 0 ? 1 : 0, color: Theme.green })
            )
        )
    );
};` },
        'dkuhvmht': {
            title: 'Secant Line', code: `
const GeoGebraClone = () => {
    const [x1, setX1] = useState(-1);
    const [x2, setX2] = useState(2);
    const f = (x) => x*x;
    const secant = (x) => {
        const m = (f(x2) - f(x1)) / (x2 - x1);
        return f(x1) + m * (x - x1);
    };
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Secant Line'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-3, 3], y: [-1, 5] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: f, color: Theme.blue }),
                h(Plot.OfX, { y: secant, color: Theme.red }),
                h(MovablePoint, { point: [x1, f(x1)], constrain: ([x])=>[x, f(x)], onChange: ([x])=>setX1(x) }),
                h(MovablePoint, { point: [x2, f(x2)], constrain: ([x])=>[x, f(x)], onChange: ([x])=>setX2(x) })
            )
        )
    );
};` },
        'mwfnyjgm': {
            title: 'Fourier Square Wave', code: `
const GeoGebraClone = () => {
    const terms = 5;
    const f = (x) => {
        let sum = 0;
        for(let k=1; k<=terms; k+=2) sum += (4/(Math.PI*k))*Math.sin(k*x);
        return sum;
    }
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Fourier Series'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-10, 10], y: [-2, 2] } },
                h(Coordinates.Cartesian),
                h(Plot.OfX, { y: f, color: Theme.orange })
            )
        )
    );
};` },
        'ju46yvmn': {
            title: 'Lissajous Curve', code: `
const GeoGebraClone = () => {
    const [a, setA] = useState(3);
    const [b, setB] = useState(2);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Lissajous Curve'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-2, 2], y: [-2, 2] } },
                h(Coordinates.Cartesian),
                h(Plot.Parametric, { t: [0, 2*Math.PI], xy: (t) => [Math.sin(a*t), Math.sin(b*t)], color: Theme.pink }),
                h(MovablePoint, { point: [a, 1], constrain: ([x])=>[x,1], onChange: ([x])=>setA(Math.round(x)) }),
                h(MovablePoint, { point: [b, -1], constrain: ([x])=>[x,-1], onChange: ([x])=>setB(Math.round(x)) })
            )
        )
    );
};` },
        'kb9fcwha': {
            title: 'Rotation Matrix', code: `
const GeoGebraClone = () => {
    const [theta, setTheta] = useState(0);
    const p = [1, 0];
    const rotated = [p[0]*Math.cos(theta) - p[1]*Math.sin(theta), p[0]*Math.sin(theta) + p[1]*Math.cos(theta)];
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Rotation'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-2, 2], y: [-2, 2] } },
                h(Coordinates.Cartesian),
                h(Line.Segment, { point1: [0,0], point2: rotated, color: Theme.blue }),
                h(MovablePoint, { point: [theta, 0], constrain: ([x])=>[x,0], onChange: ([x])=>setTheta(x) })
            )
        )
    );
};` },
        'u4sqkguu': {
            title: 'Scalar Projection', code: `
const GeoGebraClone = () => {
    const [v, setV] = useState([2,1]);
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Scalar Projection'),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-1, 3], y: [-1, 3] } },
                h(Coordinates.Cartesian),
                h(Line.Segment, { point1: [0,0], point2: [2,0], color: Theme.black }),
                h(Line.Segment, { point1: [0,0], point2: v, color: Theme.blue }),
                h(Line.Segment, { point1: v, point2: [v[0], 0], style: 'dashed' }),
                h(MovablePoint, { point: v, onChange: setV })
            )
        )
    );
};` },
        'khxv7eap': {
            title: 'Distance Formula', code: `
const GeoGebraClone = () => {
    const [p1, setP1] = useState([-1,-1]);
    const [p2, setP2] = useState([2,2]);
    const d = Math.sqrt(Math.pow(p2[0]-p1[0],2) + Math.pow(p2[1]-p1[1],2));
    return h('div', { className: 'simulation-container' },
        h('h1', { className: 'simulation-title' }, 'Distance: ' + d.toFixed(2)),
        h('div', { className: 'graph-panel' },
            h(Mafs, { viewBox: { x: [-5, 5], y: [-5, 5] } },
                h(Coordinates.Cartesian),
                h(Line.Segment, { point1: p1, point2: p2, color: Theme.green }),
                h(MovablePoint, { point: p1, onChange: setP1 }),
                h(MovablePoint, { point: p2, onChange: setP2 })
            )
        )
    );
};` }
    };

    // Simulate processing time
    setTimeout(() => {
        let code = '';
        let metadata = { title: 'Demo', description: 'Interactive demo' };

        if (url === 'https://www.geogebra.org/classic/ptrruktn') {
            code = CUBIC_TRANSFORM;
            metadata.title = 'Cubic Transformation';
        } else if (url === 'https://www.geogebra.org/classic/zbmvqvkc') {
            code = DOMAIN_RANGE;
            metadata.title = 'Domain and Range';
        } else {
            // Find template by matching ID in URL
            const id = url.split('/').pop();
            const template = TEMPLATES[id];

            if (template) {
                code = template.code;
                metadata.title = template.title;
            } else {
                // Fallback for any missed URLs
                code = TEMPLATES['khxv7eap'].code;
                metadata.title = 'Distance Formula';
            }
        }

        res.json({
            success: true,
            sessionId: 'mock-session-' + Date.now(),
            result: {
                code: code,
                metadata: metadata,
                extraction: {
                    movablePoints: [],
                    functions: [],
                    texts: [],
                    rawObjects: []
                }
            },
            iterations: 1
        });
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
