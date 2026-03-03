import type { Simulation } from '../lib/types';

// Topic constants for consistent naming
export const TOPICS = {
    NUMBER_LINE: 'Number Line Fundamentals',
    FRACTIONS: 'Fractions & Decimals',
    LINEAR: 'Linear Equations & Graphs',
    COORDINATE: 'Coordinate Geometry',
    LINES: 'Lines & Their Properties',
    PATTERNS: 'Patterns & Sequences',
    POLYNOMIALS: 'Polynomial Functions',
    CUBIC: 'Cubic Functions',
    OTHER_FUNCTIONS: 'Other Functions',
    CALCULUS: 'Calculus',
    MATRICES: 'Matrices',
    FUNCTIONS_RELATIONS: 'Functions & Relations',
    GEOMETRY: 'Geometry',
    QUADRATIC: 'Quadratic Functions'
} as const;

// Group 1: Number Line & Linear Graphs
const numberLineSims = [
    {
        id: 'sim-a029',
        skillCode: 'A029',
        title: 'Representing inequalities on the number line',
        description: 'Show inequalities on a number line using open and closed circles and shaded regions.',
        tooltip: 'Drag the points to show inequalities on the number line. Use open/closed circles for boundaries.',
        topic: TOPICS.NUMBER_LINE
    },
    {
        id: 'sim-f023',
        skillCode: 'F023',
        title: 'Representing decimals on the number line',
        description: 'Place decimal values accurately on a number line based on their size and position.',
        tooltip: 'Drag the points to place decimal values on the number line.',
        topic: TOPICS.FRACTIONS
    },
    {
        id: 'sim-f032',
        skillCode: 'F032',
        title: 'Representing fractions on the number line',
        description: 'Locate fractions on a number line by dividing intervals into equal parts.',
        tooltip: 'Drag the purple point to place fractions. Adjust the denominator slider to change divisions. Try Target Mode for a challenge!',
        topic: TOPICS.FRACTIONS
    },
    {
        id: 'sim-f101',
        skillCode: 'F101',
        title: 'Placing unit fractions on a number line',
        description: 'Drag unit fractions to their correct positions on a number line.',
        tooltip: 'Drag the purple point to position the unit fraction correctly on the number line.',
        topic: TOPICS.FRACTIONS
    },
    {
        id: 'sim-i314',
        skillCode: 'I314',
        title: 'Using simple addition to solve number line questions',
        description: 'Solve problems by moving forwards along a number line using addition.',
        tooltip: 'Adjust the sliders to explore addition on the number line. Addition means moving forward (right).',
        topic: TOPICS.NUMBER_LINE
    },
    {
        id: 'sim-i317',
        skillCode: 'I317',
        title: 'Using simple subtraction to solve number line questions',
        description: 'Solve problems by moving backwards along a number line using subtraction.',
        tooltip: 'Adjust the sliders to explore subtraction on the number line. Subtraction means moving backward (left).',
        topic: TOPICS.NUMBER_LINE
    },
    {
        id: 'sim-i401',
        skillCode: 'I401',
        title: 'Identifying and placing numbers on the number line',
        description: 'Identify given numbers and place them correctly on a number line.',
        tooltip: 'Drag the points to place them at different positions on the number line.',
        topic: TOPICS.NUMBER_LINE
    },
    {
        id: 'sim-p347',
        skillCode: 'P347',
        title: 'Representing interval notation on a number line',
        description: 'Convert interval notation into a visual representation on a number line.',
        tooltip: 'Drag the interval endpoints to explore interval notation on the number line.',
        topic: TOPICS.NUMBER_LINE
    },
    {
        id: 'sim-a004',
        skillCode: 'A004',
        title: 'Representing linear equations graphically',
        description: 'Draw straight-line graphs from linear equations on the Cartesian plane.',
        tooltip: 'Adjust the slope and intercept to see how linear equations graph on the plane.',
        topic: TOPICS.LINEAR
    },
    {
        id: 'sim-a005',
        skillCode: 'A005',
        tooltip: "Adjust the sliders to change the slopes of the three lines and compare their steepness.",
        title: 'Interpreting graph steepness',
        description: 'Adjust the sliders to change the slopes of the three lines and compare their steepness.',
        topic: TOPICS.LINEAR
    }
];

// Group 2: Coordinate Geometry & Patterns
const coordGeomSims = [
    {
        id: 'sim-a006',
        skillCode: 'A006',
        title: 'Plotting coordinates on the Cartesian plane',
        description: 'Plot ordered pairs accurately using x- and y-coordinates.',
        tooltip: 'Drag the purple point to match the target coordinates shown.',
        topic: TOPICS.COORDINATE
    },
    {
        id: 'sim-a007',
        skillCode: 'A007',
        title: 'Understanding x and y intercepts',
        description: 'Identify where a graph crosses the x-axis and y-axis.',
        tooltip: 'Drag the intercepts along the axes to change the line.',
        topic: TOPICS.LINEAR
    },
    {
        id: 'sim-a008',
        skillCode: 'A008',
        title: 'Matching linear equations with their graphs',
        description: 'Adjust the sliders for gradient (m) and intercept (c) to match the target blue line.',
        tooltip: 'Adjust the sliders for gradient (m) and intercept (c) to match the target blue line.',
        topic: TOPICS.LINEAR
    },
    {
        id: 'sim-a017',
        skillCode: 'A017',
        title: 'Determining if two lines are coincident or parallel',
        description: 'Adjust the slope and intercept of Line 2 to make it parallel or matching Line 1.',
        tooltip: 'Adjust the slope and intercept of Line 2 to make it parallel or matching Line 1.',
        topic: TOPICS.LINES
    },
    {
        id: 'sim-a018',
        skillCode: 'A018',
        tooltip: "Drag point P1 to change the slope of Line 1 and observe the perpendicular Line 2.",
        title: 'Recognising perpendicular lines',
        description: 'Drag point P1 to change the slope of Line 1 and observe the perpendicular Line 2.',
        topic: TOPICS.LINES
    },
    {
        id: 'sim-a019',
        skillCode: 'A019',
        title: 'Finding the gradient of a perpendicular line',
        description: 'Adjust the gradient of the original line to see how the perpendicular gradient changes.',
        tooltip: 'Adjust the gradient of the original line to see how the perpendicular gradient changes.',
        topic: TOPICS.LINES
    },
    {
        id: 'sim-a020',
        skillCode: 'A020',
        title: 'Checking if a point lies on a line',
        description: 'Drag the point to coordinates that satisfy the line equation y=2x+1.',
        tooltip: 'Drag the point to coordinates that satisfy the line equation y=2x+1.',
        topic: TOPICS.COORDINATE
    },
    {
        id: 'sim-a183',
        skillCode: 'A183',
        title: 'Translating a point on the Cartesian plane',
        description: 'Move a point left, right, up, or down using given translations.',
        tooltip: 'Drag the purple point and adjust the sliders to see how translation moves points on the plane.',
        topic: TOPICS.COORDINATE
    },
    {
        id: 'sim-a201',
        skillCode: 'A201',
        title: 'Recognising repeating patterns with shapes',
        description: 'Observe the pattern and click the shape that comes next in the sequence.',
        tooltip: 'Observe the pattern and click the shape that comes next in the sequence.',
        topic: TOPICS.PATTERNS
    }
];

// Group 3: Sequences, Patterns, Calculus
const sequenceSims = [
    {
        id: 'sim-a202',
        skillCode: 'A202',
        title: 'Identifying patterns in basic arithmetic sequences',
        description: 'Identify number patterns where each term changes by a constant amount.',
        tooltip: 'Drag the purple point up and down to change the start value. Use the slider to adjust the common difference.',
        topic: TOPICS.PATTERNS
    },
    {
        id: 'sim-a203',
        skillCode: 'A203',
        title: 'Recognising complex multiplicative number patterns',
        description: 'Recognise number patterns formed by multiplying or dividing by a constant factor.',
        tooltip: 'Drag the purple point up and down to change the start value. Use the slider to adjust the common ratio.',
        topic: TOPICS.PATTERNS
    },
    {
        id: 'sim-a204',
        skillCode: 'A204',
        title: 'Identifying upcoming elements in formulaic patterns',
        description: 'Use algebraic rules to determine missing or future terms in a pattern.',
        tooltip: 'Adjust the slider to see how the formula calculates specific terms in the sequence.',
        topic: TOPICS.PATTERNS
    },
    {
        id: 'sim-a205',
        skillCode: 'A205',
        title: 'Identifying the next shape in a growing pattern',
        description: 'Analyse how a pattern grows and choose the next shape in the sequence.',
        tooltip: 'Observe the pattern\'s growth and predict the next step in the sequence.',
        topic: TOPICS.PATTERNS
    },
    {
        id: 'sim-a206',
        skillCode: 'A206',
        title: 'Identifying the next row in a growing pattern',
        description: 'Examine row-by-row changes to predict the next row in a pattern.',
        tooltip: 'Analyse how many items are in each row to predict the next row.',
        topic: TOPICS.PATTERNS
    },
    {
        id: 'sim-a207',
        skillCode: 'A207',
        title: 'Identifying the next image in a growing visual pattern',
        description: 'Identify visual growth rules and select the correct next image.',
        tooltip: 'Identify the growth rule (3n + 1) and predict the number of sticks for the next image.',
        topic: TOPICS.PATTERNS
    },
    {
        id: 'sim-a208',
        skillCode: 'A208',
        title: 'Identifying patterns in arithmetic sequences containing fractions',
        description: 'Identify constant fractional changes between terms in a sequence.',
        tooltip: 'Drag the purple point to change the start. Use the slider to adjust the common difference.',
        topic: TOPICS.PATTERNS
    },
    {
        id: 'sim-a821',
        skillCode: 'A821',
        title: 'Calculating binomial expansions of degree 3 or higher via the binomial theorem',
        description: 'Adjust the slider to change the power (n) and see the full binomial expansion.',
        tooltip: 'Adjust the slider to change the power (n) and see the full binomial expansion.',
        topic: TOPICS.POLYNOMIALS
    },
    {
        id: 'sim-a822',
        skillCode: 'A822',
        title: "Identifying and applying Pascal's Triangle to calculate binomial expansions of degree 3 or higher",
        description: "Adjust the slider to highlight different rows and see the binomial coefficients.",
        tooltip: "Adjust the slider to highlight different rows and see the binomial coefficients.",
        topic: TOPICS.POLYNOMIALS
    },
    {
        id: 'sim-c007',
        skillCode: 'C007',
        title: 'Calculating the average rate of change between two points on a curve',
        description: 'Drag the two purple points to see how the average rate of change (secant slope) is calculated.',
        tooltip: 'Drag the two purple points to see how the average rate of change (secant slope) is calculated.',
        topic: TOPICS.CALCULUS
    },
    {
        id: 'sim-c010',
        skillCode: 'C010',
        title: 'Understanding and estimating the instantaneous rate of change',
        description: 'Drag the point along the curve to see how the instantaneous rate of change (tangent slope) varies.',
        tooltip: 'Drag the point along the curve to see how the instantaneous rate of change (tangent slope) varies.',
        topic: TOPICS.CALCULUS
    }
];

// Group 4: Additional Simulations
const additionalSims = [
    {
        id: 'sim-f105',
        skillCode: 'F105',
        title: 'Identifying fractions in shapes',
        description: 'Identify the fraction represented by shaded parts of shapes.',
        tooltip: 'Look at the shaded part of the shape and identify what fraction it represents.',
        topic: TOPICS.FRACTIONS
    },
    {
        id: 'sim-f106',
        skillCode: 'F106',
        title: 'Representing mixed numbers using shapes',
        description: 'Build mixed numbers using whole shapes and fractional parts.',
        tooltip: 'Add whole shapes and fractional parts to match the target mixed number.',
        topic: TOPICS.FRACTIONS
    },
    {
        id: 'sim-f201',
        skillCode: 'F201',
        title: 'Understanding halves and quarters',
        description: 'Partition shapes to model halves and quarters correctly.',
        tooltip: 'Partition the shape correctly and shade the required number of parts.',
        topic: TOPICS.FRACTIONS
    },
    {
        id: 'sim-a904',
        skillCode: 'A904',
        title: 'Matching piecewise linear functions with their graphs',
        description: 'Understand how defined domains affect the graph of linear functions.',
        tooltip: 'Adjust the graph points to match the function definition above.',
        topic: TOPICS.LINEAR
    },
    {
        id: 'sim-x011',
        skillCode: 'X011',
        tooltip: "Select an operation (add, subtract, scale) and observe the resulting matrix calculation.",
        title: 'Computing linear operations on matrices',
        description: 'Select an operation (add, subtract, scale) and observe the resulting matrix calculation.',
        topic: TOPICS.MATRICES
    },
    {
        id: 'sim-g834',
        skillCode: 'G834',
        title: 'Recognising the basic shape and key features of the $\\cos(x)$ graph',
        description: 'Adjust the sliders to change amplitude, period, and vertical shift of the cosine graph.',
        tooltip: 'Adjust the sliders to change amplitude, period, and vertical shift of the cosine graph.',
        topic: TOPICS.OTHER_FUNCTIONS
    }
];

const geometrySims = [
    {
        id: 'sim-line-rotational-symmetry',
        skillCode: 'G110',
        title: 'Identifying line and rotational symmetry',
        description: 'Apply reflections and rotations to test symmetry visually.',
        tooltip: 'Explore line symmetry by dragging the blue point to rotate the line. Toggle reflection to see if the shape maps onto itself. For rotational symmetry, rotate the hexagon and observe when it coincides with its original position.',
        topic: TOPICS.GEOMETRY
    },
    {
        id: 'sim-translations',
        skillCode: 'G114',
        title: 'Describing translations of shapes on a grid',
        description: 'Drag shapes to perform translations and match transformation rules.',
        tooltip: 'Drag the blue point to translate the triangle. Match the target transformation rule shown below. The vector shows your translation direction and magnitude.',
        topic: TOPICS.GEOMETRY
    },
    {
        id: 'sim-reflections',
        skillCode: 'G115',
        title: 'Identifying reflections of shapes',
        description: 'Reflect shapes across lines and track coordinate changes.',
        tooltip: 'Drag the red points to move the line of reflection. Observe how the coordinates of the reflected triangle change as you manipulate the line.',
        topic: TOPICS.GEOMETRY
    },
    {
        id: 'sim-dilations',
        skillCode: 'G117',
        title: 'Identifying dilated shapes',
        description: 'Use a scale slider to dilate shapes from a centre and observe proportional change.',
        tooltip: 'Drag the purple center point and adjust the scale factor. Observe how each point moves along the ray from the center. Scale > 1 enlarges, < 1 shrinks.',
        topic: TOPICS.GEOMETRY
    },
    {
        id: 'sim-axis-reflections',
        skillCode: 'G119',
        title: 'Reflecting objects across the x-axis or y-axis',
        description: 'Apply axis reflections and compare original and image coordinates.',
        tooltip: 'Toggle between X-axis and Y-axis reflection. Observe how the transformation rule changes and how each coordinate is affected.',
        topic: TOPICS.GEOMETRY
    },
    {
        id: 'sim-point-rotation',
        skillCode: 'G120',
        title: 'Rotating an object around a point',
        description: 'Rotate shapes about a point using angle controls.',
        tooltip: 'Drag the purple center point and adjust the rotation angle. Observe how each vertex rotates around the center maintaining its distance.',
        topic: TOPICS.GEOMETRY
    }
];

const quadraticSims = [
    {
        id: 'sim-n111',
        skillCode: 'N111',
        title: 'Matching the graph of a parabola with its equation in turning point form',
        description: 'Match the graph of a parabola to its correct quadratic equation in turning point form.',
        tooltip: 'Drag the point to move the vertex. Use the slider to change the width to match the dashed line.',
        topic: TOPICS.QUADRATIC
    },
    {
        id: 'sim-n015',
        skillCode: 'N015',
        title: 'Matching translations of quadratic equations to their graphs',
        description: 'Identify how translating a quadratic equation affects its graph.',
        tooltip: "Use the sliders to see how 'h' shifts the graph horizontally and 'k' shifts it vertically.",
        topic: TOPICS.QUADRATIC
    },
    {
        id: 'sim-n016',
        skillCode: 'N016',
        title: 'Finding the turning point of a parabola from its equation',
        description: 'Determine the coordinates of the turning point (vertex) of a parabola.',
        tooltip: 'Drag the blue point to the turning point (vertex) of the parabola. The x-coordinate is -b/2a.',
        topic: TOPICS.QUADRATIC
    },
    {
        id: 'sim-n112',
        skillCode: 'N112',
        title: 'Determining parabola characteristics using the discriminant and the coefficient of $x^2$',
        description: 'Use the discriminant and the coefficient of x² to find key features of the parabola.',
        tooltip: "Explore how vertex position and 'a' value determine axis of symmetry, min/max value, and intercepts.",
        topic: TOPICS.QUADRATIC
    },
    {
        id: 'sim-n113',
        skillCode: 'N113',
        title: 'Interpreting solutions of quadratic and linear systems using the discriminant',
        description: 'Visualise the intersection points of a parabola and a line using the discriminant.',
        tooltip: 'Adjust the line to see how many times it intersects the parabola.',
        topic: TOPICS.QUADRATIC
    }
];

const polynomialSims = [
    {
        id: 'sim-n294',
        skillCode: 'N294',
        title: 'Matching a quartic function with its graph given its equation in standard form',
        description: 'Identify the correct graph for a given quartic function in standard form.',
        tooltip: 'Drag the 4 blue points on the x-axis to match the roots of the target graph.',
        topic: TOPICS.POLYNOMIALS
    },
    {
        id: 'sim-n295',
        skillCode: 'N295',
        title: 'Computing the equation of a quartic given 5 points',
        description: 'Find the equation of a quartic curve passing through 5 specific points.',
        tooltip: "Find the correct leading coefficient 'a' so the graph passes through the green point.",
        topic: TOPICS.POLYNOMIALS
    }
];

const restoredSims = [
    { id: 'sim-linear-graph', skillCode: 'A013', title: 'Finding the formula for a straight line from its graph', description: 'Drag the two points to define the line and see the corresponding linear equation.', tooltip: 'Drag the two points to define the line and see the corresponding linear equation.', topic: TOPICS.LINEAR },
    { id: 'sim-linear-intercepts', skillCode: 'A014', title: 'Finding the intercepts of linear equations', description: 'Identify where a straight line crosses the x-axis and y-axis.', tooltip: 'Find where the line crosses the x-axis and y-axis by dragging intercept points.', topic: TOPICS.LINEAR },
    { id: 'sim-midpoint', skillCode: 'A015', title: 'Finding the midpoint of two points', description: 'Calculate the point exactly halfway between two given coordinates.', tooltip: 'Drag the two purple points to see how the midpoint formula calculates the center.', topic: TOPICS.COORDINATE },
    { id: 'sim-distance', skillCode: 'A016', title: 'Finding the distance between two points', description: 'Use the distance formula to find the straight-line distance.', tooltip: 'Drag the points to explore how the distance formula calculates straight-line distance.', topic: TOPICS.COORDINATE },
    { id: 'sim-exponential', skillCode: 'N106', title: 'Finding the asymptote of an exponential function', description: 'Drag the blue point up or down to change the horizontal asymptote position.', tooltip: 'Drag the blue point up or down to change the horizontal asymptote position.', topic: TOPICS.OTHER_FUNCTIONS },
    { id: 'sim-hyperbola-basic', skillCode: 'N107', title: 'Matching a hyperbola of the form $y=\\frac{a}{x}$ with its graph', description: "Drag the point to change the 'a' coefficient and observe how it affects the hyperbola's shape.", tooltip: "Drag the point to change the 'a' coefficient and observe how it affects the hyperbola's shape.", topic: TOPICS.OTHER_FUNCTIONS },
    { id: 'sim-hyperbola-transformed', skillCode: 'N108', title: 'Matching any hyperbola of the form $y=\\frac{a}{(x−h)}+k$ with its graph', description: 'Drag the point to shift the hyperbola horizontally (h) and vertically (k).', tooltip: 'Drag the point to shift the hyperbola horizontally (h) and vertically (k).', topic: TOPICS.OTHER_FUNCTIONS },
    { id: 'sim-cubic-basic', skillCode: 'N275', title: 'Matching a cubic of the form $y = ax^3$ with its graph', description: 'Observe the S-shaped curve and inflection point of the basic cubic function.', tooltip: 'Observe the S-shaped curve and inflection point of the basic cubic function.', topic: TOPICS.CUBIC },
    { id: 'sim-cubic-transformed', skillCode: 'N278', title: "Matching a cubic equation in 'point of inflection' form with its graph", description: 'Drag the purple inflection point to horizontally and vertically translate the cubic graph.', tooltip: 'Drag the purple inflection point to horizontally and vertically translate the cubic graph.', topic: TOPICS.CUBIC },
    { id: 'sim-inverse-cubic', skillCode: 'N279', title: 'Identifying the basic shape of a graph of the inverse function of a cubic in point of inflection form, $y=a(x−h)^{\\frac{1}{3}}+k$', description: 'Recognise the shape of an inverse cubic graph.', tooltip: 'Drag the purple point to adjust the inflection point (h, k).', topic: TOPICS.CUBIC },
    { id: 'sim-cubic-features', skillCode: 'N281', title: 'Recognising the basic shape of a cubic graph', description: "Toggle 'Show Features' to highlight local maximums, minimums, and the inflection point.", tooltip: "Toggle 'Show Features' to highlight local maximums, minimums, and the inflection point.", topic: TOPICS.CUBIC },
    { id: 'sim-inverse-cubic-reflection', skillCode: 'N280', title: 'Finding the inverse function of a cubic in point of inflection form', description: 'Drag the movable point to translate the function and see its inverse reflected across y=x.', tooltip: 'Drag the movable point to translate the function and see its inverse reflected across y=x.', topic: TOPICS.CUBIC },
    { id: 'sim-cubic-solvable', skillCode: 'N282', title: 'Solving cubic equations', description: 'Solve cubic equations using factorisation.', tooltip: 'Drag the point to change the constant term and see how the number of real solutions (roots) changes.', topic: TOPICS.CUBIC },
    { id: 'sim-cubic-factorized', skillCode: 'N283', title: 'Matching the graph of a cubic function with its equation in factorised form', description: 'Drag the three colored points along the x-axis to change the roots of the cubic function.', tooltip: 'Drag the three colored points along the x-axis to change the roots of the cubic function.', topic: TOPICS.CUBIC },
    { id: 'sim-cubic-repeated', skillCode: 'N284', title: 'Matching the equation of a cubic with a repeated factor with its graph', description: "Drag the points to change the single and repeated roots and observe the graph's behavior.", tooltip: "Drag the points to change the single and repeated roots and observe the graph's behavior.", topic: TOPICS.CUBIC },
    { id: 'sim-cubic-irreducible', skillCode: 'N285', title: 'Matching cubic with irreducible quadratic', description: 'Drag the colored points to change the single real root and the quadratic offset.', tooltip: 'Drag the colored points to change the single real root and the quadratic offset.', topic: TOPICS.CUBIC },
    { id: 'sim-cubic-standard', skillCode: 'N286', title: 'Matching cubic in standard form', description: 'Adjust the sliders for a, b, c, and d to see how coefficients affect the standard cubic graph.', tooltip: 'Adjust the sliders for a, b, c, and d to see how coefficients affect the standard cubic graph.', topic: TOPICS.CUBIC },
    {
        id: 'sim-cartesian-relations',
        skillCode: 'N306',
        title: 'Representing relations diagrammatically through a Cartesian plane',
        description: 'Drag points to form relations and visually test whether they satisfy function rules.',
        tooltip: 'Drag the points. If two or more points have the same x-coordinate, the relation fails the vertical line test and is not a function. Points will snap to 0.5 increments for simplicity.',
        topic: TOPICS.FUNCTIONS_RELATIONS
    },
    {
        id: 'sim-arrow-diagrams',
        skillCode: 'N307',
        title: 'Representing relations diagrammatically through arrow diagrams',
        description: 'Create mappings between input and output sets and observe function behaviour dynamically.',
        tooltip: 'Toggle the mappings from the Domain (left) to the Codomain (right). A relation is a function if every element in the domain maps to exactly one element in the codomain.',
        topic: TOPICS.FUNCTIONS_RELATIONS
    },
    {
        id: 'sim-domain-range',
        skillCode: 'N308',
        title: 'Identifying the domain and range of a relation',
        description: 'Select inputs and outputs interactively to see domain and range update live.',
        tooltip: "Drag the endpoints of the line segment. Observe how the Domain (highlighted on the x-axis) and the Range (highlighted on the y-axis) update based on the function's extent.",
        topic: TOPICS.FUNCTIONS_RELATIONS
    },
    {
        id: 'sim-vertical-line-test',
        skillCode: 'N311',
        title: 'Determining whether a relation is a function graphically or algebraically',
        description: 'Apply the vertical line test dynamically to determine if a relation is a function.',
        tooltip: 'Drag the blue vertical line across the graph. If the line intersects the graph at more than one point for any value of x, the relation is not a function.',
        topic: TOPICS.FUNCTIONS_RELATIONS
    },
    {
        id: 'sim-horizontal-line-test',
        skillCode: 'N312',
        title: 'Determining if a function is one-to-one or many-to-one',
        description: 'Use horizontal line sweeps to identify one-to-one and many-to-one mappings.',
        tooltip: "Drag the blue horizontal line. If it intersects the graph at more than one point, the function is 'many-to-one'. If it always intersects at most once, it is 'one-to-one'.",
        topic: TOPICS.FUNCTIONS_RELATIONS
    },
    {
        id: 'sim-inverse-relationship',
        skillCode: 'N322',
        title: 'Understanding the graphical relationship between an original function and its inverse',
        description: 'Reflect graphs across $y=x$ to visualise inverse relationships.',
        tooltip: 'Drag the purple point on the function f(x). Observe its reflection across the line y=x, which lies on the inverse function f⁻¹(x). The coordinates are swapped: (x, y) becomes (y, x).',
        topic: TOPICS.FUNCTIONS_RELATIONS
    },
    {
        id: 'sim-inverse-domain-range',
        skillCode: 'N323',
        title: 'Computing the domain and range of the inverse, given the domain and range of the original',
        description: 'Adjust original function restrictions and observe inverse domain and range changes.',
        tooltip: "Drag the orange boundary point to change the domain of the function f(x) = x²/2. Notice that if the domain includes both negative and positive values (a < 0), the function is not one-to-one and its inverse is not a function.",
        topic: TOPICS.FUNCTIONS_RELATIONS
    }
].map(s => ({
    ...s,
    skillCode: (s as any).skillCode || s.id.replace('sim-', '').toUpperCase()
}));

// Combine all simulations
export const simulations: Simulation[] = [
    ...additionalSims,
    ...numberLineSims,
    ...coordGeomSims,
    ...sequenceSims,
    ...geometrySims,
    ...quadraticSims,
    ...polynomialSims,
    ...restoredSims
].map(sim => ({
    id: sim.id,
    skillCode: sim.skillCode,
    title: sim.title,
    description: sim.description,
    topic: sim.topic,
    tooltip: sim.tooltip,
    url: '',
    thumbnail: undefined
}));

// Helper function to group simulations by topic
export function getSimulationsByTopic(): { name: string; simulations: Simulation[] }[] {
    console.log("Loading simulations by topic...", simulations.length);
    const topicOrder = [
        TOPICS.NUMBER_LINE,
        TOPICS.FRACTIONS,
        TOPICS.LINEAR,
        TOPICS.COORDINATE,
        TOPICS.LINES,
        TOPICS.GEOMETRY,
        TOPICS.PATTERNS,
        TOPICS.POLYNOMIALS,
        TOPICS.CUBIC,
        TOPICS.OTHER_FUNCTIONS,
        TOPICS.CALCULUS,
        TOPICS.MATRICES,
        TOPICS.FUNCTIONS_RELATIONS,
        TOPICS.QUADRATIC
    ];

    const grouped = new Map<string, Simulation[]>();

    simulations.forEach(sim => {
        const topic = sim.topic || 'Other';
        if (!grouped.has(topic)) {
            grouped.set(topic, []);
        }
        grouped.get(topic)!.push(sim);
    });

    return topicOrder
        .filter(topic => grouped.has(topic))
        .map(topic => ({
            name: topic,
            simulations: grouped.get(topic)!
        }));
}
