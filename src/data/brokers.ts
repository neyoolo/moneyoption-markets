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
    whatsapp: '+2349153015505',
    availability: 'Available now',
  },
  {
    id: 'johnson',
    name: 'Johnson',
    role: 'FX & Derivatives Broker',
    whatsapp: '+2347047926151',
    availability: 'Available now',
  },
  {
    id: 'akintayo',
    name: 'Akintayo',
    role: 'West Africa Market Broker',
    whatsapp: '+2349016922283',
    availability: 'Available now',
  },
  {
    id: 'michael',
    name: 'Michael',
    role: 'Institutional Trading Broker',
    whatsapp: '+2348154409911',
    availability: 'Available now',
  },
   {
    id: 'akinkunmi',
    name: 'Akinkunmi',
    role: 'West Africa Market Broker',
    whatsapp: '+2349016922283',
    availability: 'Available now',
  },
];

export const getWhatsAppUrl = (phone: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}`;
