# Live Camera Dashboard

A Next.js application to display YouTube live cameras from around the world.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Cameras

Edit the `data/cameras.json` file to add or modify cameras:

```json
[
  {
    "id": "1",
    "name": "Camera Name",
    "location": "City, Country",
    "url": "https://www.youtube.com/embed/VIDEO_ID"
  }
]
```

To get the embed URL:
1. Go to a YouTube live video
2. Click Share → Embed
3. Copy the URL from the `src` attribute of the iframe

## Features

- Responsive grid layout
- Auto-playing live feeds (muted by default)
- Easy JSON configuration
- Clean, modern UI with Tailwind CSS
