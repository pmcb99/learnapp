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
    host: 'rewise-1i0b23tp.weaviate.network',
    apiKey: new ApiKey("m2OOZWQhfuh1Ip08u5TwkWjUFe8Xzri0MzvD"),
    headers: {
        'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY!
    }
});