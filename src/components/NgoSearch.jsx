import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { NGO_DIRECTORY, SERVICES, STATES } from '../ngoDirectory';
import Dropdown from './Dropdown';

const MIN_QUERY = 2;
const PAGE_SIZE = 10;

/**
 * Search-first NGO directory. Nothing is listed until the visitor types a
 * query or picks a service / state — the full national list is far too long
 * to show by default. Results are text only: name, place and services,
 * shown 10 at a time with Previous / Next so the list never grows past one page.
 */
export default function NgoSearch({
  initialQuery = '',
  initialService = '',
  initialState = '',
  compact = false,
}) {
  const [query, setQuery] = useState(initialQuery);
  const [service, setService] = useState(initialService);
  const [state, setState] = useState(initialState);
  const [page, setPage] = useState(0);
  const resultsRef = useRef(null);

  const q = query.trim().toLowerCase();
  const isActive = q.length >= MIN_QUERY || service || state;

  const results = useMemo(() => {
    if (!isActive) return [];
    return NGO_DIRECTORY.filter((n) => {
      const matchesQ = q.length < MIN_QUERY || `${n.name} ${n.city} ${n.state}`.toLowerCase().includes(q);
      const matchesService = !service || n.services.includes(service);
      const matchesState = !state || n.state === state;
      return matchesQ && matchesService && matchesState;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [isActive, q, service, state]);

  const pageCount = Math.ceil(results.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const shown = results.slice(start, start + PAGE_SIZE);
  const nextCount = Math.min(PAGE_SIZE, Math.max(0, results.length - start - PAGE_SIZE));

  const clear = () => {
    setQuery('');
    setService('');
    setState('');
    setPage(0);
  };

  const goToPage = (next) => {
    setPage(next);
    // keep the top of the list in view when paging from the bottom buttons
    const el = resultsRef.current;
    if (el && el.getBoundingClientRect().top < 90) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`ngo-search ${compact ? 'ngo-search-compact' : ''}`}>
      <form className="ngo-search-bar" role="search" onSubmit={(e) => e.preventDefault()}>
        <label className="ngo-search-field">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(0); }}
            placeholder="Type an NGO name, city or state…"
            aria-label="Search NGOs by name, city or state"
          />
        </label>
        <Dropdown
          value={service}
          onChange={(v) => { setService(v); setPage(0); }}
          options={SERVICES}
          placeholder="Any service"
          ariaLabel="Filter by service"
        />
        <Dropdown
          value={state}
          onChange={(v) => { setState(v); setPage(0); }}
          options={STATES}
          placeholder="Any state / UT"
          ariaLabel="Filter by state or union territory"
        />
      </form>

      {!isActive && (
        <div className="ngo-search-empty">
          <p>
            <strong>Start typing to find an NGO.</strong> Search by name, city or state, or pick a service
            or area above. We don't show the full list; it's far too long to browse.
          </p>
        </div>
      )}

      {isActive && (
        <div className="ngo-search-results" ref={resultsRef} aria-live="polite">
          <div className="ngo-results-head">
            <span>
              {results.length === 0
                ? 'No NGOs match yet'
                : `${results.length} NGO${results.length === 1 ? '' : 's'} found`}
              {pageCount > 1 && ` · showing ${start + 1}–${start + shown.length}`}
            </span>
            <button type="button" className="ngo-clear-btn" onClick={clear}>
              <X size={14} /> Clear
            </button>
          </div>

          {results.length === 0 ? (
            <p className="ngo-no-results">
              Try a shorter name, a nearby city, or remove a filter. Can't find your organisation?{' '}
              <Link to="/register">List it with us</Link>.
            </p>
          ) : (
            <ul className={`ngo-result-list ${pageCount > 1 ? 'is-paged' : ''}`}>
              {shown.map((n) => (
                <li key={`${n.name}-${n.city}`} className="ngo-result-row">
                  <div>
                    <b>{n.name}</b>
                    <span className="ngo-result-place">
                      <MapPin size={13} aria-hidden="true" /> {n.city}, {n.state}
                    </span>
                  </div>
                  <span className="ngo-result-services">{n.services.join(' · ')}</span>
                </li>
              ))}
            </ul>
          )}

          {pageCount > 1 && (
            <nav className="ngo-pager" aria-label="Search results pages">
              <button type="button" className="btn btn-outline" onClick={() => goToPage(page - 1)} disabled={page === 0}>
                <ArrowLeft size={15} /> Previous 10
              </button>
              <span className="ngo-pager-count">Page {page + 1} of {pageCount}</span>
              <button type="button" className="btn btn-primary" onClick={() => goToPage(page + 1)} disabled={page >= pageCount - 1}>
                Next {nextCount || PAGE_SIZE} <ArrowRight size={15} />
              </button>
            </nav>
          )}

          {compact && results.length > 0 && (
            <Link className="ngo-see-all" to={`/ngos?q=${encodeURIComponent(query.trim())}${service ? `&service=${encodeURIComponent(service)}` : ''}${state ? `&state=${encodeURIComponent(state)}` : ''}`}>
              Open in full directory <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
