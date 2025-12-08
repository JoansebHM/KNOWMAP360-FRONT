import type { Document, Person } from '../../types/types';
import { DocumentCategory } from '../../types/types';

export const mockPersons: Person[] = [
    {
        id: '1',
        name: 'María González',
        email: 'maria.gonzalez@university.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        bio: 'Investigadora en Inteligencia Artificial y Machine Learning',
        position: 'Profesora Asociada',
        department: 'Ingeniería de Sistemas',
        expertise: ['Machine Learning', 'Deep Learning', 'NLP'],
        socialLinks: {
            linkedin: 'https://linkedin.com/in/mariagonzalez',
            github: 'https://github.com/mariagonzalez',
        },
    },
    {
        id: '2',
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@university.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
        bio: 'Especialista en Desarrollo Web y Arquitectura de Software',
        position: 'Profesor Titular',
        department: 'Ingeniería de Software',
        expertise: ['React', 'Node.js', 'Microservicios', 'Cloud Computing'],
        socialLinks: {
            linkedin: 'https://linkedin.com/in/carlosrodriguez',
            github: 'https://github.com/carlosrodriguez',
        },
    },
    {
        id: '3',
        name: 'Ana Martínez',
        email: 'ana.martinez@university.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
        bio: 'Experta en Ciberseguridad y Redes',
        position: 'Investigadora Senior',
        department: 'Seguridad Informática',
        expertise: ['Ciberseguridad', 'Ethical Hacking', 'Criptografía'],
    },
    {
        id: '4',
        name: 'Luis Fernández',
        email: 'luis.fernandez@university.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis',
        bio: 'Desarrollador Full Stack y DevOps Engineer',
        position: 'Estudiante de Maestría',
        department: 'Ingeniería de Sistemas',
        expertise: ['DevOps', 'Docker', 'Kubernetes', 'CI/CD'],
    },
    {
        id: '5',
        name: 'Patricia Silva',
        email: 'patricia.silva@university.edu',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
        bio: 'Especialista en Bases de Datos y Big Data',
        position: 'Profesora Asistente',
        department: 'Ciencia de Datos',
        expertise: ['Big Data', 'SQL', 'NoSQL', 'Data Analytics'],
    },
];

export const mockDocuments: Document[] = [
    {
        id: '1',
        title: 'Sistema de Recomendación basado en Deep Learning para E-commerce',
        description:
            'Implementación de un sistema de recomendación utilizando redes neuronales profundas para mejorar la experiencia de compra en plataformas de comercio electrónico.',
        category: DocumentCategory.THESIS,
        author: mockPersons[0],
        date: '2024-06-15',
        tags: ['Deep Learning', 'E-commerce', 'Sistemas de Recomendación', 'Python'],
        views: 245,
        downloads: 89,
        abstract:
            'Este trabajo presenta el diseño e implementación de un sistema de recomendación basado en técnicas de Deep Learning. Se utilizaron redes neuronales convolucionales y recurrentes para analizar patrones de comportamiento de usuarios y generar recomendaciones personalizadas.',
        keywords: ['Deep Learning', 'Recommendation Systems', 'Neural Networks', 'E-commerce'],
    },
    {
        id: '2',
        title: 'Arquitectura de Microservicios para Aplicaciones Empresariales',
        description:
            'Diseño y desarrollo de una arquitectura escalable basada en microservicios utilizando Docker, Kubernetes y tecnologías cloud.',
        category: DocumentCategory.PROJECT,
        author: mockPersons[1],
        coAuthors: [mockPersons[3]],
        date: '2024-05-20',
        tags: ['Microservicios', 'Docker', 'Kubernetes', 'Cloud', 'DevOps'],
        views: 312,
        downloads: 156,
        abstract:
            'Propuesta de arquitectura de microservicios que permite escalabilidad horizontal, alta disponibilidad y facilidad de mantenimiento. Se implementó un caso de uso real con 12 microservicios desplegados en Kubernetes.',
        keywords: ['Microservices', 'Docker', 'Kubernetes', 'Cloud Architecture'],
    },
    {
        id: '3',
        title: 'Mejores Prácticas en Seguridad Web: Guía Completa 2024',
        description:
            'Artículo detallado sobre las mejores prácticas de seguridad para aplicaciones web modernas, incluyendo OWASP Top 10 y técnicas de prevención.',
        category: DocumentCategory.BLOG,
        author: mockPersons[2],
        date: '2024-07-10',
        tags: ['Seguridad', 'Web Security', 'OWASP', 'Best Practices'],
        views: 567,
        downloads: 234,
        abstract:
            'Guía completa que cubre las vulnerabilidades más comunes en aplicaciones web y cómo prevenirlas. Incluye ejemplos prácticos y código de referencia.',
        keywords: ['Web Security', 'OWASP', 'Cybersecurity', 'Best Practices'],
    },
    {
        id: '4',
        title: 'Análisis Comparativo de Frameworks Frontend: React vs Vue vs Angular',
        description:
            'Estudio comparativo exhaustivo de los principales frameworks de desarrollo frontend, evaluando rendimiento, curva de aprendizaje y ecosistema.',
        category: DocumentCategory.ARTICLE,
        author: mockPersons[1],
        date: '2024-04-18',
        tags: ['React', 'Vue', 'Angular', 'Frontend', 'JavaScript'],
        views: 892,
        downloads: 421,
        abstract:
            'Análisis técnico que compara React, Vue y Angular en diferentes aspectos: rendimiento, tamaño del bundle, facilidad de uso, comunidad y casos de uso recomendados.',
        keywords: ['React', 'Vue', 'Angular', 'Frontend Frameworks', 'Comparison'],
    },
    {
        id: '5',
        title: 'Implementación de CI/CD con GitHub Actions y AWS',
        description:
            'Tutorial paso a paso para configurar un pipeline completo de integración y despliegue continuo utilizando GitHub Actions y servicios de AWS.',
        category: DocumentCategory.BLOG,
        author: mockPersons[3],
        date: '2024-06-30',
        tags: ['CI/CD', 'GitHub Actions', 'AWS', 'DevOps', 'Automation'],
        views: 445,
        downloads: 198,
        abstract:
            'Guía práctica para implementar un pipeline de CI/CD desde cero. Incluye configuración de tests automáticos, build, y despliegue a diferentes entornos en AWS.',
        keywords: ['CI/CD', 'GitHub Actions', 'AWS', 'DevOps', 'Automation'],
    },
    {
        id: '6',
        title: 'Big Data Analytics con Apache Spark y Python',
        description:
            'Investigación sobre procesamiento de grandes volúmenes de datos utilizando Apache Spark, PySpark y técnicas de análisis distribuido.',
        category: DocumentCategory.RESEARCH,
        author: mockPersons[4],
        date: '2024-03-25',
        tags: ['Big Data', 'Apache Spark', 'Python', 'Data Analytics', 'PySpark'],
        views: 678,
        downloads: 312,
        abstract:
            'Estudio sobre técnicas de procesamiento distribuido de datos a gran escala. Se implementaron algoritmos de machine learning sobre datasets de más de 100GB utilizando Spark.',
        keywords: ['Big Data', 'Apache Spark', 'Distributed Computing', 'Data Analytics'],
    },
    {
        id: '7',
        title: 'Introducción a la Programación Funcional en JavaScript',
        description:
            'Artículo educativo sobre conceptos fundamentales de programación funcional y su aplicación práctica en JavaScript moderno.',
        category: DocumentCategory.BLOG,
        author: mockPersons[1],
        date: '2024-08-05',
        tags: ['JavaScript', 'Programación Funcional', 'ES6', 'Clean Code'],
        views: 523,
        downloads: 267,
        abstract:
            'Introducción a conceptos de programación funcional como inmutabilidad, funciones puras, composición y higher-order functions aplicados a JavaScript.',
        keywords: ['Functional Programming', 'JavaScript', 'ES6', 'Clean Code'],
    },
    {
        id: '8',
        title: 'Detección de Intrusiones en Redes usando Machine Learning',
        description:
            'Trabajo de grado sobre el desarrollo de un sistema de detección de intrusiones basado en algoritmos de machine learning supervisado.',
        category: DocumentCategory.THESIS,
        author: mockPersons[2],
        date: '2024-05-10',
        tags: ['Machine Learning', 'Ciberseguridad', 'IDS', 'Network Security'],
        views: 389,
        downloads: 145,
        abstract:
            'Sistema de detección de intrusiones que utiliza Random Forest y SVM para identificar patrones anómalos en tráfico de red. Alcanza 96% de precisión en el dataset NSL-KDD.',
        keywords: ['Intrusion Detection', 'Machine Learning', 'Network Security', 'IDS'],
    },
    {
        id: '9',
        title: 'Optimización de Consultas en Bases de Datos NoSQL',
        description:
            'Investigación sobre técnicas de optimización de rendimiento en bases de datos NoSQL, específicamente MongoDB y Cassandra.',
        category: DocumentCategory.RESEARCH,
        author: mockPersons[4],
        coAuthors: [mockPersons[0]],
        date: '2024-07-22',
        tags: ['NoSQL', 'MongoDB', 'Cassandra', 'Performance', 'Database'],
        views: 412,
        downloads: 178,
        abstract:
            'Estudio comparativo de técnicas de optimización en bases de datos NoSQL. Se analizan índices, sharding, replicación y patrones de modelado de datos.',
        keywords: ['NoSQL', 'Database Optimization', 'MongoDB', 'Cassandra', 'Performance'],
    },
    {
        id: '10',
        title: 'Desarrollo de APIs RESTful con Node.js y Express',
        description:
            'Guía completa para el desarrollo de APIs REST escalables y mantenibles utilizando Node.js, Express y mejores prácticas de la industria.',
        category: DocumentCategory.BLOG,
        author: mockPersons[1],
        date: '2024-06-12',
        tags: ['Node.js', 'Express', 'REST API', 'Backend', 'JavaScript'],
        views: 734,
        downloads: 389,
        abstract:
            'Tutorial exhaustivo que cubre desde la configuración inicial hasta temas avanzados como autenticación JWT, validación, manejo de errores y documentación con Swagger.',
        keywords: ['Node.js', 'Express', 'REST API', 'Backend Development'],
    },
    {
        id: '11',
        title: 'Blockchain y Smart Contracts: Aplicaciones Prácticas',
        description:
            'Presentación sobre tecnología blockchain, smart contracts en Ethereum y casos de uso en diferentes industrias.',
        category: DocumentCategory.PRESENTATION,
        author: mockPersons[2],
        date: '2024-04-30',
        tags: ['Blockchain', 'Ethereum', 'Smart Contracts', 'Web3', 'Cryptocurrency'],
        views: 612,
        downloads: 298,
        abstract:
            'Exploración de la tecnología blockchain y su aplicación práctica. Se presentan casos de uso en finanzas, supply chain y sistemas de votación.',
        keywords: ['Blockchain', 'Smart Contracts', 'Ethereum', 'Decentralization'],
    },
    {
        id: '12',
        title: 'Testing en React: Unit, Integration y E2E',
        description:
            'Artículo sobre estrategias de testing en aplicaciones React, cubriendo Jest, React Testing Library y Cypress.',
        category: DocumentCategory.ARTICLE,
        author: mockPersons[1],
        coAuthors: [mockPersons[3]],
        date: '2024-08-15',
        tags: ['React', 'Testing', 'Jest', 'Cypress', 'Quality Assurance'],
        views: 456,
        downloads: 223,
        abstract:
            'Guía completa de testing en React que cubre diferentes niveles: unit tests con Jest, integration tests con React Testing Library y E2E tests con Cypress.',
        keywords: ['React', 'Testing', 'Jest', 'Cypress', 'Quality Assurance'],
    },
];
