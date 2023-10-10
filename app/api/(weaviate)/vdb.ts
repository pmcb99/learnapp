import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';

const weaviateKey = process.env.WEAVIATE_API_KEY;


// if (!weaviateKey) {
//     throw new Error('WEAVIATE_API_KEY is not set');
// }

// const openAIKey = process.env.OPENAI_API_KEY;
// if (!openAIKey) {
//     throw new Error('OPENAI_API_KEY is not set');
// }

export const client: WeaviateClient = weaviate.client({
    scheme: 'https',
    // host: 'lcgpt-fn97ot7k.weaviate.network',
    host: 'plot-compass-test-4230pecv.weaviate.network',
    apiKey: new ApiKey("B3ipySMDLJpSudK0pncQWGnENHUUj64DTFSX"),
    headers: {
        'X-OpenAI-Api-Key': "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"
    }
});