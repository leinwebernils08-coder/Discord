
export const BRAND = {
  name: "LUMA",
  accent: 0x8B5CF6,
  footer: "LUMA • Secure • Fast • Automated"
};

export const PRODUCTS = {
  fortnite: {
    fa: [
      { id: "fa_50_100", name: "50–100 Skins FA", price: "€4.99", category: "Fortnite" },
      { id: "fa_100_200", name: "100–200 Skins FA", price: "€7.99", category: "Fortnite" },
      { id: "fa_200_300", name: "200–300 Skins FA", price: "€16.99", category: "Fortnite" },
      { id: "fa_300_500", name: "300–500 Skins FA", price: "€29.99", category: "Fortnite" }
    ],
    vbucks: [
      { id: "vb_1_2_5", name: "1,000–2,500 V-Bucks", price: "€3.99", category: "Fortnite" },
      { id: "vb_2_4", name: "2,000–4,000 V-Bucks", price: "€11.99", category: "Fortnite" },
      { id: "vb_4_6", name: "4,000–6,000 V-Bucks", price: "€29.99", category: "Fortnite" }
    ]
  },
  discord: {
    members: [
      { id: "m_500", name: "500 Members", price: "€2.49", category: "Discord" },
      { id: "m_1000", name: "1,000 Members", price: "€4.49", category: "Discord" },
      { id: "m_2000", name: "2,000 Members", price: "€7.99", category: "Discord" },
      { id: "m_5000", name: "5,000 Members", price: "€17.99", category: "Discord" }
    ],
    accounts: [
      { id: "d_2025", name: "Discord Account 2025", price: "€0.99", category: "Discord" },
      { id: "d_2023", name: "Discord Account 2023", price: "€1.29", category: "Discord" },
      { id: "d_2022", name: "Discord Account 2022", price: "€1.79", category: "Discord" },
      { id: "d_2020", name: "Discord Account 2020", price: "€2.49", category: "Discord" },
      { id: "d_2019", name: "Discord Account 2019", price: "€4.49", category: "Discord" },
      { id: "d_2018", name: "Discord Account 2018", price: "€5.99", category: "Discord" },
      { id: "d_2017", name: "Discord Account 2017", price: "€7.99", category: "Discord" }
    ]
  }
};

export function findProduct(id) {
  for (const section of Object.values(PRODUCTS)) {
    for (const group of Object.values(section)) {
      const product = group.find(p => p.id === id);
      if (product) return product;
    }
  }
  return null;
}
