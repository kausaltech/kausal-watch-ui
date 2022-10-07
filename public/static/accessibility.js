const accessibilityStatementData = {
  en: {
    complianceStatus: 'partial',
    nonAccessibleContent: {
      nonCompliant: [
        {
          id: 1,
          title: 'Site has graphs that are not accessible',
          description: 'The site displays various numeric data as graphs. The data and information of these graphs is not available in text format. Such content is skipped by screen readers.',
          WCAGSection: '1.1.1 Non-text Content',
        },
        {
          id: 2,
          title: 'Links not described properly',
          description: 'In the content there are links that do not have a clear description. Some links to files do not have a clear file format indicator.',
          WCAGSection: '2.4.4 Link Purpose (in context), 3.2.4 Consistent Identification',
        },
        {
          id: 3,
          title: 'Lang-attributes are missing in sections that have a language different from the site active language',
          description: 'Some individual parts of the content may be written in a different language than the current active language. Those parts are not marked with a lang-attribute.',
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
  de: {
    complianceStatus: 'partial',
    nonAccessibleContent: {
      nonCompliant: [
        {
          id: 1,
          title: 'Die Webseite enthält nicht barrierefreie Diagramme',
          description: 'Die Website zeigt verschiedene numerische Daten als Diagramme an. Die Daten und Informationen dieser Grafiken sind nicht im Textformat verfügbar. Solche Inhalte werden von Screenreadern übersprungen.',
          WCAGSection: '1.1.1 Nicht-Text-Inhalt',
        },
        {
          id: 2,
          title: 'Links sind nicht richtig beschrieben',
          description: 'Im Inhalt gibt es Links, die keine klare Beschreibung haben. Einige Links zu Dateien haben keine klare Dateiformatanzeige.',
          WCAGSection: '2.4.4 Linkzweck (im Kontext), 3.2.4 Konsistente Erkennung',
        },
        {
          id: 3,
          title: 'Lang-Attribute fehlen in Abschnitten, die eine andere Sprache als die aktive Sprache der Website haben',
          description: 'Einige einzelne Teile des Inhalts können in einer anderen Sprache als der aktuell aktiven Sprache verfasst sein. Diese Teile sind nicht mit einem lang-Attribut gekennzeichnet.',
          WCAGSection: '3.1.2 Sprache von Teilen',
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
