import fs from 'fs';
import { plants } from '../src/data/plants.js';

async function download() {
  for (let i = 0; i < plants.length; i++) {
    const plant = plants[i];
    const safeName = plant.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const imagePath = `public/${safeName}.jpg`;
    
    // Skip if we already have a good image (size > 10KB)
    if (fs.existsSync(imagePath) && fs.statSync(imagePath).size > 10000) {
      console.log(`Skipping ${plant.name}, already exists.`);
      continue;
    }

    const prompt = encodeURIComponent(`Detailed professional botanical illustration of ${plant.name}, clean white background, high resolution, scientific style`);
    const url = `https://image.pollinations.ai/prompt/${prompt}?width=800&height=600&nologo=true&seed=${plant.id + 500}`;
    
    console.log(`[${i+1}/50] Fetching ${plant.name}...`);
    try {
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      const text = new TextDecoder().decode(buffer.slice(0, 100));
      
      if (text.trim().startsWith('{')) {
        console.error(`Error for ${plant.name}: ${text.substring(0, 50)}...`);
        i--; // Retry
        await new Promise(r => setTimeout(r, 10000));
        continue;
      }
      
      if (buffer.byteLength < 5000) {
        console.error(`Small file for ${plant.name}: ${buffer.byteLength} bytes`);
        i--; // Retry
        await new Promise(r => setTimeout(r, 10000));
        continue;
      }

      fs.writeFileSync(imagePath, Buffer.from(buffer));
      console.log(`Success: ${plant.name}`);
    } catch (e) {
      console.error(`Fetch failed for ${plant.name}: ${e.message}`);
      i--; // Retry
      await new Promise(r => setTimeout(r, 10000));
      continue;
    }
    
    await new Promise(r => setTimeout(r, 5000));
  }
}

download();
