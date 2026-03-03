const fs = require('fs');
const path = require('path');

const files = [
    'src/components/simulations/AdditionNumberLine.tsx',
    'src/components/simulations/ArrowDiagrams.tsx',
    'src/components/simulations/AverageRateOfChange.tsx',
    'src/components/simulations/AxisReflections.tsx',
    'src/components/simulations/BinomialExpansion.tsx',
    'src/components/simulations/CartesianRelations.tsx',
    'src/components/simulations/CosineGraph.tsx',
    'src/components/simulations/CubicBasic.tsx',
    'src/components/simulations/CubicFactorized.tsx',
    'src/components/simulations/CubicFeatures.tsx',
    'src/components/simulations/CubicIrreducible.tsx',
    'src/components/simulations/CubicRepeatedFactor.tsx',
    'src/components/simulations/CubicSolvable.tsx',
    'src/components/simulations/CubicStandard.tsx',
    'src/components/simulations/CubicTransformed.tsx',
    'src/components/simulations/Dilations.tsx',
    'src/components/simulations/Distance.tsx',
    'src/components/simulations/DomainRangeSelect.tsx',
    'src/components/simulations/ExponentialAsymptote.tsx',
    'src/components/simulations/FractionsNumberLine.tsx',
    'src/components/simulations/GraphSteepness.tsx',
    'src/components/simulations/GrowingRowPattern.tsx',
    'src/components/simulations/GrowingShapePattern.tsx',
    'src/components/simulations/GrowingVisualPattern.tsx',
    'src/components/simulations/HalvesAndQuarters.tsx',
    'src/components/simulations/HorizontalLineTest.tsx',
    'src/components/simulations/HyperbolaBasic.tsx',
    'src/components/simulations/HyperbolaTransformed.tsx',
    'src/components/simulations/IdentifyFractionsImages.tsx',
    'src/components/simulations/InequalitiesNumberLine.tsx',
    'src/components/simulations/InstantaneousRateOfChange.tsx',
    'src/components/simulations/IntervalNotationNumberLine.tsx',
    'src/components/simulations/InverseCubicReflection.tsx',
    'src/components/simulations/InverseDomainRange.tsx',
    'src/components/simulations/InverseRelationship.tsx',
    'src/components/simulations/LinearEquationsGraph.tsx',
    'src/components/simulations/LinearGraph.tsx',
    'src/components/simulations/LinearIntercepts.tsx',
    'src/components/simulations/LineRotationalSymmetry.tsx',
    'src/components/simulations/MatchLinearGraph.tsx',
    'src/components/simulations/MatrixOperations.tsx',
    'src/components/simulations/Midpoint.tsx',
    'src/components/simulations/MixedNumbersShapes.tsx',
    'src/components/simulations/ParallelCoincidentLines.tsx',
    'src/components/simulations/PascalsTriangle.tsx',
    'src/components/simulations/PerpendicularGradient.tsx',
    'src/components/simulations/PerpendicularLines.tsx',
    'src/components/simulations/PlottingPoints.tsx',
    'src/components/simulations/PointOnLine.tsx',
    'src/components/simulations/PointRotation.tsx',
    'src/components/simulations/PointTranslation.tsx',
    'src/components/simulations/QuadraticCharacteristics.tsx',
    'src/components/simulations/QuadraticMatchGraph.tsx',
    'src/components/simulations/QuadraticSimultaneous.tsx',
    'src/components/simulations/QuadraticTranslations.tsx',
    'src/components/simulations/QuadraticTurningPoint.tsx',
    'src/components/simulations/QuarticFromPoints.tsx',
    'src/components/simulations/QuarticMatchGraph.tsx',
    'src/components/simulations/Reflections.tsx',
    'src/components/simulations/RepeatingPatterns.tsx',
    'src/components/simulations/SubtractionNumberLine.tsx',
    'src/components/simulations/Translations.tsx',
    'src/components/simulations/UnitFractionsNumberLine.tsx',
    'src/components/simulations/VerticalLineTest.tsx'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove InfoTooltip import
    content = content.replace(/import { InfoTooltip } from '..\/InfoTooltip';\n?/, '');

    let original = content;

    // Pattern 1: Standard
    // <div ...> \n <h3...>...</h3> \n <div>...<InfoTooltip...>...</div> \n </div>
    const regex = /<div style={{ display: 'flex', alignItems: 'center'.*?}}>\s*<h3.*?<\/h3>.*?<InfoTooltip.*?<\/div>\s*<\/div>/s;
    if (regex.test(content)) {
        content = content.replace(regex, '');
    }
    // Pattern 2: Without nested wrapper for tooltip (rare but possible) or slightly different props
    else {
        const altRegex = /<div style={{ display: 'flex', alignItems: 'center'.*?}}>\s*<h3.*?<\/h3>\s*<div.*?>\s*<InfoTooltip.*?<\/div>\s*<\/div>/s;
        if (altRegex.test(content)) {
            content = content.replace(altRegex, '');
        }
        else {
            // Pattern 3: maybe no marginLeft wrapper?
            const altRegex2 = /<div style={{ display: 'flex', alignItems: 'center'.*?}}>\s*<h3.*?<\/h3>\s*<InfoTooltip.*?<\/div>/s;
            if (altRegex2.test(content)) {
                content = content.replace(altRegex2, ''); // This leaves the outer div if unmatched? No, regex includes outer div if matched.
                // Wait, altRegex2 regex matches the outer div start and end?
            }
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Processed ${file}`);
    } else {
        console.log(`Pattern not found in ${file}`);
    }
});
