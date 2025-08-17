export interface Certification {
  id: string;
  name: string;
  issuer: string;
  badgeId: string;
  imageUrl?: string;
  credlyUrl: string;
}

export const certifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Certification',
    issuer: 'Amazon Web Services',
    badgeId: '277ee05a-a443-4013-8bc0-70c2b73465f2',
    credlyUrl: 'https://www.credly.com/badges/277ee05a-a443-4013-8bc0-70c2b73465f2',
    // You'll need to add the actual image URL from Credly
  },
  {
    id: '2',
    name: 'Professional Certification',
    issuer: 'Certification Authority',
    badgeId: '649829b1-8a7d-49f0-bb64-547fb373c2be',
    credlyUrl: 'https://www.credly.com/badges/649829b1-8a7d-49f0-bb64-547fb373c2be',
  },
  {
    id: '3',
    name: 'Technical Certification',
    issuer: 'Certification Body',
    badgeId: 'cd1f88d8-b22d-426d-a84c-45ddacd2f24b',
    credlyUrl: 'https://www.credly.com/badges/cd1f88d8-b22d-426d-a84c-45ddacd2f24b',
  },
  {
    id: '4',
    name: 'Development Certification',
    issuer: 'Tech Institute',
    badgeId: '5eb67c34-65e0-4096-bc8b-474995d64f5d',
    credlyUrl: 'https://www.credly.com/badges/5eb67c34-65e0-4096-bc8b-474995d64f5d',
  }
];