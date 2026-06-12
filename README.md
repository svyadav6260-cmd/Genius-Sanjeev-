# Genius Sanjeev - Advanced Fabric Design Studio 🎨

Advanced mobile app for fabric/textile design with multiple paper types, drawing tools, and professional features.

## ✨ Features

### 📄 Paper Types
- **A4 Theory Paper** - For notes and annotations with pattern size labels
- **Graph Paper (50x100)** - Dot grid for precise pattern creation
- **Design Canvas** - Freehand drawing area

### 🎨 Drawing Tools
- **Pen Types**
  - Fine Pen (0.5mm)
  - Medium Pen (1mm)
  - Thick Pen (2mm)
  - Brush (soft strokes)
  - Highlighter (transparent)

- **Pencil Types**
  - HB Pencil (standard)
  - 2B Pencil (soft, dark)
  - 4B Pencil (very soft)
  - Mechanical Pencil (precise)
  - Independent Free Pencil (no grid snap)

- **Eraser Tool**
- **Fill & Pattern Fill**
- **Symbol Selector** (16+ symbols)

### 🖼️ Advanced Features
- **Image Import** - Add photos from gallery
- **Drag & Place** - Position images anywhere
- **Text Tool** - Add, drag, and position text
- **Pattern Size Labels** - Auto size markers (1,2,3,4...)
- **Box Auto-fill** - Fill patterns in boxes
- **Color Palette** - 18+ colors
- **Weave Presets** - Plain, Twill, Satin, Basket, etc.

### 📊 Analysis
- **Peg Plan** - Weaving loom configuration
- **Draft** - Threading details
- **Cross Section** - Multiple views
- **3D Visualization** - Interactive thread view

### 💾 Storage & Export
- **Local Save** - Phone storage
- **Cloud Sync** - Firebase backup
- **Export Formats** - PNG, PDF, SVG
- **Design Gallery** - View all projects

## 🚀 Tech Stack

- **React Native + Expo** - Cross-platform mobile
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Firebase** - Backend & storage
- **React Native Skia** - Advanced drawing
- **React Navigation** - Navigation

## 📱 Platforms

- ✅ Android 8.0+
- ✅ iOS 13.0+
- ✅ Web (PWA)

## 🔧 Installation

```bash
# Clone repository
git clone https://github.com/svyadav6260-cmd/Genius-Sanjeev-.git
cd Genius-Sanjeev-

# Install dependencies
npm install
# or
yarn install

# Start Expo
npx expo start

# Run on device
# Android: Press 'a'
# iOS: Press 'i'
# Web: Press 'w'
```

## 📖 Development

```bash
# Development server
npm start

# Build for Android
npm run android

# Build for iOS
npm run ios

# Build for Web
npm run web

# Production build
npm run build
```

## 📂 Project Structure

```
Genius-Sanjeev-/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── DesignScreen.tsx
│   │   ├── PaperScreen.tsx
│   │   ├── GraphScreen.tsx
│   │   ├── GalleryScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/
│   │   ├── Canvas.tsx
│   │   ├── Toolbar.tsx
│   │   ├── PenSelector.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── TextTool.tsx
│   │   └── ImageUploader.tsx
│   ├── hooks/
│   │   ├── useDrawing.ts
│   │   ├── useStorage.ts
│   │   └── useCanvas.ts
│   ├── utils/
│   │   ├── canvas.ts
│   │   ├── export.ts
│   │   ├── patterns.ts
│   │   └── geometry.ts
│   ├── redux/
│   │   ├── store.ts
│   │   ├── slices/
│   │   │   ├── designSlice.ts
│   │   │   ├── toolSlice.ts
│   │   │   └── storageSlice.ts
│   │   └── hooks.ts
│   └── types/
│       └── index.ts
├── assets/
├── app.json
├── App.tsx
└── package.json
```

## 🎯 Roadmap

- [x] Basic drawing tools
- [x] Multiple paper types
- [x] Pattern presets
- [ ] AI pattern suggestions
- [ ] Real-time collaboration
- [ ] Advanced filters
- [ ] Print optimization
- [ ] App Store release

## 📝 License

MIT License - See LICENSE file

## 👨‍💻 Author

**Sy Yadav**
- GitHub: [@svyadav6260-cmd](https://github.com/svyadav6260-cmd)
- Email: svyadav6260@gmail.com

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## 📞 Support

For issues and suggestions, please open an issue on GitHub.

---

**Made with ❤️ for textile designers**
