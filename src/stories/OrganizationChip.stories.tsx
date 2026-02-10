import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { ActionResponsiblePartyRole } from '@/common/__generated__/graphql';
import OrganizationChip from '@/components/common/OrganizationChip';

// Mock organization data
const mockOrgWithAbbreviation = {
  id: 'org-1',
  name: 'City Planning Department',
  abbreviation: 'CPD',
  email: 'planning@city.gov',
};

const mockOrgWithoutAbbreviation = {
  id: 'org-2',
  name: 'Environmental Protection Agency',
  abbreviation: '',
  email: 'epa@city.gov',
};

const mockOrgNullAbbreviation = {
  id: 'org-3',
  name: 'Transportation Authority',
  abbreviation: null,
  email: undefined,
};

const mockOrgNoEmail = {
  id: 'org-4',
  name: 'Public Works',
  abbreviation: 'PW',
  email: undefined,
};

const meta = {
  title: 'Common/OrganizationChip',
  component: OrganizationChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    organization: {
      control: false,
    },
    role: {
      control: 'select',
      options: [undefined, 'PRIMARY', 'COLLABORATOR'],
    },
    specifier: {
      control: 'text',
    },
    linkToOrganization: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof OrganizationChip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic stories
export const Default: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
  },
};

export const WithoutAbbreviation: Story = {
  args: {
    organization: mockOrgWithoutAbbreviation,
  },
};

export const NullAbbreviation: Story = {
  args: {
    organization: mockOrgNullAbbreviation,
  },
};

export const WithEmail: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
  },
};

export const WithoutEmail: Story = {
  args: {
    organization: mockOrgNoEmail,
  },
};

// Role-based stories
export const PrimaryRole: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
    role: 'PRIMARY' as ActionResponsiblePartyRole,
  },
};

export const CollaboratorRole: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
    role: 'COLLABORATOR' as ActionResponsiblePartyRole,
  },
};

export const PrimaryRoleWithoutAbbreviation: Story = {
  args: {
    organization: mockOrgWithoutAbbreviation,
    role: 'PRIMARY' as ActionResponsiblePartyRole,
  },
};

export const CollaboratorRoleWithoutAbbreviation: Story = {
  args: {
    organization: mockOrgWithoutAbbreviation,
    role: 'COLLABORATOR' as ActionResponsiblePartyRole,
  },
};

// Specifier stories
export const WithSpecifier: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
    specifier: 'Lead organization',
  },
};

export const PrimaryWithSpecifier: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
    role: 'PRIMARY' as ActionResponsiblePartyRole,
    specifier: 'Main responsible party',
  },
};

export const CollaboratorWithSpecifier: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
    role: 'COLLABORATOR' as ActionResponsiblePartyRole,
    specifier: 'Supporting organization',
  },
};

export const WithLongSpecifier: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
    specifier:
      'This is a longer specifier text that describes the role of the organization in more detail',
  },
};

// Link behavior stories
export const WithoutLink: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
    linkToOrganization: false,
  },
};

export const PrimaryWithoutLink: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
    role: 'PRIMARY' as ActionResponsiblePartyRole,
    linkToOrganization: false,
  },
};

export const WithSpecifierAndEmail: Story = {
  args: {
    organization: mockOrgWithAbbreviation,
    specifier: 'Contact person',
  },
};

// Edge cases
export const LongOrganizationName: Story = {
  args: {
    organization: {
      id: 'org-5',
      name: 'Department of Environmental Protection and Sustainability',
      abbreviation: 'DEPS',
      email: 'deps@city.gov',
    },
  },
};

export const VeryLongOrganizationName: Story = {
  args: {
    organization: {
      id: 'org-6',
      name: 'Interdepartmental Committee on Climate Change and Environmental Sustainability',
      abbreviation: '',
      email: undefined,
    },
  },
};

export const ShortAbbreviation: Story = {
  args: {
    organization: {
      id: 'org-7',
      name: 'City Council',
      abbreviation: 'CC',
      email: 'council@city.gov',
    },
  },
};

export const SingleLetterAbbreviation: Story = {
  args: {
    organization: {
      id: 'org-8',
      name: "Mayor's Office",
      abbreviation: 'M',
      email: undefined,
    },
  },
};
