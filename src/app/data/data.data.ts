import { Attraction } from '../models/attraction.model';
import { Location } from '../models/location.model';
import { Category } from '../models/category.model';
import { Event } from '../models/event.model';

// Locations kollekció - "Északi part" és "Déli part" előtagok eltávolítva
export const locations: Location[] = [
  // Északi part helyszínei
  new Location(1, 'Balatonfüred', 'north', 'Balatonfüred, Tagore sétány'),
  new Location(2, 'Tihany', 'north', 'Tihany, Apátsági lépcső'),
  new Location(3, 'Badacsony', 'north', 'Badacsony, Római út'),
  new Location(4, 'Balatonakarattya', 'north', 'Balatonakarattya, Magaspart'),
  new Location(5, 'Keszthely', 'north', 'Keszthely, Festetics-kastély környéke'),
  new Location(6, 'Csopak', 'north', 'Csopak, Csonkatorony környéke'),

  // Déli part helyszínei
  new Location(7, 'Siófok', 'south', 'Siófok, Aranypart'),
  new Location(8, 'Zamárdi', 'south', 'Zamárdi, Szabadstrand'),
  new Location(9, 'Balatonlelle', 'south', 'Balatonlelle, Napfény strand'),
  new Location(10, 'Fonyód', 'south', 'Fonyód, Bélatelepi strand'),
  new Location(11, 'Balatonboglár', 'south', 'Balatonboglár, Platán strand'),
  new Location(12, 'Balatonszemes', 'south', 'Balatonszemes, Központi strand')
];

// Categories kollekció - Változatlan
export const categories: Category[] = [
  new Category(1, 'Strand', 'Pihenés és fürdőzés a Balaton partján'),
  new Category(2, 'Múzeum', 'Történelmi és kulturális kiállítások'),
  new Category(3, 'Étterem', 'Helyi gasztronómiai élmények'),
  new Category(4, 'Kilátó', 'Panorámás kilátópontok a Balaton körül'),
  new Category(5, 'Fesztiválhelyszín', 'Zenei, kulturális és gasztronómiai rendezvények helyszínei'),
  new Category(6, 'Természeti látványosság', 'A Balaton természeti kincsei')
];

// Events kollekció - Változatlan
export const events: Event[] = [
  // Északi part eseményei
  new Event(1, 1, 'Balatonfüredi Borfesztivál', new Date('2025-07-15'), 'Borfesztivál Balatonfüreden, helyi borokkal és kulturális programokkal.'),
  new Event(2, 1, 'Anna-bál', new Date('2025-07-26'), 'Hagyományos bál Balatonfüreden, elegáns programokkal.'),
  new Event(3, 2, 'Tihanyi Levendulafesztivál', new Date('2025-06-20'), 'Levendula szüret és fesztivál Tihanyban.'),
  new Event(4, 2, 'Tihanyi Gardafesztivál', new Date('2025-11-05'), 'Hagyományos gardahalászat és gasztrofesztivál Tihanyban.'),
  new Event(5, 3, 'Badacsonyi Szüret', new Date('2025-09-15'), 'Szüreti felvonulás és borünnep Badacsonyban.'),
  new Event(6, 3, 'Badacsonyi Borhetek', new Date('2025-07-20'), 'Borkóstolás és kulturális programok Badacsonyban.'),
  new Event(7, 4, 'Akarttyai Nyárindító Fesztivál', new Date('2025-06-01'), 'Szezonnyitó fesztivál Balatonakarattyán, koncertekkel és helyi finomságokkal.'),
  new Event(8, 4, 'Magaspart Piknik', new Date('2025-08-10'), 'Családi piknik Balatonakarattyán, a Magasparton.'),
  new Event(9, 5, 'Keszthelyi Borfesztivál', new Date('2025-08-15'), 'Borkóstolás és kulturális programok Keszthelyen.'),
  new Event(10, 5, 'Festetics-kastély Nyáresti Koncertek', new Date('2025-07-10'), 'Klasszikus zenei koncertek a Festetics-kastély parkjában.'),
  new Event(11, 6, 'Csopaki Rizling Napok', new Date('2025-07-05'), 'Rizling kóstolás és gasztroprogramok Csopakon.'),
  new Event(12, 6, 'Csopaki Szüreti Napok', new Date('2025-09-20'), 'Hagyományos szüreti mulatság Csopakon.'),

  // Déli part eseményei
  new Event(13, 7, 'Siófoki Nyárindító Fesztivál', new Date('2025-06-15'), 'Szezonnyitó fesztivál Siófokon, koncertekkel és utcabállal.'),
  new Event(14, 7, 'Siófoki Sörfesztivál', new Date('2025-09-05'), 'Kézműves sörök fesztiválja Siófokon.'),
  new Event(15, 8, 'Balaton Sound Fesztivál', new Date('2025-07-03'), 'Népszerű zenei fesztivál Zamárdiban.'),
  new Event(16, 8, 'Zamárdi Gasztrofesztivál', new Date('2025-08-15'), 'Helyi ételek és italok fesztiválja Zamárdiban.'),
  new Event(17, 9, 'Balatonlellei Borfesztivál', new Date('2025-07-25'), 'Borfesztivál Balatonlellén, helyi borokkal és koncertekkel.'),
  new Event(18, 9, 'Lellei Hal- és Lángosfesztivál', new Date('2025-08-20'), 'Halételek és lángosok fesztiválja Balatonlellén.'),
  new Event(19, 10, 'Fonyódi Halászléfőző Verseny', new Date('2025-08-05'), 'Hagyományos halászléfőző verseny Fonyódon.'),
  new Event(20, 10, 'Fonyódi Nyári Esték', new Date('2025-07-15'), 'Kulturális programok és koncertek Fonyódon.'),
  new Event(21, 11, 'Balatonboglári Szüreti Fesztivál', new Date('2025-09-10'), 'Szüreti mulatság és borfesztivál Balatonbogláron.'),
  new Event(22, 11, 'BB Borfesztivál', new Date('2025-08-20'), 'Híres borfesztivál Balatonbogláron.'),
  new Event(23, 12, 'Balatonszemesi Halnapok', new Date('2025-07-30'), 'Halételek fesztiválja Balatonszemesen.'),
  new Event(24, 12, 'Balatonszemesi Gyermekfesztivál', new Date('2025-08-01'), 'Családi programok és játékok Balatonszemesen.')
];

// Attractions kollekció - Változatlan
export const attractions: Attraction[] = [
  // Északi part látnivalói
  new Attraction(
    1,
    'Tagore Sétány',
    'Sétálj végig Balatonfüred híres sétányán, ahol gyönyörű kilátás és hangulatos kávézók várnak!',
    1, // Balatonfüred
    1, // Strand
    '../assets/images/tagore_setany.jpg',
    [events[0], events[1]] // Balatonfüredi Borfesztivál, Anna-bál
  ),
  new Attraction(
    2,
    'Tihanyi Apátság',
    'Látogasd meg a történelmi Tihanyi Apátságot, és élvezd a panorámát a Balatonra!',
    2, // Tihany
    2, // Múzeum
    '../assets/images/tihanyi_apatsag.jpg',
    [events[2], events[3]] // Levendulafesztivál, Gardafesztivál
  ),
  new Attraction(
    3,
    'Badacsonyi Kilátó',
    'Panorámás kilátás a Badacsony tetejéről, tökéletes hely a természetkedvelőknek.',
    3, // Badacsony
    4, // Kilátó
    '../assets/images/badacsonyi_kilato.jpg',
    [events[4], events[5]] // Badacsonyi Szüret, Borhetek
  ),
  new Attraction(
    4,
    'Magaspart',
    'Lenyűgöző kilátás Balatonakarattya Magaspartjáról, ideális piknikhez és fotózáshoz.',
    4, // Balatonakarattya
    4, // Kilátó
    '../assets/images/magaspart_akarattya.jpeg',
    [events[6], events[7]] // Akarattyai Nyárindító, Magaspart Piknik
  ),
  new Attraction(
    5,
    'Festetics-kastély',
    'Fedezd fel Keszthely ikonikus kastélyát, ahol múzeum és gyönyörű park vár!',
    5, // Keszthely
    2, // Múzeum
    '../assets/images/keszthely_festetics_kastely.jpg',
    [events[8], events[9]] // Keszthelyi Borfesztivál, Nyáresti Koncertek
  ),
  new Attraction(
    6,
    'Csonkatorony',
    'Csopak történelmi emlékhelye, tökéletes kirándulási célpont a természetben.',
    6, // Csopak
    6, // Természeti látványosság
    '../assets/images/csopak_csonkatorony.jpg',
    [events[10], events[11]] // Rizling Napok, Szüreti Napok
  ),

  // Déli part látnivalói
  new Attraction(
    7,
    'Aranypart',
    'Siófok legismertebb strandja, tökéletes fürdéshez és napozáshoz.',
    7, // Siófok
    1, // Strand
    '../assets/images/aranypart_siofok.jpg',
    [events[12], events[13]] // Siófoki Nyárindító, Sörfesztivál
  ),
  new Attraction(
    8,
    'Zamárdi Fesztiválközpont',
    'A Balaton Sound és más fesztiválok helyszíne, nyüzsgő programokkal.',
    8, // Zamárdi
    5, // Fesztiválhelyszín
    '../assets/images/zamardi.jpg',
    [events[14], events[15]] // Balaton Sound, Gasztrofesztivál
  ),
  new Attraction(
    9,
    'Napfény Strand',
    'Balatonlelle népszerű strandja, családok és baráti társaságok kedvence.',
    9, // Balatonlelle
    1, // Strand
    '../assets/images/napfeny_startd_lelle.jpg',
    [events[16], events[17]] // Balatonlellei Borfesztivál, Hal- és Lángosfesztivál
  ),
  new Attraction(
    10,
    'Fonyódi Panoráma Kilátó',
    'Gyönyörű kilátás a Balatonra Fonyód tetejéről.',
    10, // Fonyód
    4, // Kilátó
    '../assets/images/fonyod_kilato.jpg',
    [events[18], events[19]] // Halászléfőző Verseny, Nyári Esték
  ),
  new Attraction(
    11,
    'Gömbkilátó',
    'Balatonboglár ikonikus kilátója, ahonnan az egész Balaton látható.',
    11, // Balatonboglár
    4, // Kilátó
    '../assets/images/gombkilato_boglar.jpg',
    [events[20], events[21]] // Szüreti Fesztivál, BB Borfesztivál
  ),
  new Attraction(
    12,
    'Balatonszemesi Latinovits Zoltán Múzeum',
    'Múzeum Latinovits Zoltán emlékére, kulturális programokkal.',
    12, // Balatonszemes
    2, // Múzeum
    '../assets/images/muzeum_szemes.jpg',
    [events[22], events[23]] // Halnapok, Gyermekfesztivál
  )
];