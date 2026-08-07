// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'ibressan', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: ['ibressan/ibressan', 'ibressan/ibressan.github.io'], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: ['ibressan/salesforce-news', 'ibressan/trailhead-git-profile'], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [],
    },
  },
  seo: { title: 'iBressan - Salesforce Architect', description: '', imageURL: '' },
  social: {
    linkedin: 'igorbressan',
    x: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    discord: '',
    telegram: '',
    website: '',
    phone: '',
    email: '',
  },
  resume: {
    fileUrl: '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Salesforce',
    'Sales Cloud',
    'Service Cloud',
    'Experience Cloud',
    'Marketing Cloud',
    'Apex',
    'LWC',
    'Aura Components',
    'Visualforce',
    'SOQL',
    'REST APIs',
    'SOAP APIs',
    'Flow',
    'HubSpot',
    'Java',
    'JavaScript',
    'HTML',
    'CSS',
    'SQL',
    'Oracle',
    'PostgreSQL',
    'SQL Server',
    'MySQL',
    'Informix',
    'Git',
  ],
  experiences: [
    {
      company: 'Renova Invest',
      position: { pt: 'Salesforce Specialist', en: 'Salesforce Specialist' },
      from: { pt: 'março de 2022', en: 'March 2022' },
      to: { pt: 'Presente', en: 'Present' },
      companyLink: '',
      highlights: [
        {
          pt: 'Referência técnica para Sales Cloud e Marketing Cloud, respondendo pelos produtos Salesforce da companhia.',
          en: "Technical reference for Sales Cloud and Marketing Cloud, owning the company's Salesforce products.",
        },
        {
          pt: 'Administração e governança dos ambientes Salesforce, assegurando estabilidade e conformidade.',
          en: 'Administration and governance of Salesforce environments, ensuring stability and compliance.',
        },
        {
          pt: 'Desenho de arquitetura de soluções para novas iniciativas de negócio, alinhando tecnologia à estratégia da empresa.',
          en: 'Solution architecture design for new business initiatives, aligning technology with company strategy.',
        },
        {
          pt: 'Desenvolvimento de funcionalidades em Apex e Lightning Web Components (LWC), sustentando a evolução da plataforma.',
          en: "Development of features in Apex and Lightning Web Components (LWC), supporting the platform's evolution.",
        },
        {
          pt: 'Implementação de integrações entre Salesforce e sistemas corporativos, otimizando o fluxo de dados entre áreas.',
          en: 'Implementation of integrations between Salesforce and corporate systems, optimizing data flow across departments.',
        },
        {
          pt: 'Levantamento e refinamento de requisitos junto às áreas de negócio, servindo de ponte entre necessidade de negócio e implementação técnica.',
          en: 'Requirements gathering and refinement with business stakeholders, bridging business needs and technical implementation.',
        },
        {
          pt: 'Resolução de incidentes críticos e condução de projetos estratégicos, mantendo a plataforma estável e em evolução.',
          en: 'Resolution of critical incidents and leadership of strategic projects, keeping the platform stable and evolving.',
        },
        {
          pt: 'Definição de boas práticas de desenvolvimento Salesforce, elevando o padrão de qualidade do time.',
          en: "Definition of Salesforce development best practices, raising the team's quality standard.",
        },
        {
          pt: 'Apoio pontual a iniciativas com HubSpot, incluindo integrações, suporte técnico e evolução de processos de CRM.',
          en: 'Occasional support for HubSpot initiatives, including integrations, technical support, and CRM process evolution.',
        },
        {
          pt: 'Documentação de todo o ciclo das soluções, da especificação à documentação técnica para manutenções futuras.',
          en: 'Documentation of the full solution lifecycle, from specification to technical documentation for future maintenance.',
        },
      ],
    },
    {
      company: 'Blue3',
      position: { pt: 'Salesforce Specialist', en: 'Salesforce Specialist' },
      from: { pt: 'outubro de 2021', en: 'October 2021' },
      to: { pt: 'fevereiro de 2022', en: 'February 2022' },
      companyLink: '',
      highlights: [
        {
          pt: 'Responsabilidade pela plataforma Salesforce Sales Cloud da organização.',
          en: "Responsible for the organization's Salesforce Sales Cloud platform.",
        },
        {
          pt: 'Administração e governança do ambiente Salesforce.',
          en: 'Administration and governance of the Salesforce environment.',
        },
        {
          pt: 'Arquitetura e implementação de soluções, atuando como referência técnica para o time.',
          en: 'Solution architecture and implementation, acting as technical reference for the team.',
        },
        {
          pt: 'Desenvolvimento e manutenção de funcionalidades, com integrações a sistemas internos e plataformas externas.',
          en: 'Development and maintenance of features, including integrations with internal systems and external platforms.',
        },
        {
          pt: 'Suporte técnico e funcional às áreas de negócio, evoluindo a plataforma para ganho de eficiência operacional e escalabilidade.',
          en: 'Technical and functional support for business areas, evolving the platform for operational efficiency and scalability gains.',
        },
      ],
    },
    {
      company: 'Souforce.cloud',
      position: { pt: 'Salesforce Developer', en: 'Salesforce Developer' },
      from: { pt: 'abril de 2021', en: 'April 2021' },
      to: { pt: 'outubro de 2021', en: 'October 2021' },
      companyLink: '',
      highlights: [
        {
          pt: 'Desenvolvimento e sustentação de soluções Salesforce em projetos Sales Cloud, Service Cloud e Experience Cloud.',
          en: 'Development and support of Salesforce solutions across Sales Cloud, Service Cloud, and Experience Cloud projects.',
        },
        {
          pt: 'Implementação de soluções em Salesforce Lightning, com integrações a sistemas externos.',
          en: 'Implementation of Salesforce Lightning solutions, with integrations to external systems.',
        },
        {
          pt: 'Atuação em projetos para clientes nacionais e internacionais.',
          en: 'Work on projects for both national and international clients.',
        },
      ],
    },
    {
      company: 'Itaú Unibanco',
      position: { pt: 'Engenheiro Salesforce', en: 'Salesforce Engineer' },
      from: { pt: 'abril de 2019', en: 'April 2019' },
      to: { pt: 'abril de 2021', en: 'April 2021' },
      companyLink: '',
      highlights: [
        {
          pt: 'Desenvolvimento, sustentação e evolução de soluções Salesforce, com correção de incidentes e implementação de melhorias contínuas.',
          en: 'Development, support, and evolution of Salesforce solutions, including incident resolution and continuous improvements.',
        },
        {
          pt: 'Concepção e desenho de novas soluções, com configuração e parametrização da plataforma.',
          en: 'Design and conception of new solutions, including platform configuration and setup.',
        },
        {
          pt: 'Integrações com outras plataformas e atuação em projetos críticos para o negócio.',
          en: 'Integrations with other platforms and work on business-critical projects.',
        },
      ],
    },
    {
      company: 'Resource IT Solutions',
      position: {
        pt: 'Developer and Consultant Salesforce',
        en: 'Salesforce Developer and Consultant',
      },
      from: { pt: 'setembro de 2018', en: 'September 2018' },
      to: { pt: 'abril de 2019', en: 'April 2019' },
      companyLink: '',
      highlights: [
        {
          pt: 'Desenvolvimento, configuração e parametrização da plataforma Salesforce para cliente do segmento de seguros.',
          en: 'Development, configuration, and setup of the Salesforce platform for an insurance-sector client.',
        },
        {
          pt: 'Responsabilidade técnica por aplicações em Salesforce Lightning e Experience Cloud.',
          en: 'Technical ownership of Salesforce Lightning and Experience Cloud applications.',
        },
        {
          pt: 'Integrações com outras plataformas, em atuação junto à equipe de projetos do cliente.',
          en: "Integrations with other platforms, working alongside the client's project team.",
        },
      ],
    },
    {
      company: 'Connekt - Recrutamento',
      position: { pt: 'Salesforce Developer', en: 'Salesforce Developer' },
      from: { pt: 'outubro de 2017', en: 'October 2017' },
      to: { pt: 'setembro de 2018', en: 'September 2018' },
      companyLink: '',
      highlights: [
        {
          pt: 'Configuração e parametrização da plataforma Salesforce, com integrações a outras plataformas.',
          en: 'Configuration and setup of the Salesforce platform, with integrations to other platforms.',
        },
        {
          pt: 'Atuação em projetos internos e de clientes, com correção de incidentes.',
          en: 'Work on internal and client projects, including incident resolution.',
        },
        {
          pt: 'Implantação de projeto Marketing Cloud, incluindo criação de jornadas (Journey Builder), modelos de e-mail (Email Studio) e automações (Automation Studio).',
          en: 'Marketing Cloud implementation project, including journey creation (Journey Builder), email templates (Email Studio), and automations (Automation Studio).',
        },
      ],
    },
    {
      company: 'BSI Tecnologia',
      position: {
        pt: 'Developer and Consultant Salesforce',
        en: 'Salesforce Developer and Consultant',
      },
      from: { pt: 'março de 2016', en: 'March 2016' },
      to: { pt: 'outubro de 2017', en: 'October 2017' },
      companyLink: '',
      highlights: [
        {
          pt: 'Consultoria e gestão de ambientes Salesforce.',
          en: 'Consulting and management of Salesforce environments.',
        },
        {
          pt: 'Atuação em equipe de sustentação da plataforma de atendimento de empresa do segmento bancário, com foco no módulo de pessoa jurídica e atuação frequente em pessoa física.',
          en: "Support team member for a banking-sector customer service platform, focused on the corporate accounts module with frequent work on the individual accounts module.",
        },
        {
          pt: 'Participação em projetos internos e externos, com correção de incidentes, integrações externas, configuração e parametrização da plataforma.',
          en: 'Participation in internal and external projects, including incident resolution, external integrations, and platform configuration.',
        },
      ],
    },
    {
      company: 'Softtek',
      position: { pt: 'Trainee', en: 'Trainee' },
      from: { pt: 'setembro de 2014', en: 'September 2014' },
      to: { pt: 'março de 2016', en: 'March 2016' },
      companyLink: '',
      highlights: [
        {
          pt: 'Atuação em equipe de sustentação de cliente de grande porte do varejo, com foco na área de lojas, incluindo atendimento de incidentes, chamados e requisições de negócio.',
          en: 'Support team member for a large retail client, focused on the stores area, including incident handling, tickets, and business requests.',
        },
        {
          pt: 'Desenvolvimento de melhorias e análise de código-fonte em Informix 4GL, com análise de regras de negócio e processos.',
          en: 'Development of enhancements and source code analysis in Informix 4GL, along with business rule and process analysis.',
        },
      ],
    },
    {
      company: 'Hexa Solution',
      position: { pt: 'Estagiário', en: 'Intern' },
      from: { pt: 'setembro de 2013', en: 'September 2013' },
      to: { pt: 'setembro de 2014', en: 'September 2014' },
      companyLink: '',
      highlights: [
        {
          pt: 'Desenvolvimento de sistemas e customização da ferramenta HP Project and Portfolio Management, com queries em Oracle PL/SQL.',
          en: 'Systems development and customization of HP Project and Portfolio Management, with Oracle PL/SQL queries.',
        },
        {
          pt: 'Apoio em levantamento de requisitos, testes de software, especificação funcional e suporte ao usuário.',
          en: 'Support with requirements gathering, software testing, functional specification, and user support.',
        },
      ],
    },
  ],
  certifications: [
    {
      name: 'Salesforce Certified Platform Developer I',
      body: {
        pt: 'Profissionais certificados em Platform Developer entendem como desenvolver e implantar lógica de negócio e interfaces customizadas usando os recursos de programação da Lightning Platform. Também são capazes de estender a Lightning Platform usando Apex e Visualforce.',
        en: 'Certified Platform Developers understand how to develop and deploy custom business logic and custom interfaces using the programmatic capabilities of the Lightning Platform. They can also extend the Lightning Platform using Apex and Visualforce.',
      },
      year: { pt: 'Outubro de 2017', en: 'October 2017' },
      link: 'https://www.salesforce.com/trailblazer/ibressan',
    },
  ],
  educations: [
    {
      institution: 'Universidade São Judas Tadeu',
      degree: {
        pt: 'Bacharel em Ciência da Computação',
        en: "Bachelor's Degree in Computer Science",
      },
      from: '2011',
      to: '2016',
    },
  ],
  publications: [],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 2, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: { id: '', snippetVersion: 6 },
  themeConfig: {
    defaultTheme: 'abyss',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: ['abyss'],
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `© ${new Date().getFullYear()} Igor Bressan`,

  enablePWA: true,
};

export default CONFIG;
