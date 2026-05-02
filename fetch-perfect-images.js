import fs from 'fs';

// Read plants.js
let content = fs.readFileSync('src/data/plants.js', 'utf-8');

// We will extract the plants array using a safe eval or regex, but it's easier to just import it.
// Since it's a modules project:
import { plants } from './src/data/plants.js';

async function downloadPerfectImages() {
  for (let i = 0; i < plants.length; i++) {
    const plant = plants[i];
    const safeName = plant.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const imagePath = `/${safeName}.jpg`;
    
    // Update the plant image path in our local array
    plant.image = imagePath;
    
    const prompt = encodeURIComponent(`Detailed professional botanical illustration of ${plant.name} (${plant.scientificName}), showing leaves and flowers, clean white background, high resolution, scientific book style, sharp focus`);
    const url = `https://image.pollinations.ai/prompt/${prompt}?width=800&height=600&nologo=true&seed=${plant.id + 100}`;
    
    console.log(`[${i+1}/50] Downloading botanical image for ${plant.name}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
         // This is likely an error message
         const json = await res.json();
         console.error(`Error from pollinations: ${json.error}`);
         i--; // Retry this one
         await new Promise(resolve => setTimeout(resolve, 5000));
         continue;
      }

      const buffer = await res.arrayBuffer();
      if (buffer.byteLength < 5000) {
          console.error(`Downloaded file too small for ${plant.name} (${buffer.byteLength} bytes)`);
          i--; // Retry
          await new Promise(resolve => setTimeout(resolve, 5000));
          continue;
      }
      fs.writeFileSync(`public${imagePath}`, Buffer.from(buffer));
    } catch (e) {
      console.error(`Failed to download for ${plant.name}`, e);
      i--; // Retry
      await new Promise(resolve => setTimeout(resolve, 5000));
      continue;
    }
    
    // Wait to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 3000));
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
  console.log('Finished updating plants.js and downloading images.');
}

downloadPerfectImages();
