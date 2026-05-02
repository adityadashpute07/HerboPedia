import fs from 'fs';
import { plants } from './src/data/plants.js';

async function fixImages() {
  for (let i = 0; i < plants.length; i++) {
    const plant = plants[i];
    const safeName = plant.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const pngPath = `public/${safeName}.png`;
    const jpgPath = `public/${safeName}.jpg`;
    
    let bestImage = null;
    
    // Check PNG
    if (fs.existsSync(pngPath)) {
      const stat = fs.statSync(pngPath);
      if (stat.size > 10000) { 
        bestImage = `/${safeName}.png`;
      }
    }
    
    // Check JPG if PNG wasn't good
    if (!bestImage && fs.existsSync(jpgPath)) {
      // Check if it's an HTML error page or actually a small broken file
      const stat = fs.statSync(jpgPath);
      if (stat.size > 5000) {
        const header = fs.readFileSync(jpgPath, 'utf8').substring(0, 20);
        if (!header.includes('<!DOCTYPE') && !header.includes('<html')) {
          bestImage = `/${safeName}.jpg`;
        }
      }
    }
    
    // Fallback to fetching a real image if both failed
    if (!bestImage) {
      console.log(`Missing good image for ${plant.name}. Fetching from LoremFlickr...`);
      const fallbackUrl = `https://loremflickr.com/800/600/${encodeURIComponent(plant.name.replace(/ /g, ','))},plant,herb/all`;
      try {
         const res = await fetch(fallbackUrl);
         const buffer = await res.arrayBuffer();
         fs.writeFileSync(jpgPath, Buffer.from(buffer));
         bestImage = `/${safeName}.jpg`;
      } catch (e) {
         console.error('Failed fallback', e);
         bestImage = '/placeholder.png';
      }
    }
    
    plant.image = bestImage;
  }
  
  // Rewrite plants.js
  let newContent = 'export const plants = [\n';
  plants.forEach((p, idx) => {
    newContent += `  {
    id: ${p.id},
    name: ${JSON.stringify(p.name)},
    scientificName: ${JSON.stringify(p.scientificName)},
    description: ${JSON.stringify(p.description)},
    image: ${JSON.stringify(p.image)},
    usage: ${JSON.stringify(p.usage)},
    qualities: ${JSON.stringify(p.qualities)}
  }${idx === plants.length - 1 ? '' : ','}\n`;
  });
  newContent += '];\n';
  
  fs.writeFileSync('src/data/plants.js', newContent);
  console.log('Fixed all images and updated plants.js!');
}

fixImages();
