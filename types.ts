
export interface ISOStandard {
  id: string;
  number: number;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription?: string;
  importance: 'Critical' | 'High' | 'Medium' | 'Foundational';
}

export enum StandardCategory {
  Requirements = 'Requirements',
  Guidelines = 'Guidelines',
  Vocabulary = 'Vocabulary',
  SectorSpecific = 'Sector Specific',
  Privacy = 'Privacy',
  Governance = 'Governance'
}
