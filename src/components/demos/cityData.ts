export interface City {
  name: string;
  shortCode: string;
  region: string;
  color: string;
  lat: number;
  lng: number;
  population: number; // millions
  desc: { en: string; pt: string };
}

export const CITIES: City[] = [
  { name: 'Manaus',         shortCode: 'MAN', region: 'Norte',        color: '#10b981', lat: -3.1190,  lng: -60.0217, population: 2.2,  desc: { en: 'Capital of Amazonas, heart of the Amazon',          pt: 'Capital do Amazonas, coração da Amazônia' } },
  { name: 'Belém',          shortCode: 'BEL', region: 'Norte',        color: '#10b981', lat: -1.4558,  lng: -48.5044, population: 1.5,  desc: { en: 'Gateway to the Amazon, capital of Pará',            pt: 'Portal da Amazônia, capital do Pará' } },
  { name: 'Salvador',       shortCode: 'SSA', region: 'Nordeste',     color: '#f59e0b', lat: -12.9714, lng: -38.5014, population: 2.9,  desc: { en: 'First capital of Brazil, capital of Bahia',         pt: 'Primeira capital do Brasil, capital da Bahia' } },
  { name: 'Recife',         shortCode: 'REC', region: 'Nordeste',     color: '#f59e0b', lat: -8.0476,  lng: -34.8770, population: 1.6,  desc: { en: 'Brazilian Venice, capital of Pernambuco',           pt: 'Veneza Brasileira, capital de Pernambuco' } },
  { name: 'Fortaleza',      shortCode: 'FOR', region: 'Nordeste',     color: '#f59e0b', lat: -3.7172,  lng: -38.5434, population: 2.7,  desc: { en: 'City of sunshine, capital of Ceará',               pt: 'Cidade do sol, capital do Ceará' } },
  { name: 'São Luís',       shortCode: 'SLZ', region: 'Nordeste',     color: '#f59e0b', lat: -2.5297,  lng: -44.3028, population: 1.1,  desc: { en: 'Island of Love, capital of Maranhão',              pt: 'Ilha do Amor, capital do Maranhão' } },
  { name: 'Brasília',       shortCode: 'BSB', region: 'Centro-Oeste', color: '#8b5cf6', lat: -15.7942, lng: -47.8822, population: 3.1,  desc: { en: 'Federal Capital of Brazil',                        pt: 'Capital Federal do Brasil' } },
  { name: 'Goiânia',        shortCode: 'GYN', region: 'Centro-Oeste', color: '#8b5cf6', lat: -16.6864, lng: -49.2643, population: 1.5,  desc: { en: 'Capital of Goiás',                                 pt: 'Capital de Goiás' } },
  { name: 'São Paulo',      shortCode: 'SP',  region: 'Sudeste',      color: '#3b82f6', lat: -23.5505, lng: -46.6333, population: 12.3, desc: { en: "Largest metropolis in Brazil and South America",    pt: 'Maior metrópole do Brasil e da América do Sul' } },
  { name: 'Rio de Janeiro', shortCode: 'RJ',  region: 'Sudeste',      color: '#3b82f6', lat: -22.9068, lng: -43.1729, population: 6.7,  desc: { en: 'Marvelous City',                                   pt: 'Cidade Maravilhosa' } },
  { name: 'Belo Horizonte', shortCode: 'BHZ', region: 'Sudeste',      color: '#3b82f6', lat: -19.9167, lng: -43.9345, population: 2.5,  desc: { en: 'Capital of Minas Gerais',                          pt: 'Capital de Minas Gerais' } },
  { name: 'Curitiba',       shortCode: 'CWB', region: 'Sul',          color: '#ef4444', lat: -25.4284, lng: -49.2733, population: 1.9,  desc: { en: 'Ecological capital of Brazil, capital of Paraná',  pt: 'Capital ecológica do Brasil, capital do Paraná' } },
  { name: 'Florianópolis',  shortCode: 'FLN', region: 'Sul',          color: '#ef4444', lat: -27.5954, lng: -48.5480, population: 0.5,  desc: { en: 'Magic Island, capital of Santa Catarina',          pt: 'Ilha da Magia, capital de Santa Catarina' } },
  { name: 'Porto Alegre',   shortCode: 'POA', region: 'Sul',          color: '#ef4444', lat: -30.0346, lng: -51.2177, population: 1.5,  desc: { en: 'Capital of Rio Grande do Sul',                     pt: 'Capital do Rio Grande do Sul' } },
];

export const REGIONS = [
  { name: 'Norte',        color: '#10b981' },
  { name: 'Nordeste',     color: '#f59e0b' },
  { name: 'Centro-Oeste', color: '#8b5cf6' },
  { name: 'Sudeste',      color: '#3b82f6' },
  { name: 'Sul',          color: '#ef4444' },
];

export const REGION_POPULATIONS = REGIONS.map((r) => ({
  ...r,
  population: Number(
    CITIES.filter((c) => c.region === r.name)
      .reduce((s, c) => s + c.population, 0)
      .toFixed(1)
  ),
}));
