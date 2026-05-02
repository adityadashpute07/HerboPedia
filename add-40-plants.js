import fs from 'fs';

const newPlants = [
  { id: 11, name: "Ashwagandha", scientificName: "Withania somnifera", wikiTitle: "Withania_somnifera", description: "An evergreen shrub growing in India, the Middle East, and parts of Africa.", usage: ["Stress", "Anxiety", "Fatigue"], qualities: ["Adaptogenic", "Vitality-boosting", "Calming"] },
  { id: 12, name: "Holy Basil", scientificName: "Ocimum tenuiflorum", wikiTitle: "Ocimum_tenuiflorum", description: "An aromatic perennial plant in the family Lamiaceae. It is native to the Indian subcontinent.", usage: ["Stress", "Asthma", "Fever"], qualities: ["Adaptogenic", "Antioxidant", "Antibacterial"] },
  { id: 13, name: "Rosemary", scientificName: "Salvia rosmarinus", wikiTitle: "Rosemary", description: "A woody, perennial herb with fragrant, evergreen, needle-like leaves and white, pink, purple, or blue flowers.", usage: ["Memory", "Muscle pain", "Digestive issues"], qualities: ["Antioxidant", "Anti-inflammatory", "Circulation-boosting"] },
  { id: 14, name: "Thyme", scientificName: "Thymus vulgaris", wikiTitle: "Thymus_vulgaris", description: "A species of flowering plant in the mint family Lamiaceae, native to southern Europe.", usage: ["Cough", "Sore throat", "Bronchitis"], qualities: ["Antimicrobial", "Expectorant", "Antispasmodic"] },
  { id: 15, name: "Oregano", scientificName: "Origanum vulgare", wikiTitle: "Oregano", description: "A species of flowering plant in the mint family Lamiaceae. It was native to the Mediterranean region.", usage: ["Infections", "Digestive issues", "Cold"], qualities: ["Antibacterial", "Antifungal", "Antioxidant"] },
  { id: 16, name: "Sage", scientificName: "Salvia officinalis", wikiTitle: "Salvia_officinalis", description: "A perennial, evergreen subshrub, with woody stems, grayish leaves, and blue to purplish flowers.", usage: ["Sore throat", "Memory", "Menopause symptoms"], qualities: ["Antimicrobial", "Astringent", "Cognitive-enhancing"] },
  { id: 17, name: "Lemon Balm", scientificName: "Melissa officinalis", wikiTitle: "Lemon_balm", description: "A perennial herbaceous plant in the mint family and native to south-central Europe.", usage: ["Anxiety", "Sleep disorders", "Indigestion"], qualities: ["Calming", "Antiviral", "Spasmolytic"] },
  { id: 18, name: "Valerian", scientificName: "Valeriana officinalis", wikiTitle: "Valeriana_officinalis", description: "A perennial flowering plant native to Europe and Asia. In the summer when the mature plant may have a height of 1.5 metres.", usage: ["Insomnia", "Anxiety", "Stress"], qualities: ["Sedative", "Anxiolytic", "Muscle relaxant"] },
  { id: 19, name: "St. John's Wort", scientificName: "Hypericum perforatum", wikiTitle: "Hypericum_perforatum", description: "A flowering plant in the family Hypericaceae and the type species of the genus Hypericum.", usage: ["Mild depression", "Anxiety", "Nerve pain"], qualities: ["Antidepressant", "Antiviral", "Anti-inflammatory"] },
  { id: 20, name: "Milk Thistle", scientificName: "Silybum marianum", wikiTitle: "Silybum_marianum", description: "An annual or biennial plant of the Asteraceae family. This fairly typical thistle has red to purple flowers.", usage: ["Liver disorders", "Gallbladder issues", "High cholesterol"], qualities: ["Hepatoprotective", "Antioxidant", "Detoxifying"] },
  { id: 21, name: "Dandelion", scientificName: "Taraxacum officinale", wikiTitle: "Taraxacum_officinale", description: "A flowering herbaceous perennial plant of the family Asteraceae.", usage: ["Liver support", "Digestion", "Water retention"], qualities: ["Diuretic", "Hepatoprotective", "Nutrient-dense"] },
  { id: 22, name: "Nettle", scientificName: "Urtica dioica", wikiTitle: "Urtica_dioica", description: "A herbaceous perennial flowering plant in the family Urticaceae. Originally native to Europe, much of temperate Asia and western North Africa.", usage: ["Allergies", "Joint pain", "Urinary tract issues"], qualities: ["Anti-inflammatory", "Astringent", "Nutritive"] },
  { id: 23, name: "Yarrow", scientificName: "Achillea millefolium", wikiTitle: "Achillea_millefolium", description: "A flowering plant in the family Asteraceae. It is native to temperate regions of the Northern Hemisphere.", usage: ["Wounds", "Bleeding", "Fever"], qualities: ["Vulnerary", "Styptic", "Diaphoretic"] },
  { id: 24, name: "Calendula", scientificName: "Calendula officinalis", wikiTitle: "Calendula_officinalis", description: "A plant in the daisy family Asteraceae. It is probably native to southern Europe.", usage: ["Skin irritations", "Wounds", "Burns"], qualities: ["Anti-inflammatory", "Antimicrobial", "Vulnerary"] },
  { id: 25, name: "Elderberry", scientificName: "Sambucus nigra", wikiTitle: "Sambucus_nigra", description: "A species complex of flowering plants in the family Adoxaceae native to most of Europe and North America.", usage: ["Cold", "Flu", "Immune support"], qualities: ["Antiviral", "Immune-boosting", "Antioxidant"] },
  { id: 26, name: "Fenugreek", scientificName: "Trigonella foenum-graecum", wikiTitle: "Fenugreek", description: "An annual plant in the family Fabaceae, with leaves consisting of three small obovate to oblong leaflets.", usage: ["Blood sugar control", "Lactation support", "Digestion"], qualities: ["Hypoglycemic", "Galactagogue", "Anti-inflammatory"] },
  { id: 27, name: "Fennel", scientificName: "Foeniculum vulgare", wikiTitle: "Fennel", description: "A flowering plant species in the carrot family. It is a hardy, perennial herb with yellow flowers and feathery leaves.", usage: ["Digestive issues", "Colic", "Respiratory congestion"], qualities: ["Carminative", "Antispasmodic", "Expectorant"] },
  { id: 28, name: "Licorice", scientificName: "Glycyrrhiza glabra", wikiTitle: "Liquorice", description: "The root of Glycyrrhiza glabra from which a sweet flavour can be extracted. The liquorice plant is a herbaceous perennial legume.", usage: ["Sore throat", "Heartburn", "Cough"], qualities: ["Demulcent", "Expectorant", "Anti-inflammatory"] },
  { id: 29, name: "Slippery Elm", scientificName: "Ulmus rubra", wikiTitle: "Ulmus_rubra", description: "A species of elm native to eastern North America.", usage: ["Sore throat", "Cough", "Digestive irritation"], qualities: ["Demulcent", "Emollient", "Soothing"] },
  { id: 30, name: "Maca", scientificName: "Lepidium meyenii", wikiTitle: "Lepidium_meyenii", description: "An herbaceous biennial plant of the crucifer family native to the high Andes of Peru.", usage: ["Energy", "Libido", "Hormonal balance"], qualities: ["Adaptogenic", "Energizing", "Nutrient-dense"] },
  { id: 31, name: "Gotu Kola", scientificName: "Centella asiatica", wikiTitle: "Centella_asiatica", description: "A herbaceous, frost-tender perennial plant in the flowering plant family Apiaceae.", usage: ["Cognitive function", "Wound healing", "Anxiety"], qualities: ["Nerve-tonic", "Vulnerary", "Adaptogenic"] },
  { id: 32, name: "Neem", scientificName: "Azadirachta indica", wikiTitle: "Azadirachta_indica", description: "A tree in the mahogany family Meliaceae. It is one of two species in the genus Azadirachta.", usage: ["Skin conditions", "Dental health", "Parasites"], qualities: ["Antibacterial", "Antifungal", "Blood-purifying"] },
  { id: 33, name: "Cinnamon", scientificName: "Cinnamomum verum", wikiTitle: "Cinnamomum_verum", description: "A spice obtained from the inner bark of several tree species from the genus Cinnamomum.", usage: ["Blood sugar control", "Digestion", "Circulation"], qualities: ["Antioxidant", "Anti-inflammatory", "Antimicrobial"] },
  { id: 34, name: "Clove", scientificName: "Syzygium aromaticum", wikiTitle: "Clove", description: "The aromatic flower buds of a tree in the family Myrtaceae, Syzygium aromaticum.", usage: ["Toothache", "Digestion", "Infections"], qualities: ["Analgesic", "Antimicrobial", "Carminative"] },
  { id: 35, name: "Cardamom", scientificName: "Elettaria cardamomum", wikiTitle: "Cardamom", description: "A spice made from the seeds of several plants in the genera Elettaria and Amomum in the family Zingiberaceae.", usage: ["Digestion", "Bad breath", "Blood pressure"], qualities: ["Carminative", "Antioxidant", "Diuretic"] },
  { id: 36, name: "Black Pepper", scientificName: "Piper nigrum", wikiTitle: "Black_pepper", description: "A flowering vine in the family Piperaceae, cultivated for its fruit, known as a peppercorn.", usage: ["Digestion", "Nutrient absorption", "Cold"], qualities: ["Digestive-stimulant", "Bioavailability-enhancer", "Antioxidant"] },
  { id: 37, name: "Coriander", scientificName: "Coriandrum sativum", wikiTitle: "Coriander", description: "An annual herb in the family Apiaceae. It is also known as Chinese parsley, dhania, or cilantro.", usage: ["Digestion", "Heavy metal detox", "Skin inflammation"], qualities: ["Carminative", "Antioxidant", "Cooling"] },
  { id: 38, name: "Cumin", scientificName: "Cuminum cyminum", wikiTitle: "Cumin", description: "A flowering plant in the family Apiaceae, native to a territory including the Middle East and stretching east to India.", usage: ["Digestion", "Immunity", "Metabolism"], qualities: ["Digestive", "Antimicrobial", "Antioxidant"] },
  { id: 39, name: "Parsley", scientificName: "Petroselinum crispum", wikiTitle: "Parsley", description: "A species of flowering plant in the family Apiaceae that is native to the central and eastern Mediterranean region.", usage: ["Kidney support", "Bone health", "Fresh breath"], qualities: ["Diuretic", "Antioxidant", "Nutrient-dense"] },
  { id: 40, name: "Dill", scientificName: "Anethum graveolens", wikiTitle: "Dill", description: "An annual herb in the celery family Apiaceae. It is the only species in the genus Anethum.", usage: ["Digestion", "Colic", "Sleep"], qualities: ["Carminative", "Calming", "Antimicrobial"] },
  { id: 41, name: "Moringa", scientificName: "Moringa oleifera", wikiTitle: "Moringa_oleifera", description: "A fast-growing, drought-resistant tree of the family Moringaceae, native to the Indian subcontinent.", usage: ["Malnutrition", "Inflammation", "Blood sugar"], qualities: ["Nutrient-dense", "Anti-inflammatory", "Antioxidant"] },
  { id: 42, name: "Lemongrass", scientificName: "Cymbopogon citratus", wikiTitle: "Cymbopogon_citratus", description: "A species of grass in the family Poaceae, widely used as a culinary herb in Asian cuisines.", usage: ["Anxiety", "Pain relief", "Cholesterol"], qualities: ["Calming", "Analgesic", "Antimicrobial"] },
  { id: 43, name: "Hibiscus", scientificName: "Hibiscus sabdariffa", wikiTitle: "Roselle_(plant)", description: "A species of Hibiscus native to West Africa, used for the production of bast fibre and as an infusion.", usage: ["High blood pressure", "Liver health", "Weight loss"], qualities: ["Antioxidant", "Hypotensive", "Diuretic"] },
  { id: 44, name: "Rosehips", scientificName: "Rosa canina", wikiTitle: "Rose_hip", description: "The accessory fruit of the various species of rose plant.", usage: ["Arthritis", "Immunity", "Skin health"], qualities: ["Vitamin C-rich", "Anti-inflammatory", "Antioxidant"] },
  { id: 45, name: "Hawthorn", scientificName: "Crataegus monogyna", wikiTitle: "Crataegus", description: "A large genus of shrubs and trees in the family Rosaceae, native to temperate regions of the Northern Hemisphere.", usage: ["Heart failure", "High blood pressure", "Anxiety"], qualities: ["Cardiotonic", "Vasodilator", "Antioxidant"] },
  { id: 46, name: "Passionflower", scientificName: "Passiflora incarnata", wikiTitle: "Passiflora_incarnata", description: "A fast-growing perennial vine with climbing or trailing stems.", usage: ["Anxiety", "Insomnia", "Nerve pain"], qualities: ["Calming", "Sedative", "Anxiolytic"] },
  { id: 47, name: "Schisandra", scientificName: "Schisandra chinensis", wikiTitle: "Schisandra_chinensis", description: "A deciduous woody vine native to forests of Northern China and the Russian Far East.", usage: ["Liver function", "Stress", "Endurance"], qualities: ["Adaptogenic", "Hepatoprotective", "Tonic"] },
  { id: 48, name: "Rhodiola", scientificName: "Rhodiola rosea", wikiTitle: "Rhodiola_rosea", description: "A perennial flowering plant in the family Crassulaceae. It grows naturally in wild Arctic regions.", usage: ["Fatigue", "Stress", "Mental performance"], qualities: ["Adaptogenic", "Energizing", "Nervine"] },
  { id: 49, name: "Astragalus", scientificName: "Astragalus membranaceus", wikiTitle: "Astragalus_propinquus", description: "A flowering plant in the family Fabaceae. It is one of the 50 fundamental herbs used in traditional Chinese medicine.", usage: ["Immune support", "Fatigue", "Heartburn"], qualities: ["Immunomodulating", "Adaptogenic", "Anti-aging"] },
  { id: 50, name: "Burdock", scientificName: "Arctium lappa", wikiTitle: "Arctium_lappa", description: "A Eurasian species of plants in the sunflower family, cultivated as a root vegetable.", usage: ["Skin conditions", "Detoxification", "Digestion"], qualities: ["Blood-purifying", "Diuretic", "Antioxidant"] }
];

async function fetchImage(title) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=800`;
  try {
    const res = await fetch(apiUrl, { headers: { 'User-Agent': 'ChemProjectApi/1.0 (test@invalid.com)' }});
    const json = await res.json();
    const pages = json.query.pages;
    const pageId = Object.keys(pages)[0];
    return pages[pageId]?.thumbnail?.source;
  } catch (error) {
    console.error(`Error fetching meta for ${title}:`, error);
    return null;
  }
}

async function processPlants() {
  const finalPlants = [];
  
  for (const plant of newPlants) {
    let imagePath = `/${plant.name.toLowerCase().replace(/[\s\.\']/g, '_')}.png`;
    const imageUrl = await fetchImage(plant.wikiTitle);
    
    if (imageUrl) {
      try {
        const imgRes = await fetch(imageUrl, { headers: { 'User-Agent': 'ChemProjectApi/1.0' }});
        const buffer = await imgRes.arrayBuffer();
        fs.writeFileSync(`public${imagePath}`, Buffer.from(buffer));
        console.log(`Downloaded image for ${plant.name}`);
      } catch (err) {
        console.error(`Failed to download image for ${plant.name}`);
        imagePath = "/placeholder.png"; // Fallback
      }
    } else {
      console.log(`No image found on Wikipedia for ${plant.name}`);
      imagePath = "/placeholder.png"; // Fallback
    }
    
    const { wikiTitle, ...plantData } = plant;
    plantData.image = imagePath;
    finalPlants.push(plantData);
    
    // Slight delay to prevent hitting Wikipedia API rate limits too aggressively
    await new Promise(r => setTimeout(r, 200)); 
  }
  
  // Read existing plants.js and append
  const existingFilePath = 'src/data/plants.js';
  let fileContent = fs.readFileSync(existingFilePath, 'utf-8');
  
  // Find the exact string `\n];` or similar to insert before it
  if (fileContent.endsWith('];\n')) {
    fileContent = fileContent.slice(0, -3);
  } else if (fileContent.endsWith('];')) {
    fileContent = fileContent.slice(0, -2);
  } else {
    // try to find the last closing bracket
    const lastIndex = fileContent.lastIndexOf(']');
    if(lastIndex !== -1) {
        fileContent = fileContent.substring(0, lastIndex);
    }
  }
  
  let newContent = '';
  for (const p of finalPlants) {
    newContent += `,\n  {\n    id: ${p.id},\n    name: ${JSON.stringify(p.name)},\n    scientificName: ${JSON.stringify(p.scientificName)},\n    description: ${JSON.stringify(p.description)},\n    image: ${JSON.stringify(p.image)},\n    usage: ${JSON.stringify(p.usage)},\n    qualities: ${JSON.stringify(p.qualities)}\n  }`;
  }
  
  fileContent += newContent + '\n];\n';
  fs.writeFileSync(existingFilePath, fileContent);
  console.log('Successfully updated src/data/plants.js');
}

processPlants();
