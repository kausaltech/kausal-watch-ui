const accessibilityStatementData = {
  en: {
    legislation: 'Law on offering digital services (306/2019) based on Directive (EU) 2016/2102 of the European Parliament',
    complianceStatus: 'full|partial|non-compliant',
    nonAccessibleContent: {
      nonCompliant: [
        {
          title: 'Site has graphs that are not accessible',
          description: 'The site displays various numeric data as graphs. The data and information of these graphs is not available in text format. Such content is skipped by the screed readers.',
          WCAGSection: '1.1.1 Ei-tekstuaalinen sisältö',
        },
        {
          title: 'Puutteellisesti kuvattuja linkkejä',
          description: 'Sivustolla esitetään numeerista dataa graafeina. Näiden kuvaajien sisältämä tieto ei ole vielä saatavissa tekstimuotoisena.',
          WCAGSection: '3.2.4 Johdonmukainen merkitseminen',
        },
        {
          title: 'Lang-attribuutit puuttuvat sivuston pääkielestä poikkeavista sisällöistä',
          description: 'Sivuston tekstisisällössä saattaa olla kappaleita jotka poikkeavat sivuston aktiivisesta kielestä. Näille kappaleille ei ole asetettu asiaankuuluvaa lang-attribuuttia.',
          WCAGSection: '3.1.2 Osien kieli',
        }
      ],
      disproportionateBurden: [],
      notInScope: [],
    },
    preparedOn: '7.10.2020',
    reviewedOn: '7.10.2020',
    feedbackLink: '',
    enforcementProcedure: '',
    enforcementBodyName: '',
    enforcementBodyLink: 'https://www.saavutettavuusvaatimukset.fi',
  },
  fi: {
    legislation: 'Laki digitaalisten palvelujen tarjoamisesta (306/2019) joka pohjautuu EU saavutettavuusdirektiiviin 2016/2102',
    complianceStatus: 'full|partial|non-compliant',
    nonAccessibleContent: {
      nonCompliant: [
        {
          title: 'Sivustolla on kuvaajia, jotka eivät ole saavutettavia',
          description: 'Sivustolla esitetään numeerista dataa graafeina. Näiden kuvaajien sisältämä tieto ei ole vielä saatavissa tekstimuotoisena.',
          WCAGSection: '1.1.1 Ei-tekstuaalinen sisältö'
        },
        {
          title: 'Puutteellisesti kuvattuja linkkejä',
          description: 'Sivustolla esitetään numeerista dataa graafeina. Näiden kuvaajien sisältämä tieto ei ole vielä saatavissa tekstimuotoisena.',
          WCAGSection: '3.2.4 Johdonmukainen merkitseminen'
        },
        {
          title: 'Lang-attribuutit puuttuvat sivuston pääkielestä poikkeavista sisällöistä',
          description: 'Sivuston tekstisisällössä saattaa olla kappaleita jotka poikkeavat sivuston aktiivisesta kielestä. Näille kappaleille ei ole asetettu asiaankuuluvaa lang-attribuuttia.',
          WCAGSection: '3.1.2 Osien kieli',
        }
      ],
      disproportionateBurden: [],
      notInScope: [],
    },
    preparedOn: '7.10.2020',
    reviewedOn: '7.10.2020',
    feedbackLink: '',
    enforcementProcedure: '',
    enforcementBodyName: '',
    enforcementBodyLink: 'https://www.saavutettavuusvaatimukset.fi',
  },
};

export default accessibilityStatementData;
