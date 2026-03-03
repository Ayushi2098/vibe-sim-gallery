import type { GenerationResult } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function generateSimulation(url: string): Promise<GenerationResult> {
    try {
        console.log('[API] Calling backend:', `${API_BASE_URL}/api/generate`);

        const response = await fetch(`${API_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url,
                images: [],
                text: '',
            }),
        });

        console.log('[API] Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('[API] Response data:', data.success ? 'Success' : 'Failed');

        if (!data.success) {
            throw new Error(data.error || 'Generation failed');
        }

        return data as GenerationResult;
    } catch (error) {
        console.error('[API] Error details:', error);

        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Make sure it's running.`);
        }

        throw error;
    }
}

export async function checkHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();
        return data.status === 'ok';
    } catch {
        return false;
    }
}
