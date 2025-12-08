import { DocumentCategory } from '../../types/types';
import {
    FileText,
    FolderKanban,
    BookOpen,
    Newspaper,
    FlaskConical,
    Presentation,
} from 'lucide-react';

interface CategoryBadgeProps {
    category: DocumentCategory;
    size?: 'sm' | 'md' | 'lg';
}

const categoryConfig: Record<
    DocumentCategory,
    { color: string; bgColor: string; icon: JSX.Element }
> = {
    [DocumentCategory.THESIS]: {
        color: 'text-purple-700',
        bgColor: 'bg-purple-100',
        icon: <FileText size={14} />,
    },
    [DocumentCategory.PROJECT]: {
        color: 'text-blue-700',
        bgColor: 'bg-blue-100',
        icon: <FolderKanban size={14} />,
    },
    [DocumentCategory.BLOG]: {
        color: 'text-green-700',
        bgColor: 'bg-green-100',
        icon: <BookOpen size={14} />,
    },
    [DocumentCategory.ARTICLE]: {
        color: 'text-orange-700',
        bgColor: 'bg-orange-100',
        icon: <Newspaper size={14} />,
    },
    [DocumentCategory.RESEARCH]: {
        color: 'text-red-700',
        bgColor: 'bg-red-100',
        icon: <FlaskConical size={14} />,
    },
    [DocumentCategory.PRESENTATION]: {
        color: 'text-indigo-700',
        bgColor: 'bg-indigo-100',
        icon: <Presentation size={14} />,
    },
};

function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
    const config = categoryConfig[category];
    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5 gap-1',
        md: 'text-sm px-2.5 py-1 gap-1.5',
        lg: 'text-base px-3 py-1.5 gap-2',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full font-medium ${config.bgColor} ${config.color} ${sizeClasses[size]}`}
        >
            {config.icon}
            <span>{category}</span>
        </span>
    );
}

export default CategoryBadge;
