import type { Document, Person } from '../../types/types';
import { mockDocuments, mockPersons } from '../data/mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPersonById = async (id: string): Promise<Person | null> => {
    await delay(200);
    return mockPersons.find((person) => person.id === id) || null;
};

export const getPersonDocuments = async (
    personId: string,
    page: number = 1,
    pageSize: number = 12
): Promise<{ documents: Document[]; total: number }> => {
    await delay(300);

    const personDocuments = mockDocuments.filter(
        (doc) =>
            doc.author.id === personId ||
            doc.coAuthors?.some((coAuthor) => coAuthor.id === personId)
    );

    const total = personDocuments.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedDocuments = personDocuments.slice(startIndex, endIndex);

    return {
        documents: paginatedDocuments,
        total,
    };
};

export const searchPersons = async (query: string): Promise<Person[]> => {
    await delay(200);
    if (!query || query.length < 2) return [];

    const queryLower = query.toLowerCase();
    return mockPersons.filter(
        (person) =>
            person.name.toLowerCase().includes(queryLower) ||
            person.email.toLowerCase().includes(queryLower) ||
            person.department?.toLowerCase().includes(queryLower) ||
            person.expertise?.some((exp) => exp.toLowerCase().includes(queryLower))
    );
};

export const getAllPersons = async (): Promise<Person[]> => {
    await delay(200);
    return mockPersons;
};

export const getPersonStats = async (
    personId: string
): Promise<{
    totalDocuments: number;
    totalViews: number;
    totalDownloads: number;
    categoryCounts: Record<string, number>;
}> => {
    await delay(200);

    const personDocuments = mockDocuments.filter(
        (doc) =>
            doc.author.id === personId ||
            doc.coAuthors?.some((coAuthor) => coAuthor.id === personId)
    );

    const totalDocuments = personDocuments.length;
    const totalViews = personDocuments.reduce((sum, doc) => sum + (doc.views || 0), 0);
    const totalDownloads = personDocuments.reduce((sum, doc) => sum + (doc.downloads || 0), 0);

    const categoryCounts: Record<string, number> = {};
    personDocuments.forEach((doc) => {
        categoryCounts[doc.category] = (categoryCounts[doc.category] || 0) + 1;
    });

    return {
        totalDocuments,
        totalViews,
        totalDownloads,
        categoryCounts,
    };
};
