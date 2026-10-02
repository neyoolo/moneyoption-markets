export interface Broker {
  id: string;
  name: string;
  role: string;
  whatsapp: string;
  availability: string;
}

export const BROKERS: Broker[] = [
  {
    id: 'david',
    name: 'David',
    role: 'Senior Options Broker',
    whatsapp: '+234 901 000 1001',
    availability: 'Available now',
  },
  {
    id: 'johnson',
    name: 'Johnson',
    role: 'FX & Derivatives Broker',
    whatsapp: '+234 901 000 1002',
    availability: 'Available now',
  },
  {
    id: 'akintayo',
    name: 'Akintayo',
    role: 'West Africa Market Broker',
    whatsapp: '+234 901 000 1003',
    availability: 'Available now',
  },
  {
    id: 'michael',
    name: 'Michael',
    role: 'Institutional Trading Broker',
    whatsapp: '+234 901 000 1004',
    availability: 'Available now',
  },
    {
    id: 'akinkunmi',
    name: 'Akinkunmi',
    role: 'West Africa Market Broker',
    whatsapp: '+234 901 000 1003',
    availability: 'Available now',
  },
];

export const getWhatsAppUrl = (phone: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}`;
