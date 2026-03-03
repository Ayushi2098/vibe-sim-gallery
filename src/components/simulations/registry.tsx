import React from 'react';
import { LinearGraph } from './LinearGraph';
import { LinearIntercepts } from './LinearIntercepts';
import { Midpoint } from './Midpoint';
import { Distance } from './Distance';
import { ExponentialAsymptote } from './ExponentialAsymptote';
import { HyperbolaBasic } from './HyperbolaBasic';
import { HyperbolaTransformed } from './HyperbolaTransformed';
import { CubicBasic } from './CubicBasic';
import { CubicTransformed } from './CubicTransformed';
import { InverseCubic } from './InverseCubic';
import { CubicFeatures } from './CubicFeatures';
import { InverseCubicReflection } from './InverseCubicReflection';
import { CubicSolvable } from './CubicSolvable';
import { CubicFactorized } from './CubicFactorized';
import { CubicRepeatedFactor } from './CubicRepeatedFactor';
import { CubicIrreducible } from './CubicIrreducible';
import { CubicStandard } from './CubicStandard';

// New number line simulations
import { InequalitiesNumberLine } from './InequalitiesNumberLine';
import { DecimalsNumberLine } from './DecimalsNumberLine';
import { FractionsNumberLine } from './FractionsNumberLine';
import { UnitFractionsNumberLine } from './UnitFractionsNumberLine';
import { AdditionNumberLine } from './AdditionNumberLine';
import { SubtractionNumberLine } from './SubtractionNumberLine';
import { PlacingNumbersNumberLine } from './PlacingNumbersNumberLine';
import { IntervalNotationNumberLine } from './IntervalNotationNumberLine';

// New Coordinate Geometry & Patterns (Batch 1)
import { PlottingPoints } from './PlottingPoints';
import { Intercepts } from './Intercepts';
import { MatchLinearGraph } from './MatchLinearGraph';
import { ParallelCoincidentLines } from './ParallelCoincidentLines';
import { PerpendicularLines } from './PerpendicularLines';
import { PerpendicularGradient } from './PerpendicularGradient';
import { PointOnLine } from './PointOnLine';
import { PointTranslation } from './PointTranslation';
import { RepeatingPatterns } from './RepeatingPatterns';

// New Sequences, Patterns & Calculus (Batch 2)
import { ArithmeticSequence } from './ArithmeticSequence';
import { GeometricSequence } from './GeometricSequence';
import { FormulaicPattern } from './FormulaicPattern';
import { GrowingShapePattern } from './GrowingShapePattern';
import { GrowingRowPattern } from './GrowingRowPattern';
import { GrowingVisualPattern } from './GrowingVisualPattern';
import { FractionSequence } from './FractionSequence';
import { BinomialExpansion } from './BinomialExpansion';
import { PascalsTriangle } from './PascalsTriangle';
import { AverageRateOfChange } from './AverageRateOfChange';
import { InstantaneousRateOfChange } from './InstantaneousRateOfChange';

// New Piecewise & Matrix (Batch 3)
import { PiecewiseLinearMatch } from './PiecewiseLinearMatch';
import { MatrixOperations } from './MatrixOperations';

import { LinearEquationsGraph } from './LinearEquationsGraph';
import { GraphSteepness } from './GraphSteepness';
import { CosineGraph } from './CosineGraph';

// New Fraction Simulations
import { IdentifyFractionsImages } from './IdentifyFractionsImages';
import { MixedNumbersShapes } from './MixedNumbersShapes';
import { HalvesAndQuarters } from './HalvesAndQuarters';
import { CartesianRelations } from './CartesianRelations';
import { ArrowDiagrams } from './ArrowDiagrams';
import { DomainRangeSelect } from './DomainRangeSelect';
import { VerticalLineTest } from './VerticalLineTest';
import { HorizontalLineTest } from './HorizontalLineTest';
import { InverseRelationship } from './InverseRelationship';
import { InverseDomainRange } from './InverseDomainRange';

// New Geometry Simulations (G110-G120)
import { LineRotationalSymmetry } from './LineRotationalSymmetry';
import { Translations } from './Translations';
import { Reflections } from './Reflections';
import { Dilations } from './Dilations';
import { AxisReflections } from './AxisReflections';
import { PointRotation } from './PointRotation';

// New Quadratic Simulations (N111-N113)
import { QuadraticMatchGraph } from './QuadraticMatchGraph';
import { QuadraticTranslations } from './QuadraticTranslations';
import { QuadraticTurningPoint } from './QuadraticTurningPoint';
import { QuadraticCharacteristics } from './QuadraticCharacteristics';
import { QuadraticSimultaneous } from './QuadraticSimultaneous';

// New Polynomial Simulations (N294-N295)
import { QuarticMatchGraph } from './QuarticMatchGraph';
import { QuarticFromPoints } from './QuarticFromPoints';

export const SIMULATION_REGISTRY: Record<string, React.FC> = {
    // New linear programming & matrices
    'sim-g834': CosineGraph,
    'sim-a904': PiecewiseLinearMatch,
    'sim-x011': MatrixOperations,

    // NEW Fraction Simulations
    'sim-f105': IdentifyFractionsImages,
    'sim-f106': MixedNumbersShapes,
    'sim-f201': HalvesAndQuarters,
    'sim-cartesian-relations': CartesianRelations,
    'sim-arrow-diagrams': ArrowDiagrams,
    'sim-domain-range': DomainRangeSelect,
    'sim-vertical-line-test': VerticalLineTest,
    'sim-horizontal-line-test': HorizontalLineTest,
    'sim-inverse-relationship': InverseRelationship,
    'sim-inverse-domain-range': InverseDomainRange,

    // New Geometry Simulations
    'sim-line-rotational-symmetry': LineRotationalSymmetry,
    'sim-translations': Translations,
    'sim-reflections': Reflections,
    'sim-dilations': Dilations,
    'sim-axis-reflections': AxisReflections,
    'sim-point-rotation': PointRotation,

    // New Quadratic Simulations
    'sim-n111': QuadraticMatchGraph,
    'sim-n015': QuadraticTranslations,
    'sim-n016': QuadraticTurningPoint,
    'sim-n112': QuadraticCharacteristics,
    'sim-n113': QuadraticSimultaneous,

    // New Polynomial Simulations
    'sim-n294': QuarticMatchGraph,
    'sim-n295': QuarticFromPoints,

    // New number line simulations
    'sim-a029': InequalitiesNumberLine,
    'sim-f023': DecimalsNumberLine,
    'sim-f032': FractionsNumberLine,
    'sim-f101': UnitFractionsNumberLine,
    'sim-i314': AdditionNumberLine,
    'sim-i317': SubtractionNumberLine,
    'sim-i401': PlacingNumbersNumberLine,
    'sim-p347': IntervalNotationNumberLine,

    // New Coordinate Geometry (A006-A201)
    'sim-a006': PlottingPoints,
    'sim-a007': Intercepts,
    'sim-a008': MatchLinearGraph,
    'sim-a017': ParallelCoincidentLines,
    'sim-a018': PerpendicularLines,
    'sim-a019': PerpendicularGradient,
    'sim-a020': PointOnLine,
    'sim-a183': PointTranslation,
    'sim-a201': RepeatingPatterns,

    // New Sequences & Patterns (A202-C010)
    'sim-a202': ArithmeticSequence,
    'sim-a203': GeometricSequence,
    'sim-a204': FormulaicPattern,
    'sim-a205': GrowingShapePattern,
    'sim-a206': GrowingRowPattern,
    'sim-a207': GrowingVisualPattern,
    'sim-a208': FractionSequence,
    'sim-a821': BinomialExpansion,
    'sim-a822': PascalsTriangle,
    'sim-c007': AverageRateOfChange,
    'sim-c010': InstantaneousRateOfChange,

    // Original & Other simulations
    'sim-a004': LinearEquationsGraph,
    'sim-a005': GraphSteepness,

    // Existing simulations
    'sim-linear-graph': LinearGraph,
    'sim-linear-intercepts': LinearIntercepts,
    'sim-midpoint': Midpoint,
    'sim-distance': Distance,
    'sim-exponential': ExponentialAsymptote,
    'sim-hyperbola-basic': HyperbolaBasic,
    'sim-hyperbola-transformed': HyperbolaTransformed,
    'sim-cubic-basic': CubicBasic,
    'sim-cubic-transformed': CubicTransformed,
    'sim-inverse-cubic': InverseCubic,
    'sim-cubic-features': CubicFeatures,
    'sim-inverse-cubic-reflection': InverseCubicReflection,
    'sim-cubic-solvable': CubicSolvable,
    'sim-cubic-factorized': CubicFactorized,
    'sim-cubic-repeated': CubicRepeatedFactor,
    'sim-cubic-irreducible': CubicIrreducible,
    'sim-cubic-standard': CubicStandard,
};

export const getSimulationComponent = (id: string): React.FC | null => {
    return SIMULATION_REGISTRY[id] || null;
};
