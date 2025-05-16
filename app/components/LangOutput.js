'use client';

import { useEffect, useRef, useState } from 'react';
import '../App.css';

export default function LangOutput({ selectedLang, setSelectedLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const optionsRef = useRef([]);

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const res = await fetch('/api/languages');
        const data = await res.json();
        setLanguages(data);
      } catch (error) {
        console.error('Failed to load languages', error);
      }
    }

    fetchLanguages();
  }, []);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const filteredLanguages = languages.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="langSelect2">
      <div className={`options-container2 ${isOpen ? 'active' : ''}`}>
        {filteredLanguages.map((lang, index) => (
          <div
            className="option2"
            key={`${lang.language}-${index}`}
            ref={el => optionsRef.current[index] = el}
          >
            <input
              type="radio"
              className="radio"
              id={`translated-${index}`}
              name="translatedLang"
              checked={selectedLang === lang.name}
              onChange={() => {
                setSelectedLang(lang.name);
                setIsOpen(false);
              }}
            />
            <label htmlFor={`translated-${index}`}>
              {lang.name}
            </label>
          </div>
        ))}
      </div>

      <div className="selected2" onClick={() => setIsOpen(!isOpen)}>
        {selectedLang || 'Please Select a Language...'}
      </div>

      <div className="search-box2">
        <input
          ref={searchRef}
          type="text"
          placeholder="Start Typing..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
