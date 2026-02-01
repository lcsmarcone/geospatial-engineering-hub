export type Language = 'en' | 'pt';

export type TranslationKey = 
  // Navigation
  | 'nav.about'
  | 'nav.projects'
  | 'nav.skills'
  | 'nav.demos'
  | 'nav.architecture'
  | 'nav.contact'
  // Hero
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.cta.projects'
  | 'hero.cta.skills'
  // About
  | 'about.title'
  | 'about.subtitle'
  | 'about.p1'
  | 'about.p2'
  | 'about.p3'
  | 'about.highlight1.title'
  | 'about.highlight1.value'
  | 'about.highlight2.title'
  | 'about.highlight2.value'
  | 'about.highlight3.title'
  | 'about.highlight3.value'
  // Projects
  | 'projects.title'
  | 'projects.subtitle'
  | 'projects.project1.title'
  | 'projects.project1.context'
  | 'projects.project1.challenge'
  | 'projects.project1.solution'
  | 'projects.project1.impact'
  | 'projects.project2.title'
  | 'projects.project2.context'
  | 'projects.project2.challenge'
  | 'projects.project2.solution'
  | 'projects.project2.impact'
  | 'projects.project3.title'
  | 'projects.project3.context'
  | 'projects.project3.challenge'
  | 'projects.project3.solution'
  | 'projects.project3.impact'
  | 'projects.project4.title'
  | 'projects.project4.context'
  | 'projects.project4.challenge'
  | 'projects.project4.solution'
  | 'projects.project4.impact'
  | 'projects.labels.context'
  | 'projects.labels.challenge'
  | 'projects.labels.solution'
  | 'projects.labels.impact'
  | 'projects.labels.stack'
  // Skills
  | 'skills.title'
  | 'skills.subtitle'
  | 'skills.programming.title'
  | 'skills.programming.desc'
  | 'skills.frameworks.title'
  | 'skills.frameworks.desc'
  | 'skills.gis.title'
  | 'skills.gis.desc'
  | 'skills.databases.title'
  | 'skills.databases.desc'
  | 'skills.webmapping.title'
  | 'skills.webmapping.desc'
  | 'skills.cloud.title'
  | 'skills.cloud.desc'
  // Demos
  | 'demos.title'
  | 'demos.subtitle'
  | 'demos.leaflet.title'
  | 'demos.leaflet.desc'
  | 'demos.leaflet.usecase'
  | 'demos.openlayers.title'
  | 'demos.openlayers.desc'
  | 'demos.openlayers.usecase'
  | 'demos.mapbox.title'
  | 'demos.mapbox.desc'
  | 'demos.mapbox.usecase'
  | 'demos.labels.usecase'
  | 'demos.labels.tech'
  // Architecture
  | 'architecture.title'
  | 'architecture.subtitle'
  | 'architecture.frontend.title'
  | 'architecture.frontend.desc'
  | 'architecture.backend.title'
  | 'architecture.backend.desc'
  | 'architecture.database.title'
  | 'architecture.database.desc'
  | 'architecture.cloud.title'
  | 'architecture.cloud.desc'
  | 'architecture.principles.title'
  | 'architecture.principles.p1'
  | 'architecture.principles.p2'
  | 'architecture.principles.p3'
  | 'architecture.principles.p4'
  // Contact
  | 'contact.title'
  | 'contact.subtitle'
  | 'contact.closing'
  | 'contact.email'
  | 'contact.github'
  | 'contact.linkedin'
  // Footer
  | 'footer.rights';

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.demos': 'Demos',
    'nav.architecture': 'Architecture',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Geospatial Software Engineer',
    'hero.subtitle': 'Building scalable GIS & Web Mapping solutions with modern full-stack technologies. Specializing in spatial data processing, WebGIS development, and automation.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.skills': 'Technical Skills',
    
    // About
    'about.title': 'About Me',
    'about.subtitle': 'The Journey from GIS Analyst to Software Engineer',
    'about.p1': 'My career began in environmental consulting, where I worked extensively with spatial data for impact assessments, land use planning, and natural resource management. This hands-on experience revealed the limitations of traditional GIS workflows and sparked my transition into software engineering.',
    'about.p2': 'Today, I combine deep domain expertise in geospatial analysis with modern software development practices. I architect systems that process millions of spatial features, build interactive web mapping applications, and automate complex geoprocessing workflows that previously required days of manual work.',
    'about.p3': 'My focus is on building reliable, performant systems that solve real-world problems. Whether it\'s optimizing a PostGIS query from minutes to milliseconds, designing a scalable tile server architecture, or creating intuitive interfaces for complex spatial operations, I approach every challenge with an engineering mindset.',
    'about.highlight1.title': 'Years of Experience',
    'about.highlight1.value': '8+',
    'about.highlight2.title': 'Projects Delivered',
    'about.highlight2.value': '50+',
    'about.highlight3.title': 'Technologies Mastered',
    'about.highlight3.value': '25+',
    
    // Projects
    'projects.title': 'Challenging Projects',
    'projects.subtitle': 'Complex problems solved with elegant engineering solutions',
    'projects.project1.title': 'Environmental Monitoring Platform',
    'projects.project1.context': 'Environmental agency needed real-time monitoring of air quality sensors across 200+ locations with historical analysis and predictive alerts.',
    'projects.project1.challenge': 'Processing 10M+ daily sensor readings with sub-second query response times while maintaining 3 years of historical data.',
    'projects.project1.solution': 'Designed time-series partitioning strategy in PostGIS with TimescaleDB extension. Implemented materialized views for common aggregations and built a React dashboard with WebSocket updates.',
    'projects.project1.impact': 'Reduced query times by 95%. System now handles 500+ concurrent users with average response time under 200ms.',
    'projects.project2.title': 'Land Parcel Management System',
    'projects.project2.context': 'Real estate company managing 50,000+ parcels needed a web-based system to replace legacy desktop GIS workflows.',
    'projects.project2.challenge': 'Complex spatial queries with multiple overlapping layers, user-defined geometry editing, and integration with government cadastral databases.',
    'projects.project2.solution': 'Built custom OpenLayers-based editor with topology validation. Django REST API with PostGIS for spatial operations. Implemented tile caching with MapProxy for base layers.',
    'projects.project2.impact': 'Reduced parcel analysis time from 2 hours to 5 minutes. Enabled field teams to update data via mobile devices.',
    'projects.project3.title': 'Automated Geoprocessing Pipeline',
    'projects.project3.context': 'NGO processing satellite imagery for deforestation detection needed to scale from manual analysis to automated pipeline.',
    'projects.project3.challenge': 'Processing 500GB+ of imagery weekly with complex raster analysis, classification, and change detection algorithms.',
    'projects.project3.solution': 'Designed containerized pipeline with Python, GDAL, and Rasterio. Implemented parallel processing with Celery workers on AWS ECS. Results served via vector tiles.',
    'projects.project3.impact': 'Reduced processing time from 2 weeks to 4 hours. Enabled near real-time alerts for deforestation events.',
    'projects.project4.title': 'Multi-tenant WebGIS Platform',
    'projects.project4.context': 'Startup needed a white-label platform allowing clients to create custom web mapping applications without coding.',
    'projects.project4.challenge': 'Multi-tenancy with isolated data, customizable layers and styling, and scalable architecture for unknown demand.',
    'projects.project4.solution': 'Next.js frontend with dynamic theming. Node.js backend with tenant-scoped PostGIS schemas. Mapbox GL JS for rendering with custom style editor.',
    'projects.project4.impact': '15 enterprise clients onboarded in first year. Platform serves 100K+ monthly active users.',
    'projects.labels.context': 'Context',
    'projects.labels.challenge': 'Challenge',
    'projects.labels.solution': 'Solution',
    'projects.labels.impact': 'Impact',
    'projects.labels.stack': 'Tech Stack',
    
    // Skills
    'skills.title': 'Technical Skills',
    'skills.subtitle': 'What I can confidently explain in a technical interview',
    'skills.programming.title': 'Programming & Development',
    'skills.programming.desc': 'Core languages and tools for building robust applications',
    'skills.frameworks.title': 'Frameworks & Libraries',
    'skills.frameworks.desc': 'Modern frameworks for web application development',
    'skills.gis.title': 'GIS Software',
    'skills.gis.desc': 'Professional geospatial analysis and enterprise platforms',
    'skills.databases.title': 'Databases',
    'skills.databases.desc': 'Relational and spatial database management systems',
    'skills.webmapping.title': 'Web Mapping Libraries',
    'skills.webmapping.desc': 'Interactive mapping for web applications',
    'skills.cloud.title': 'Cloud & DevOps',
    'skills.cloud.desc': 'Infrastructure, deployment, and automation',
    
    // Demos
    'demos.title': 'Interactive WebGIS Demos',
    'demos.subtitle': 'Live demonstrations of web mapping capabilities',
    'demos.leaflet.title': 'Leaflet Map Demo',
    'demos.leaflet.desc': 'Lightweight, mobile-friendly interactive map with custom markers and popup information.',
    'demos.leaflet.usecase': 'Ideal for simple web maps, mobile apps, and projects requiring minimal bundle size.',
    'demos.openlayers.title': 'OpenLayers Vector Demo',
    'demos.openlayers.desc': 'Advanced vector layer handling with feature styling and spatial analysis capabilities.',
    'demos.openlayers.usecase': 'Best for complex GIS operations, CAD-like editing, and enterprise applications.',
    'demos.mapbox.title': 'Mapbox GL Demo',
    'demos.mapbox.desc': 'High-performance WebGL rendering with 3D terrain and custom styling.',
    'demos.mapbox.usecase': 'Perfect for data visualization, 3D maps, and applications requiring beautiful cartography.',
    'demos.labels.usecase': 'Use Case',
    'demos.labels.tech': 'Technologies',
    
    // Architecture
    'architecture.title': 'Architecture & Engineering Mindset',
    'architecture.subtitle': 'How I design scalable geospatial systems',
    'architecture.frontend.title': 'Frontend',
    'architecture.frontend.desc': 'React/Next.js for dynamic UIs, TypeScript for type safety, Tailwind for styling',
    'architecture.backend.title': 'Backend',
    'architecture.backend.desc': 'Django/Node.js APIs, authentication, business logic, spatial operations',
    'architecture.database.title': 'Database',
    'architecture.database.desc': 'PostgreSQL + PostGIS for spatial data, optimized queries, proper indexing',
    'architecture.cloud.title': 'Cloud Infrastructure',
    'architecture.cloud.desc': 'AWS/Azure deployment, containerization, CI/CD pipelines, monitoring',
    'architecture.principles.title': 'Engineering Principles',
    'architecture.principles.p1': 'Separation of concerns with clear API boundaries',
    'architecture.principles.p2': 'Database-first design with proper spatial indexing',
    'architecture.principles.p3': 'Caching strategies at multiple layers (tile, query, application)',
    'architecture.principles.p4': 'Observability with structured logging and metrics',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Let\'s discuss your geospatial challenges',
    'contact.closing': 'Focused on building scalable and reliable geospatial systems that solve real-world problems.',
    'contact.email': 'Email',
    'contact.github': 'GitHub',
    'contact.linkedin': 'LinkedIn',
    
    // Footer
    'footer.rights': 'All rights reserved.',
  },
  pt: {
    // Navigation
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.skills': 'Habilidades',
    'nav.demos': 'Demos',
    'nav.architecture': 'Arquitetura',
    'nav.contact': 'Contato',
    
    // Hero
    'hero.title': 'Engenheiro de Software Geoespacial',
    'hero.subtitle': 'Desenvolvendo soluções escaláveis de GIS e Web Mapping com tecnologias full-stack modernas. Especializado em processamento de dados espaciais, desenvolvimento WebGIS e automação.',
    'hero.cta.projects': 'Ver Projetos',
    'hero.cta.skills': 'Habilidades Técnicas',
    
    // About
    'about.title': 'Sobre Mim',
    'about.subtitle': 'A Jornada de Analista GIS a Engenheiro de Software',
    'about.p1': 'Minha carreira começou em consultoria ambiental, onde trabalhei extensivamente com dados espaciais para avaliações de impacto, planejamento de uso do solo e gestão de recursos naturais. Essa experiência prática revelou as limitações dos fluxos de trabalho GIS tradicionais e despertou minha transição para a engenharia de software.',
    'about.p2': 'Hoje, combino profundo conhecimento em análise geoespacial com práticas modernas de desenvolvimento de software. Projeto sistemas que processam milhões de feições espaciais, construo aplicações interativas de web mapping e automatizo fluxos complexos de geoprocessamento que antes exigiam dias de trabalho manual.',
    'about.p3': 'Meu foco é construir sistemas confiáveis e performáticos que resolvem problemas reais. Seja otimizando uma consulta PostGIS de minutos para milissegundos, projetando uma arquitetura escalável de servidor de tiles, ou criando interfaces intuitivas para operações espaciais complexas, abordo cada desafio com mentalidade de engenharia.',
    'about.highlight1.title': 'Anos de Experiência',
    'about.highlight1.value': '8+',
    'about.highlight2.title': 'Projetos Entregues',
    'about.highlight2.value': '50+',
    'about.highlight3.title': 'Tecnologias Dominadas',
    'about.highlight3.value': '25+',
    
    // Projects
    'projects.title': 'Projetos Desafiadores',
    'projects.subtitle': 'Problemas complexos resolvidos com soluções elegantes de engenharia',
    'projects.project1.title': 'Plataforma de Monitoramento Ambiental',
    'projects.project1.context': 'Agência ambiental precisava de monitoramento em tempo real de sensores de qualidade do ar em mais de 200 locais com análise histórica e alertas preditivos.',
    'projects.project1.challenge': 'Processar mais de 10M de leituras diárias de sensores com tempo de resposta abaixo de um segundo, mantendo 3 anos de dados históricos.',
    'projects.project1.solution': 'Projetei estratégia de particionamento temporal no PostGIS com extensão TimescaleDB. Implementei views materializadas para agregações comuns e construí dashboard React com atualizações via WebSocket.',
    'projects.project1.impact': 'Reduzi tempos de consulta em 95%. Sistema agora suporta mais de 500 usuários simultâneos com tempo médio de resposta abaixo de 200ms.',
    'projects.project2.title': 'Sistema de Gestão de Parcelas',
    'projects.project2.context': 'Empresa imobiliária gerenciando mais de 50.000 parcelas precisava de sistema web para substituir fluxos de trabalho GIS desktop legados.',
    'projects.project2.challenge': 'Consultas espaciais complexas com múltiplas camadas sobrepostas, edição de geometria definida pelo usuário e integração com bases cadastrais governamentais.',
    'projects.project2.solution': 'Construí editor customizado baseado em OpenLayers com validação topológica. API Django REST com PostGIS para operações espaciais. Implementei cache de tiles com MapProxy para camadas base.',
    'projects.project2.impact': 'Reduzi tempo de análise de parcelas de 2 horas para 5 minutos. Habilitei equipes de campo a atualizar dados via dispositivos móveis.',
    'projects.project3.title': 'Pipeline de Geoprocessamento Automatizado',
    'projects.project3.context': 'ONG processando imagens de satélite para detecção de desmatamento precisava escalar de análise manual para pipeline automatizado.',
    'projects.project3.challenge': 'Processar mais de 500GB de imagens semanalmente com análise raster complexa, classificação e algoritmos de detecção de mudanças.',
    'projects.project3.solution': 'Projetei pipeline containerizado com Python, GDAL e Rasterio. Implementei processamento paralelo com workers Celery no AWS ECS. Resultados servidos via vector tiles.',
    'projects.project3.impact': 'Reduzi tempo de processamento de 2 semanas para 4 horas. Habilitei alertas quase em tempo real para eventos de desmatamento.',
    'projects.project4.title': 'Plataforma WebGIS Multi-tenant',
    'projects.project4.context': 'Startup precisava de plataforma white-label permitindo clientes criar aplicações de web mapping customizadas sem programação.',
    'projects.project4.challenge': 'Multi-tenancy com dados isolados, camadas e estilos customizáveis, e arquitetura escalável para demanda desconhecida.',
    'projects.project4.solution': 'Frontend Next.js com temas dinâmicos. Backend Node.js com schemas PostGIS por tenant. Mapbox GL JS para renderização com editor de estilos customizado.',
    'projects.project4.impact': '15 clientes enterprise integrados no primeiro ano. Plataforma serve mais de 100K usuários ativos mensais.',
    'projects.labels.context': 'Contexto',
    'projects.labels.challenge': 'Desafio',
    'projects.labels.solution': 'Solução',
    'projects.labels.impact': 'Impacto',
    'projects.labels.stack': 'Stack Técnico',
    
    // Skills
    'skills.title': 'Habilidades Técnicas',
    'skills.subtitle': 'O que posso explicar com confiança em uma entrevista técnica',
    'skills.programming.title': 'Programação & Desenvolvimento',
    'skills.programming.desc': 'Linguagens e ferramentas essenciais para construir aplicações robustas',
    'skills.frameworks.title': 'Frameworks & Bibliotecas',
    'skills.frameworks.desc': 'Frameworks modernos para desenvolvimento de aplicações web',
    'skills.gis.title': 'Software GIS',
    'skills.gis.desc': 'Análise geoespacial profissional e plataformas enterprise',
    'skills.databases.title': 'Bancos de Dados',
    'skills.databases.desc': 'Sistemas de gerenciamento de bancos relacionais e espaciais',
    'skills.webmapping.title': 'Bibliotecas de Web Mapping',
    'skills.webmapping.desc': 'Mapeamento interativo para aplicações web',
    'skills.cloud.title': 'Cloud & DevOps',
    'skills.cloud.desc': 'Infraestrutura, deploy e automação',
    
    // Demos
    'demos.title': 'Demos Interativos de WebGIS',
    'demos.subtitle': 'Demonstrações ao vivo de capacidades de web mapping',
    'demos.leaflet.title': 'Demo Leaflet',
    'demos.leaflet.desc': 'Mapa interativo leve e mobile-friendly com marcadores customizados e popups informativos.',
    'demos.leaflet.usecase': 'Ideal para mapas web simples, apps mobile e projetos que requerem bundle mínimo.',
    'demos.openlayers.title': 'Demo OpenLayers Vector',
    'demos.openlayers.desc': 'Manipulação avançada de camadas vetoriais com estilização de feições e capacidades de análise espacial.',
    'demos.openlayers.usecase': 'Melhor para operações GIS complexas, edição tipo CAD e aplicações enterprise.',
    'demos.mapbox.title': 'Demo Mapbox GL',
    'demos.mapbox.desc': 'Renderização WebGL de alta performance com terreno 3D e estilização customizada.',
    'demos.mapbox.usecase': 'Perfeito para visualização de dados, mapas 3D e aplicações que requerem cartografia bonita.',
    'demos.labels.usecase': 'Caso de Uso',
    'demos.labels.tech': 'Tecnologias',
    
    // Architecture
    'architecture.title': 'Arquitetura & Mentalidade de Engenharia',
    'architecture.subtitle': 'Como projeto sistemas geoespaciais escaláveis',
    'architecture.frontend.title': 'Frontend',
    'architecture.frontend.desc': 'React/Next.js para UIs dinâmicas, TypeScript para type safety, Tailwind para estilização',
    'architecture.backend.title': 'Backend',
    'architecture.backend.desc': 'APIs Django/Node.js, autenticação, lógica de negócio, operações espaciais',
    'architecture.database.title': 'Banco de Dados',
    'architecture.database.desc': 'PostgreSQL + PostGIS para dados espaciais, queries otimizadas, indexação adequada',
    'architecture.cloud.title': 'Infraestrutura Cloud',
    'architecture.cloud.desc': 'Deploy AWS/Azure, containerização, pipelines CI/CD, monitoramento',
    'architecture.principles.title': 'Princípios de Engenharia',
    'architecture.principles.p1': 'Separação de responsabilidades com fronteiras de API claras',
    'architecture.principles.p2': 'Design database-first com indexação espacial adequada',
    'architecture.principles.p3': 'Estratégias de cache em múltiplas camadas (tile, query, aplicação)',
    'architecture.principles.p4': 'Observabilidade com logging estruturado e métricas',
    
    // Contact
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Vamos discutir seus desafios geoespaciais',
    'contact.closing': 'Focado em construir sistemas geoespaciais escaláveis e confiáveis que resolvem problemas do mundo real.',
    'contact.email': 'Email',
    'contact.github': 'GitHub',
    'contact.linkedin': 'LinkedIn',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados.',
  },
};
