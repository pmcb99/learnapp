import { Definition } from '@prisma/client';
import React from 'react';

interface DefinitionListProps {
    definitions: Definition[];
}

const DefinitionList: React.FC<DefinitionListProps> = ({ definitions }) => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {definitions.map((definition, index) => (
                <div key={index} className="mb-4 bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-200">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">{definition.term}</h3>
                    <p>
                        {definition.definition}
                    </p>
                </div>
            ))}

            <footer className="mt-10 text-center text-gray-500">
                © LC-GPT
            </footer>
        </div>
    );
}

export default DefinitionList;
