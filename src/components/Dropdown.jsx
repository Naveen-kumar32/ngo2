import React, { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Compact searchable select (combobox). Native <select> popups can't be
 * height-limited with CSS, so long lists (36 states) opened full-screen.
 * This one opens a short panel (~6 rows) that scrolls inside itself, and the
 * box doubles as a filter: typing narrows the list (matches that start with
 * the typed text come first).
 *
 * Keyboard: type to filter, ↑/↓ move, Home/End jump, Enter selects,
 * Esc closes and restores the current value.
 */
export default function Dropdown({ value, onChange, options, placeholder, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();

  const selectedLabel = value || placeholder;
  const needle = text.trim().toLowerCase();

  // "Any …" (clears the filter) is offered only while nothing is typed
  const items = needle
    ? options
        .filter((o) => o.toLowerCase().includes(needle))
        .sort((a, b) => Number(!a.toLowerCase().startsWith(needle)) - Number(!b.toLowerCase().startsWith(needle)))
        .map((o) => ({ value: o, label: o }))
    : [{ value: '', label: placeholder }, ...options.map((o) => ({ value: o, label: o }))];

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) close();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Keep the highlighted option visible inside the scrolling panel
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const openList = () => {
    if (open) return;
    setText('');
    setActive(Math.max(0, [{ value: '' }, ...options.map((o) => ({ value: o }))].findIndex((i) => i.value === value)));
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setText('');
  };

  const choose = (item) => {
    if (!item) return;
    onChange(item.value);
    close();
    inputRef.current?.blur();
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(items.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Home' && !text) { e.preventDefault(); setActive(0); }
    else if (e.key === 'End' && !text) { e.preventDefault(); setActive(items.length - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(items[active]); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab') { close(); }
  };

  return (
    <div className={`dropdown ${open ? 'is-open' : ''}`} ref={rootRef}>
      <div
        className={`dropdown-trigger ${value ? 'has-value' : ''}`}
        onMouseDown={(e) => {
          // clicking anywhere on the box (incl. the chevron) focuses the input
          if (e.target !== inputRef.current) {
            e.preventDefault();
            if (open) close(); else { inputRef.current?.focus(); openList(); }
          }
        }}
      >
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && items.length ? `${listId}-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          value={open ? text : selectedLabel}
          placeholder={open ? `Type to filter… (${selectedLabel})` : placeholder}
          onFocus={openList}
          onClick={openList}
          onChange={(e) => {
            setText(e.target.value);
            setActive(0);
            if (!open) setOpen(true);
          }}
          onKeyDown={onKeyDown}
        />
        <ChevronDown size={16} aria-hidden="true" />
      </div>

      {open && (
        <ul className="dropdown-panel" role="listbox" id={listId} ref={listRef} aria-label={ariaLabel}>
          {items.length === 0 && (
            <li className="dropdown-empty" role="presentation">No match for “{text.trim()}”</li>
          )}
          {items.map((item, i) => {
            const isSelected = item.value === value;
            return (
              <li
                key={item.value || '__any'}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={isSelected}
                className={`${i === active ? 'is-active' : ''} ${isSelected ? 'is-selected' : ''} ${item.value === '' ? 'is-reset' : ''}`}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(item)}
              >
                <span>{highlight(item.label, needle)}</span>
                {isSelected && <Check size={14} aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// Bold the part of the option that matches what was typed
function highlight(label, needle) {
  if (!needle) return label;
  const i = label.toLowerCase().indexOf(needle);
  if (i < 0) return label;
  return (
    <>
      {label.slice(0, i)}
      <mark>{label.slice(i, i + needle.length)}</mark>
      {label.slice(i + needle.length)}
    </>
  );
}
