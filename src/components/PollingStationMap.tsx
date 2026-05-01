import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { Button } from './ui/button';

// Fix Leaflet default marker icons broken by Vite's asset pipeline
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// India center
const INDIA_CENTER: [number, number] = [20.5937, 78.9629];
const INDIA_ZOOM = 5;

// Inner component — has access to the map instance via hook
function MapController({
  target,
}: {
  target: { lat: number; lng: number; zoom: number } | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], target.zoom, { duration: 1 });
    }
  }, [map, target]);
  return null;
}

// eslint-disable-next-line no-undef
async function geocodeWithNominatim(query: string, signal?: AbortSignal): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=in`;
    const res = await fetch(url, {
      headers: { 'Accept-Language': 'en', 'User-Agent': 'CivicGuide/1.0' },
      signal,
    });
    const data = await res.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (e) {
    console.error('[PollingStationMap] Nominatim geocode failed:', e);
  }
  return null;
}

export function PollingStationMap({
  jurisdiction,
  jurisdictionName,
}: {
  jurisdiction: string;
  jurisdictionName?: string;
}) {
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  const [target, setTarget] = useState<{ lat: number; lng: number; zoom: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Pan to jurisdiction when it changes
  useEffect(() => {
    if (!jurisdiction || jurisdiction === 'All') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTarget(null);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMarkerPos(null);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const searchBase = jurisdictionName || jurisdiction;
      const pos = await geocodeWithNominatim(`${searchBase}, India`, controller.signal);
      if (pos) {
        setTarget({ ...pos, zoom: 6 });
        setMarkerPos([pos.lat, pos.lng]);
      }
    }, 400);

    return () => { clearTimeout(timer); controller.abort(); };
  }, [jurisdiction, jurisdictionName]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setSearchError('');
    setIsSearching(true);
    const searchArea =
      jurisdiction && jurisdiction !== 'All'
        ? `${searchQuery}, ${jurisdictionName || jurisdiction}, India`
        : `${searchQuery}, India`;
    const pos = await geocodeWithNominatim(searchArea);
    setIsSearching(false);
    if (pos) {
      setTarget({ ...pos, zoom: 15 });
      setMarkerPos([pos.lat, pos.lng]);
    } else {
      setSearchError('Location not found. Try a more specific address.');
    }
  };

  return (
    <div className="border border-[var(--color-editorial-border)] rounded-lg overflow-hidden relative h-[400px]">
      {/* Search bar overlay */}
      <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none">
        <form
          onSubmit={handleSearch}
          className="flex gap-2 p-2 rounded-lg pointer-events-auto w-full max-w-sm"
        >
          <Input
            type="text"
            placeholder="Search specific address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-[var(--color-editorial-bg)]/95 backdrop-blur shadow-md h-10 border-[var(--color-editorial-border)]"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isSearching}
            className="shrink-0 h-10 w-10 shadow-md bg-[var(--color-editorial-text)] text-[var(--color-editorial-bg)] hover:bg-[var(--color-editorial-muted)]"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
        {searchError && (
          <p className="text-xs text-red-600 mt-1 px-2">{searchError}</p>
        )}
      </div>

      <MapContainer
        center={INDIA_CENTER}
        zoom={INDIA_ZOOM}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController target={target} />
        {markerPos && <Marker position={markerPos} />}
      </MapContainer>
    </div>
  );
}
