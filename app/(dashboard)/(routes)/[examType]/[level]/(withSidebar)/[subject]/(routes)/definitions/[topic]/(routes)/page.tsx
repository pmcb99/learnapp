import React from 'react';
import prismadb from '@/lib/prismadb';
import DefinitionList from '../../definitions';

interface DefinitionPageProps {
    params: {
        topic: string;
        subject: string;
    }
};

const DefinitionPage: React.FC<DefinitionPageProps> = async ({
    params
}
) => {
    // replace dashes with spaces and convert to uppercase
    const topicKey = params.topic.replace(/-/g, ' ').toUpperCase();
    const definitions = await prismadb.definitions.findMany({
        where: {
            subject: params.subject,
            topic: topicKey
        }
    });
    
    return (
        <DefinitionList definitions={definitions}/>
    );
}

export default DefinitionPage;
