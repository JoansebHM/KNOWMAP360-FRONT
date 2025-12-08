export const DocumentCategory = {
    THESIS: 'Trabajo de Grado',
    PROJECT: 'Proyecto',
    BLOG: 'Blog',
    ARTICLE: 'Artículo',
    RESEARCH: 'Investigación',
    PRESENTATION: 'Presentación',
} as const;

export type DocumentCategory = (typeof DocumentCategory)[keyof typeof DocumentCategory];

export interface Person {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    position?: string;
    department?: string;
    expertise?: string[];
    socialLinks?: {
        linkedin?: string;
        github?: string;
        twitter?: string;
    };
}

export interface Document {
    id: string;
    title: string;
    description: string;
    category: DocumentCategory;
    author: Person;
    coAuthors?: Person[];
    date: string;
    tags: string[];
    fileUrl?: string;
    thumbnailUrl?: string;
    views?: number;
    downloads?: number;
    abstract?: string;
    keywords?: string[];
}

export interface SearchFilters {
    query?: string;
    categories?: DocumentCategory[];
    authors?: string[];
    tags?: string[];
    dateFrom?: string;
    dateTo?: string;
}

export interface SearchResult {
    documents: Document[];
    total: number;
    page: number;
    pageSize: number;
}

export type SortOption = 'relevance' | 'date-desc' | 'date-asc' | 'title' | 'views';

export type ViewMode = 'grid' | 'list';
