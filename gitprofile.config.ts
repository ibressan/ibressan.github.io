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
    'Apex',
    'LWC',
    'Visualforce',
    'SOQL',
    'Marketing Cloud',
    'Flow',
    'HTML',
    'CSS',
    'JavaScript',
    'Git',
  ],
  experiences: [
    {
      company: 'Renova Invest',
      position: { pt: 'Salesforce Specialist', en: 'Salesforce Specialist' },
      from: { pt: 'março de 2022', en: 'March 2022' },
      to: { pt: 'Presente', en: 'Present' },
      companyLink: '',
    },
    {
      company: 'Blue3',
      position: { pt: 'Salesforce Specialist', en: 'Salesforce Specialist' },
      from: { pt: 'outubro de 2021', en: 'October 2021' },
      to: { pt: 'fevereiro de 2022', en: 'February 2022' },
      companyLink: '',
    },
    {
      company: 'Souforce.cloud',
      position: { pt: 'Salesforce Developer', en: 'Salesforce Developer' },
      from: { pt: 'abril de 2021', en: 'April 2021' },
      to: { pt: 'outubro de 2021', en: 'October 2021' },
      companyLink: '',
    },
    {
      company: 'Itaú Unibanco',
      position: { pt: 'Engenheiro Salesforce', en: 'Salesforce Engineer' },
      from: { pt: 'abril de 2019', en: 'April 2019' },
      to: { pt: 'abril de 2021', en: 'April 2021' },
      companyLink: '',
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
    },
    {
      company: 'Connekt - Recrutamento',
      position: { pt: 'Salesforce Developer', en: 'Salesforce Developer' },
      from: { pt: 'outubro de 2017', en: 'October 2017' },
      to: { pt: 'setembro de 2018', en: 'September 2018' },
      companyLink: '',
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
    },
    {
      company: 'Softtek',
      position: { pt: 'Trainee', en: 'Trainee' },
      from: { pt: 'setembro de 2014', en: 'September 2014' },
      to: { pt: 'março de 2016', en: 'March 2016' },
      companyLink: '',
    },
    {
      company: 'Hexa Solution',
      position: { pt: 'Estagiário', en: 'Intern' },
      from: { pt: 'setembro de 2013', en: 'September 2013' },
      to: { pt: 'setembro de 2014', en: 'September 2014' },
      companyLink: '',
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
