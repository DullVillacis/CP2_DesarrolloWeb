# Llevar FoodRescue a Figma (sin dibujar desde cero)

La app ya usa un design system basado en variables CSS, así que se importa a Figma
como **capas editables** (frames, texto, autolayout), no como imágenes.

## Resumen del flujo

1. Levantar la app en local.
2. Importar los **tokens** (colores, tipografía, radios, sombras) → estilos/variables de Figma.
3. Importar cada **pantalla renderizada** con el plugin html.to.design → frames editables.
4. Ordenar las pantallas en páginas de Figma y listo.

---

## Paso 1 · Levantar la app

```bash
# Terminal 1 (backend con Mongo en memoria)
cd backend
node dev-inmemory.js

# Terminal 2 (frontend)
cd frontend
npm run dev
```

Frontend: http://localhost:5173 · Backend: http://localhost:4000

Cuentas de prueba (seed):
- Local: `local@test.com` / `123456`
- Consumidor: `ronny@test.com` / `123456`

---

## Paso 2 · Tokens en Figma (colores + tipografía)

Usa el plugin **Tokens Studio for Figma** (gratis):

1. En Figma: Plugins → Tokens Studio for Figma.
2. Pestaña de importación → **Import** → pega el contenido de `design-tokens.json`.
3. Aplica el set `global`. Esto crea tus colores, radios, tamaños de fuente y
   sombras como tokens reutilizables.

Fuentes a instalar en tu equipo (Google Fonts) para que se vean igual:
- **Fraunces** (títulos)
- **Poppins** (texto/UI)

---

## Paso 3 · Importar las pantallas (html.to.design)

Ya tienes las 11 pantallas exportadas como **HTML autocontenido** en la carpeta
[`figma/html/`](./html) — cada archivo trae el CSS del design system inline, las
fuentes y la **data de ejemplo** ya renderizada. No necesitas la app corriendo
para importarlas.

En Figma, con el plugin **html.to.design**:

1. Abre el plugin → pestaña **"Import HTML"** (código).
2. Abre el archivo `figma/html/NN-nombre.html`, copia todo su contenido y pégalo.
3. Import → llega como frame con capas editables, texto real y colores del DS.
4. Repite con cada archivo.

> Alternativa: el plugin trae una **extensión de navegador**. Si prefieres capturar
> en vivo (con la app corriendo), abre cada `.html` en el navegador y usa la
> extensión → "Import to Figma".

### Checklist de pantallas (archivos en `figma/html/`)

**Públicas**
- [ ] `01-landing.html`
- [ ] `02-login.html`
- [ ] `03-register.html`
- [ ] `04-design-system.html`  ← impórtala primero: trae toda la paleta y los
      componentes (botones, inputs, dropdown, badges, cards, toast) en un solo
      frame. Es tu "librería" base.

**Consumidor**
- [ ] `05-dashboard-consumidor.html`
- [ ] `06-ofertas.html`
- [ ] `07-mis-reservas.html`

**Local**
- [ ] `08-dashboard-local.html`
- [ ] `09-mis-ofertas.html`
- [ ] `10-nueva-oferta.html`
- [ ] `11-reservas-local.html`

---

## Paso 4 · Ordenar en Figma

- Página "Design System" → el frame de `/design-system` + los tokens.
- Página "Consumidor" → sus 3 pantallas.
- Página "Local" → sus 4 pantallas.
- Convierte los elementos repetidos (botón, card de oferta, fila de reserva,
  ítem del menú lateral) en **componentes** de Figma para reutilizarlos.

---

## Alternativas al plugin

- **Builder.io "Figma Import"** o **Anima**: mismo concepto (web → Figma editable).
- **Solo referencia (rápido, no editable)**: capturas PNG de cada pantalla pegadas
  en un board. Sirve para bocetar, no para editar.
