# Testimonials Backup

Diese Dateien wurden am 30.01.2026 temporär von der Website entfernt.

## Enthaltene Dateien:
- `testimonials-section.tsx` - Die Hauptkomponente mit den Mock-Daten
- `testimonial-slider.tsx` - Der animierte Slider

## Wiederherstellen:
1. Kopiere die Dateien zurück nach `src/components/ui/`
2. In `src/app/page.tsx`:
   - Import wieder aktivieren: `import { TestimonialsSection } from "@/components/ui/testimonials-section";`
   - Komponente wieder einfügen: `<TestimonialsSection />`

## Mock-Daten:
Die Komponente enthält 5 fiktive Testimonials mit Stock-Fotos von Unsplash.
Diese sollten durch echte Kundenstimmen ersetzt werden.
