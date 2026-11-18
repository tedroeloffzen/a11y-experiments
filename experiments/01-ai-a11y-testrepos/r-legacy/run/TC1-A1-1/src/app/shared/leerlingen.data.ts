export interface Leerling {
  id: number;
  naam: string;
  klas: string;
  gemiddelde: number;
}

export const LEERLINGEN: Leerling[] = [
  { id: 1, naam: 'Sanne de Vries', klas: '2A', gemiddelde: 7.4 },
  { id: 2, naam: 'Daan Jansen', klas: '2A', gemiddelde: 6.1 },
  { id: 3, naam: 'Noor Bakker', klas: '2B', gemiddelde: 8.2 },
  { id: 4, naam: 'Lucas Visser', klas: '2B', gemiddelde: 5.4 },
  { id: 5, naam: 'Emma Smit', klas: '3A', gemiddelde: 7.9 },
  { id: 6, naam: 'Milan Meijer', klas: '3A', gemiddelde: 6.8 },
];
