export interface Simulation {
    id: string;
    url: string;
    title: string;
    description: string;
    thumbnail?: string;
    skillCode?: string;
    topic?: string;
    tooltip?: string;
}

export interface TopicGroup {
    name: string;
    simulations: Simulation[];
}

export interface GenerationResult {
    success: boolean;
    sessionId: string;
    result: {
        code: string;
        metadata: {
            title?: string;
            description?: string;
            isParameterized?: boolean;
            viewSettings?: any;
        };
        extraction: {
            movablePoints?: any[];
            functions?: any[];
            texts?: any[];
            rawObjects?: any[];
        };
    };
    iterations: number;
    error?: string;
}

export interface ApiError {
    success: false;
    error: string;
}
