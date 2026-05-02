import fs from 'fs';

const plants = {
  Ginseng: 'ginseng.png',
  'Lavandula_angustifolia': 'lavender.png',
  'Ginkgo_biloba': 'ginkgo.png'
};

async function fetchImage(title, filename) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=800`;
  
  const res = await fetch(apiUrl, { headers: { 'User-Agent': 'ChemProjectApi/1.0 (test@invalid.com)' }});
  const json = await res.json();
  const pages = json.query.pages;
  const pageId = Object.keys(pages)[0];
  const imageUrl = pages[pageId].thumbnail?.source;
  
  if (imageUrl) {
    const imgRes = await fetch(imageUrl, { headers: { 'User-Agent': 'ChemProjectApi/1.0' }});
    const buffer = await imgRes.arrayBuffer();
    fs.writeFileSync(`public/${filename}`, Buffer.from(buffer));
    console.log(`Downloaded ${filename}`);
  } else {
    console.log(`No image found for ${title}`);
  }
}

Promise.all(Object.entries(plants).map(([title, filename]) => fetchImage(title, filename)));
