import React, { useState, useEffect } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { Button } from './ui/button';

function MapInner({ jurisdiction, jurisdictionName }: { jurisdiction: string, jurisdictionName?: string }) {
  const map = useMap();
  const geocodingLib = useMapsLibrary('geocoding');
  const [searchQuery, setSearchQuery] = useState('');
  const [markerPos, setMarkerPos] = useState<google.maps.LatLngLiteral | null>(null);

  const [searchError, setSearchError] = useState('');

  // Pan to jurisdiction when it changes
  useEffect(() => {
    if (!geocodingLib || !map || !jurisdiction || jurisdiction === 'All') return;
    const geocoder = new geocodingLib.Geocoder();
    // Default to search within India context for better results
    const searchBase = jurisdictionName || jurisdiction;
    geocoder.geocode({ address: `${searchBase}, India` }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(6);
        setMarkerPos(results[0].geometry.location.toJSON());
      }
    });
  }, [geocodingLib, map, jurisdiction]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    if (!geocodingLib || !map || !searchQuery) return;
    const geocoder = new geocodingLib.Geocoder();
    const searchArea = jurisdiction && jurisdiction !== 'All' ? `${searchQuery}, ${jurisdictionName || jurisdiction}, India` : `${searchQuery}, India`;
    geocoder.geocode({ address: searchArea }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(15);
        setMarkerPos(results[0].geometry.location.toJSON());
      } else {
        setSearchError('Location not found. Try a more specific address.');
      }
    });
  };

  return (
    <>
      <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
        <form onSubmit={handleSearch} className="flex flex-col gap-1 pointer-events-auto w-full max-w-sm">
          <div className="flex gap-2 p-2 rounded-lg bg-[var(--color-editorial-bg)]/95 backdrop-blur shadow-md border-[var(--color-editorial-border)]">
            <Input 
              type="text" 
              placeholder="Search specific address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 shadow-none h-10"
            />
            <Button type="submit" size="icon" className="shrink-0 h-10 w-10 shadow-md bg-[var(--color-editorial-text)] text-[var(--color-editorial-bg)] hover:bg-[var(--color-editorial-muted)]">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {searchError && (
            <p className="text-xs text-red-600 px-2 py-1 bg-white/90 rounded font-bold shadow-sm self-start">{searchError}</p>
          )}
        </form>
      </div>

      <Map
        defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
        defaultZoom={5}
        mapId="DEMO_MAP_ID"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        style={{ width: "100%", height: "100%" }}
      >
        {markerPos && <AdvancedMarker position={markerPos} />}
      </Map>
    </>
  );
}

export function PollingStationMap({ jurisdiction, jurisdictionName }: { jurisdiction: string, jurisdictionName?: string }) {
  const [mapError, setMapError] = useState(false);
  // Using the provided API key explicitly as a fallback
  const envKey = import.meta.env.VITE_GOOGLE_MAPS_KEY as string | undefined;
  let apiKey = envKey || 'AIzaSyDH_l_ycjdHDRRkl4ubLDdrM1gz5m3179w';
  if (apiKey && typeof apiKey === 'string') {
    apiKey = apiKey.replace(/^["']|["']$/g, '');
  }

  useEffect(() => {
    // Catch Google Maps authentication failures (e.g., restricted or invalid keys)
    (window as any).gm_authFailure = () => {
      setMapError(true);
    };
  }, []);

  if (!apiKey || mapError) {
    return (
      <div className="w-full h-[400px] border border-[var(--color-editorial-border)] bg-[var(--color-editorial-bg-alt)] flex flex-col items-center justify-center p-4 text-center rounded-lg">
        <p className="text-[var(--color-editorial-muted)] text-sm mb-2">
          {!apiKey 
            ? "Map is unavailable. Please set VITE_GOOGLE_MAPS_KEY to view polling stations."
            : "Google Maps failed to load. The provided API key might be invalid or missing the Maps JavaScript API permission."}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[var(--color-editorial-border)] rounded-lg overflow-hidden relative h-[400px]">
      <APIProvider apiKey={apiKey}>
        <MapInner jurisdiction={jurisdiction} jurisdictionName={jurisdictionName} />
      </APIProvider>
    </div>
  );
}
