import { Config } from "@remotion/cli/config";

// Optimale Qualitätseinstellungen für beste Renderqualität
Config.setVideoImageFormat("png"); // PNG statt JPEG für verlustfreie Frames
Config.setCrf(18); // Niedriger CRF = höhere Qualität (18 ist sehr gut)
Config.setCodec("h264"); // H.264 für beste Kompatibilität
Config.setScale(1); // Standard-Skalierung, kann auf 2 erhöht werden für 4K

// X264 Preset für bessere Kompression bei gleicher Qualität
Config.setX264Preset("slow"); // Langsamer = bessere Qualität

// Chromium-Flags für bessere Rendering-Qualität
Config.setChromiumOpenGlRenderer("angle");
