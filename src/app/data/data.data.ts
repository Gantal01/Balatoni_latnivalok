import { Attraction } from '../models/attraction.model';
import { Location } from '../models/location.model';
import { Category } from '../models/category.model';
import { Event } from '../models/event.model';

// Locations kollekció - Új helyszínek hozzáadása
export const locations: Location[] = [
  // Északi part helyszínei
  new Location(1, 'Északi part - Balatonfüred', 'north', 'Balatonfüred, Tagore sétány'),
  new Location(2, 'Északi part - Tihany', 'north', 'Tihany, Apátsági lépcső'),
  new Location(3, 'Északi part - Badacsony', 'north', 'Badacsony, Római út'),
  
  // Déli part helyszínei
  new Location(4, 'Déli part - Siófok', 'south', 'Siófok, Ezüstpart'),
  new Location(5, 'Déli part - Zamárdi', 'south', 'Zamárdi, Szabadstrand'),
  new Location(6, 'Déli part - Balatonlelle', 'south', 'Balatonlelle, Napfény strand')
];

// Categories kollekció - Új kategóriák hozzáadása
export const categories: Category[] = [
  new Category(1, 'Strand', 'Strandok a Balaton partján'),
  new Category(2, 'Múzeum', 'Múzeumok és kiállítások'),
  new Category(3, 'Étterem', 'Helyi éttermek'),
  new Category(4, 'Kilátó', 'Kilátók és panoráma pontok'),
  new Category(5, 'Fesztiválhelyszín', 'Fesztiválok és rendezvények helyszínei')
];

// Events kollekció - Új események hozzáadása
export const events: Event[] = [
  // Északi part eseményei
  new Event(1, 1, 'Balatoni Borfesztivál', new Date('2025-07-15'), 'Borfesztivál Balatonfüreden.'),
  new Event(2, 1, 'Balatonfüredi Halászlé Nap', new Date('2025-08-10'), 'Hagyományos halászlé főzőverseny Balatonfüreden.'),
  new Event(3, 2, 'Tihanyi Levendulafesztivál', new Date('2025-06-20'), 'Levendula szüret és fesztivál Tihanyban.'),
  new Event(4, 2, 'Tihanyi Gardafesztivál', new Date('2025-11-05'), 'Hagyományos gardahalászat és fesztivál Tihanyban.'),
  new Event(5, 3, 'Badacsonyi Szüret', new Date('2025-09-15'), 'Szüreti felvonulás és borünnep Badacsonyban.'),
  new Event(6, 3, 'Badacsonyi Borhetek', new Date('2025-07-20'), 'Borkóstolás és kulturális programok Badacsonyban.'),
  
  // Déli part eseményei
  new Event(7, 4, 'Siófoki Halünnep', new Date('2025-08-01'), 'Halételek fesztiválja Siófokon.'),
  new Event(8, 4, 'Siófoki Sörfesztivál', new Date('2025-09-05'), 'Kézműves sörök fesztiválja Siófokon.'),
  new Event(9, 5, 'Balaton Sound Fesztivál', new Date('2025-07-03'), 'Népszerű zenei fesztivál Zamárdiban.'),
  new Event(10, 5, 'Zamárdi Gasztrofesztivál', new Date('2025-08-15'), 'Helyi ételek és italok fesztiválja Zamárdiban.'),
  new Event(11, 6, 'Balatonlellei Borfesztivál', new Date('2025-07-25'), 'Borfesztivál Balatonlellén.'),
  new Event(12, 6, 'Lellei Hal- és Lángosfesztivál', new Date('2025-08-20'), 'Halételek és lángosok fesztiválja Balatonlellén.')
];

// Attractions kollekció - Új látnivalók hozzáadása
export const attractions: Attraction[] = [
  // Északi part látnivalói
  new Attraction(
    1,
    'Mouli Enalitra',
    'Fedezd fel Balatonfüred strandjait!',
    1, // Balatonfüred
    1, // Strand
    '/assets/images/mouli-enalitra.jpg',
    [events[0], events[1]] // Balatoni Borfesztivál, Halászlé Nap
  ),
  new Attraction(
    2,
    'Tihanyi Apátság',
    'Látogasd meg a történelmi Tihanyi Apátságot!',
    2, // Tihany
    2, // Múzeum
    '/assets/images/tihanyi-apatsag.jpg',
    [events[2], events[3]] // Levendulafesztivál, Gardafesztivál
  ),
  new Attraction(
    3,
    'Badacsony Kilátó',
    'Panorámás kilátás a Badacsony tetejéről.',
    3, // Badacsony
    4, // Kilátó
    '/assets/images/badacsony-kilato.jpg',
    [events[4], events[5]] // Badacsonyi Szüret, Borhetek
  ),

  // Déli part látnivalói
  new Attraction(
    4,
    'Mouli Delog',
    'Fedezd fel Siófok strandjait!',
    4, // Siófok
    1, // Strand
    '/assets/images/mouli-delog.jpg',
    [events[6], events[7]] // Siófoki Halünnep, Sörfesztivál
  ),
  new Attraction(
    5,
    'Zamárdi Fesztiválközpont',
    'A Balaton Sound és más fesztiválok helyszíne.',
    5, // Zamárdi
    5, // Fesztiválhelyszín
    '/assets/images/zamardi-fesztival.jpg',
    [events[8], events[9]] // Balaton Sound, Gasztrofesztivál
  ),
  new Attraction(
    6,
    'Napfény Étterem',
    'Helyi specialitások Balatonlellén.',
    6, // Balatonlelle
    3, // Étterem
    '/assets/images/napfeny-etterem.jpg',
    [events[10], events[11]] // Balatonlellei Borfesztivál, Hal- és Lángosfesztivál
  )
];