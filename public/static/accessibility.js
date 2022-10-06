const accessibilityStatementData = {
  en: {
    complianceStatus: 'partial',
    nonAccessibleContent: {
      nonCompliant: [
        {
          id: 1,
          title: 'Site has graphs that are not accessible',
          description: 'The site displays various numeric data as graphs. The data and information of these graphs is not available in text format. Such content is skipped by the screed readers.',
          WCAGSection: '1.1.1 Non-text Content',
        },
        {
          id: 2,
          title: 'Links not described properly',
          description: 'In content there are links that do not have clear description. Some links to files do not have clear file format indicator.',
          WCAGSection: '2.4.4 Link Purpose (in context), 3.2.4 Consistent Identification',
        },
        {
          id: 3,
          title: 'Lang-attributes are missing in sections that have different language to the site active language',
          description: 'Some individual parts of the content may be written in different language than the current active language. Those parts are not identified with lang-attribute.',
          WCAGSection: '3.1.2 Language of Parts',
        },
      ],
      disproportionateBurden: [],
      notInScope: [],
    },
    preparedOn: '7.10.2020',
    reviewedOn: '7.10.2022',
    feedbackEmail: 'accessibility@kausal.tech',
    feedbackLink: '',
  },
  fi: {
    complianceStatus: 'partial',
    nonAccessibleContent: {
      nonCompliant: [
        {
          id: 1,
          title: 'Sivustolla on kuvaajia, jotka eivät ole saavutettavia',
          description: 'Sivustolla esitetään numeerista dataa graafeina. Näiden kuvaajien sisältämä tieto ei ole vielä saatavissa tekstimuotoisena.',
          WCAGSection: '1.1.1 Ei-tekstuaalinen sisältö',
        },
        {
          id: 2,
          title: 'Puutteellisesti kuvattuja linkkejä',
          description: 'Sivustolla on puutteellisesti kuvattuja linkkejä. Kaikkiin liitetiedostoihin johtaviin linkkeihin ei ole merkitty tietoa tiedostomuodosta.',
          WCAGSection: '2.4.4 Linkin tarkoitus, 3.2.4 Johdonmukainen merkitseminen',
        },
        {
          id: 3,
          title: 'Lang-attribuutit puuttuvat sivuston pääkielestä poikkeavista sisällöistä',
          description: 'Sivuston tekstisisällössä saattaa olla kappaleita jotka poikkeavat sivuston aktiivisesta kielestä. Näille kappaleille ei ole asetettu asiaankuuluvaa lang-attribuuttia.',
          WCAGSection: '3.1.2 Osien kieli',
        },
      ],
      disproportionateBurden: [],
      notInScope: [],
    },
    preparedOn: '7.10.2020',
    reviewedOn: '7.10.2022',
    feedbackLink: '',
  },
};

export default accessibilityStatementData;
