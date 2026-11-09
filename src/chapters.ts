/**
 * The two routes. Every fact here comes from the v3 content file (docs/CONTENT.md, extracted from skylarkexim.com).
 * A chapter is a waypoint on one continuous track: `span` is its scroll length in viewport-heights, its clips share
 * that span evenly, and its captions open and close on chapter-local progress windows.
 */
export interface Clip { id: string; frames: number }
export interface Cap { title: string; body?: string; at: [number, number]; extra?: 'docs' | 'count700' }
export interface Chapter {
  id: string
  station: string
  span: number
  clips: Clip[]
  /** a still with a slow push-in instead of a frame sequence */
  still?: string
  caps: Cap[]
  /** copy anchor on desktop */
  side?: 'lead' | 'trail'
}
export type Route = 'sea' | 'pond'

const c = (id: string, frames = 40): Clip => ({ id, frames })

const OPEN_SEA: Chapter[] = [
  { id: 'harbour', station: 'Harbour', span: 1.3, clips: [c('hf-depart')], caps: [] },
  {
    id: 'catch', station: 'Catch', span: 1.0, clips: [c('hf-catch')],
    caps: [{ title: 'Straight off the vessel.', body: 'Raw material comes directly from fishing vessels and farms. Size, freshness and health are checked before anything is accepted.', at: [0.08, 0.92] }],
  },
  {
    id: 'ice', station: 'Ice', span: 0.9, clips: [c('hf-ice')], side: 'trail',
    caps: [{ title: 'Into iced crates, on deck.', body: 'From here it travels under chilled conditions to the processing plant.', at: [0.08, 0.92] }],
  },
  {
    id: 'plant', station: 'Plant', span: 1.5, clips: [c('hf-arrive'), c('hf-unload-crew'), c('hf-fish-intake')],
    caps: [{ title: 'Received at Anandapuram.', body: 'Our processing unit at Anandapuram, Visakhapatnam. Size, freshness and health are checked again before acceptance.', at: [0.06, 0.94] }],
  },
  {
    id: 'wash', station: 'Wash', span: 1.0, clips: [c('hf-fish-wash')], side: 'trail',
    caps: [{ title: 'Washed, then graded.', body: 'Clean, treated water removes impurities. Fish are sorted by size, weight and type, so every lot meets export standards.', at: [0.08, 0.92] }],
  },
  {
    id: 'cut', station: 'Cut', span: 0.9, clips: [c('hf-fish-cut')],
    caps: [{ title: 'Portioned by hand.', body: 'Advanced processing facilities and strict adherence to international quality standards.', at: [0.08, 0.92] }],
  },
  {
    id: 'cold', station: 'Cold', span: 1.3, clips: [c('hf-fish-freeze'), c('hf-store')], side: 'trail',
    caps: [
      { title: 'Frozen at its best.', body: 'IQF or block freezing, then a thin glaze of ice to protect it during shipment.', at: [0.04, 0.44] },
      { title: 'Held at −18\u00a0°C to −20\u00a0°C.', body: 'Cold rooms until dispatch.', at: [0.42, 0.96], extra: 'count700' },
    ],
  },
]

const OPEN_POND: Chapter[] = [
  { id: 'ponds', station: 'Ponds', span: 1.3, clips: [c('hf-ponds')], caps: [] },
  {
    id: 'meter', station: 'Meter', span: 0.9, clips: [c('hf-sample')], side: 'trail',
    caps: [{ title: 'Every pond, on record.', body: 'Strategic partnerships with aquaculture farmers, for freshness, traceability and product integrity across all markets.', at: [0.08, 0.92] }],
  },
  {
    id: 'harvest', station: 'Harvest', span: 1.2, clips: [c('hf-harvest'), c('hf-sort')],
    caps: [{ title: 'Harvested straight into ice.', body: 'Shrimp are sourced directly from farms and checked for size, freshness and health before acceptance.', at: [0.06, 0.94] }],
  },
  {
    id: 'plant', station: 'Plant', span: 1.1, clips: [c('hf-arrive'), c('hf-intake')], side: 'trail',
    caps: [{ title: 'Into the Anandapuram plant.', body: 'A state-of-the-art shrimp processing facility with internationally acclaimed modernised equipment.', at: [0.06, 0.94] }],
  },
  {
    id: 'wash', station: 'Wash', span: 0.9, clips: [c('hf-wash')],
    caps: [{ title: 'Washed, then graded.', body: 'Clean, treated water. Sorted by size, weight and type for uniform export lots.', at: [0.08, 0.92] }],
  },
  {
    id: 'peel', station: 'Peel', span: 0.8, clips: [c('hf-peel', 24)], side: 'trail',
    caps: [{ title: 'Head-on, headless or peeled.', body: 'De-heading, peeling and deveining by hand or machine, as the product requires.', at: [0.08, 0.92] }],
  },
  {
    id: 'lab', station: 'Lab', span: 0.9, clips: [c('hf-lab')],
    caps: [{ title: 'Checked in our lab unit.', body: 'Hygiene, freshness, texture and absence of defects. Samples tested for international food safety compliance.', at: [0.08, 0.92] }],
  },
  {
    id: 'iqf', station: 'IQF', span: 0.9, clips: [c('hf-iqf')], side: 'trail',
    caps: [{ title: 'Individually quick frozen.', body: 'IQF or block freezing, with a thin glaze of ice for the voyage.', at: [0.08, 0.92] }],
  },
  {
    id: 'pack', station: 'Pack', span: 0.9, clips: [c('hf-pack')],
    caps: [{ title: 'Packed and labelled.', body: 'Export-grade cartons, vacuum packs or custom packaging, labelled with product, size, batch and compliance.', at: [0.08, 0.92] }],
  },
  {
    id: 'cold', station: 'Cold', span: 0.9, clips: [c('hf-store')], side: 'trail',
    caps: [{ title: 'Held at −18\u00a0°C to −20\u00a0°C.', body: 'Cold rooms until dispatch.', at: [0.08, 0.92], extra: 'count700' }],
  },
]

const SHARED_END: Chapter[] = [
  {
    id: 'papers', station: 'Papers', span: 0.9, clips: [], still: 'ph-docs-blur',
    caps: [{ title: 'Every document, prepared in-house.', body: 'Our documentation staff prepare the export paperwork and track each shipment.', at: [0.06, 0.94], extra: 'docs' }],
  },
  {
    id: 'port', station: 'Port', span: 1.6, clips: [c('hf-stuff'), c('hf-port-3'), c('hf-cranes')], side: 'trail',
    caps: [{ title: 'Loaded in reefer containers.', body: 'Shipped cold, so the chain holds all the way to the destination.', at: [0.06, 0.94] }],
  },
  {
    id: 'sea', station: 'Sea', span: 2.0, clips: [c('hf-sail')],
    caps: [{ title: 'Then it sails.', body: 'From Visakhapatnam, out to the markets that order it.', at: [0.3, 0.9] }],
  },
  { id: 'world', station: 'World', span: 1.0, clips: [], caps: [] },
]

export const ROUTES: Record<Route, Chapter[]> = {
  sea: [...OPEN_SEA, ...SHARED_END],
  pond: [...OPEN_POND, ...SHARED_END],
}

/** v3 markets.ts: 15 markets, grouped by region (Bangkok removed by the client). lat/lon are display positions. */
export const ORIGIN = { name: 'Visakhapatnam', lat: 17.69, lon: 83.22 }
export const MARKETS: { name: string; region: string; lat: number; lon: number }[] = [
  { name: 'China', region: 'East Asia', lat: 35, lon: 104 },
  { name: 'Taiwan', region: 'East Asia', lat: 23.7, lon: 121 },
  { name: 'Japan', region: 'East Asia', lat: 36.2, lon: 138.3 },
  { name: 'Hong Kong', region: 'East Asia', lat: 22.3, lon: 114.2 },
  { name: 'Vietnam', region: 'Southeast Asia', lat: 16, lon: 106 },
  { name: 'Thailand', region: 'Southeast Asia', lat: 15, lon: 101 },
  { name: 'Malaysia', region: 'Southeast Asia', lat: 4.2, lon: 102 },
  { name: 'Sri Lanka', region: 'South Asia', lat: 7.9, lon: 80.7 },
  { name: 'UAE (Sharjah)', region: 'Middle East', lat: 25.35, lon: 55.39 },
  { name: 'Kuwait', region: 'Middle East', lat: 29.3, lon: 47.5 },
  { name: 'Europe', region: 'Europe', lat: 50, lon: 10 },
  { name: 'Turkey', region: 'Europe', lat: 39, lon: 35 },
  { name: 'Russia', region: 'Europe', lat: 56, lon: 38 },
  { name: 'Egypt', region: 'Africa', lat: 26.8, lon: 30.8 },
  { name: 'Algeria', region: 'Africa', lat: 28, lon: 2.6 },
]
