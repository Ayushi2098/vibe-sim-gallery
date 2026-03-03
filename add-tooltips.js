#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tooltip text mappings for each simulation
const TOOLTIP_MAPPINGS = {
    'InequalitiesNumberLine.tsx': 'Drag the points to show inequalities on the number line. Use open/closed circles for boundaries.',
    'IntervalNotationNumberLine.tsx': 'Drag the interval endpoints to explore interval notation on the number line.',
    'UnitFractionsNumberLine.tsx': 'Drag the purple point to place unit fractions like 1/2, 1/3 on the number line.',
    'RepeatingPatterns.tsx': 'Identify the repeating pattern and select what comes next in the sequence.',
    'GrowingShapePattern.tsx': 'Identify how the shape grows and predict the next shape in the sequence.',
    'GrowingRowPattern.tsx': 'Analyze how each row changes to determine the next row in the pattern.',
    'GrowingVisualPattern.tsx': 'Identify visual growth rules to predict the next image in the sequence.',
    'LinearEquationsGraph.tsx': 'Adjust the slope and intercept to see how linear equations graph on the plane.',
    'LinearGraph.tsx': 'Interactively explore how to find the formula for a straight line from its graph.',
    'LinearIntercepts.tsx': 'Find where the line crosses the x-axis and y-axis by dragging intercept points.',
    'GraphSteepness.tsx': 'Compare different gradients to see how steepness changes with slope.',
    'MatchLinearGraph.tsx': 'Match linear equations to their corresponding graphs by comparing slopes and intercepts.',
    'Midpoint.tsx': 'Drag the two purple points to see how the midpoint formula calculates the center.',
    'Distance.tsx': 'Drag the points to explore how the distance formula calculates straight-line distance.',
    'PointOnLine.tsx': 'Test if a point lies on a line by substituting coordinates into the equation.',
    'ParallelCoincidentLines.tsx': 'Explore parallel and coincident lines by comparing their slopes and intercepts.',
    'PerpendicularLines.tsx': 'Identify perpendicular lines that intersect at right angles.',
    'PerpendicularGradient.tsx': 'Calculate the gradient of a line perpendicular to a given line.',
    'BinomialExpansion.tsx': 'Use the binomial theorem to expand expressions of degree 3 or higher.',
    'PascalsTriangle.tsx': "Explore Pascal's Triangle to determine coefficients in binomial expansions.",
    'CubicBasic.tsx': 'Recognize the characteristic S-shaped curve of a basic cubic function.',
    'CubicTransformed.tsx': 'Match cubic equations by identifying horizontal and vertical translations.',
    'CubicFeatures.tsx': 'Identify key features of cubic graphs including turning points and direction.',
    'CubicSolvable.tsx': 'Solve cubic equations using factorization techniques.',
    'CubicFactorized.tsx': 'Match cubic graphs using roots and x-intercepts from factorized form.',
    'CubicRepeatedFactor.tsx': 'Identify how repeated factors affect the shape of cubic graphs.',
    'CubicIrreducible.tsx': 'Match cubic equations to graphs when turning points vary.',
    'CubicStandard.tsx': 'Match cubic equations in standard form using intercepts and shape.',
    'InverseCubicReflection.tsx': 'Determine the inverse of a cubic function by swapping x and y variables.',
    'HyperbolaBasic.tsx': 'Match hyperbolas of the form y=a/x to their graphs.',
    'HyperbolaTransformed.tsx': 'Match transformed hyperbolas y=a/(x-h)+k to their graphs.',
    'ExponentialAsymptote.tsx': 'Identify the horizontal asymptote of an exponential function graph.',
    'CosineGraph.tsx': 'Recognize amplitude, period, and key points of the cosine graph.',
    'AverageRateOfChange.tsx': 'Calculate the average rate of change between two points using rise over run.',
    'InstantaneousRateOfChange.tsx': 'Estimate instantaneous rate of change at a point using tangent slopes.',
    'MatrixOperations.tsx': 'Perform addition, subtraction, and scalar multiplication on matrices.'
};

function addTooltipToFile(filePath) {
    const fileName = path.basename(filePath);
    const tooltipText = TOOLTIP_MAPPINGS[fileName];

    if (!tooltipText) {
        console.log(`⚠️  Skipping ${fileName} - no tooltip mapping defined`);
        return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('InfoTooltip')) {
        console.log(`✓  ${fileName} already has tooltip`);
        return false;
    }

    if (!content.includes("import { InfoTooltip }")) {
        const importLatexMatch = content.match(/import { Latex } from ['"]\.\.\/Latex['"];/);
        if (importLatexMatch) {
            const importLatexLine = importLatexMatch[0];
            const newImport = `${importLatexLine}\nimport { InfoTooltip } from '../InfoTooltip';`;
            content = content.replace(importLatexLine, newImport);
        } else {
            console.log(`⚠️  Could not find Latex import in ${fileName}`);
            return false;
        }
    }

    const h3Pattern = /<h3 style={{[^}]*margin:[^}]*}}>([^<]+)<\/h3>/;
    const h3Match = content.match(h3Pattern);

    if (h3Match) {
        const originalH3 = h3Match[0];
        const title = h3Match[1];

        const newHeader = `<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <h3 style={{ margin: 0, flex: 1 }}>${title}</h3>
                    <InfoTooltip text="${tooltipText}" />
                </div>`;

        content = content.replace(originalH3, newHeader);

        const instructionPattern = /<p style={{[^}]*fontSize:[^}]*fontStyle: 'italic'[^}]*}}>[\s\S]*?<\/p>/;
        content = content.replace(instructionPattern, '');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${fileName}`);
        return true;
    } else {
        console.log(`⚠️  Could not find h3 header in ${fileName}`);
        return false;
    }
}

const simulationsDir = path.join(__dirname, 'src', 'components', 'simulations');
const files = fs.readdirSync(simulationsDir)
    .filter(f => f.endsWith('.tsx') && f !== 'SimulationContainer.tsx')
    .map(f => path.join(simulationsDir, f));

console.log(`\n🚀 Adding tooltips to ${files.length} simulation files...\n`);

let updated = 0;
let skipped = 0;

files.forEach(filePath => {
    if (addTooltipToFile(filePath)) {
        updated++;
    } else {
        skipped++;
    }
});

console.log(`\n✨ Complete!`);
console.log(`   Updated: ${updated} files`);
console.log(`   Skipped: ${skipped} files\n`);
