'use client';

import { useEffect, useRef, useState } from 'react';
import '../App.css';

export default function LangSelector({ selectedLang, setSelectedLang }) {
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
        setLanguages([{ language: 'auto', name: 'Detect Language' }, ...data]);
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
    <div className="langSelect1">
      <div className={`options-container ${isOpen ? 'active' : ''}`}>
        {filteredLanguages.map((lang, index,key) => (
          <div className="option" key={key + index} ref={el => optionsRef.current[index] = el}>
            <input type="radio" className="radio" id={`lang-${index}`} name="originalLang" />
            <label htmlFor={`lang-${index}`} onClick={() => {
              setSelectedLang(lang.name);
              setIsOpen(false);
            }}>
              {lang.name}
            </label>
          </div>
        ))}
      </div>

      <div className="selected" onClick={() => setIsOpen(!isOpen)}>
        {selectedLang || 'Detect Language'}
      </div>

      <div className="search-box">
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
