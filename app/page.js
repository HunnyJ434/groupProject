'use client'

import './App.css';
import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import LangSelector from './components/LangSelector';
import SwitchButton from './components/SwtichButton';
import LangOutput from './components/LangOutput';

function Home() {
  const [beforeText, setBeforeText] = useState('');
  const [afterText, setAfterText] = useState('');
  const [lang1, setLang1] = useState('Detect Language');
  const [lang2, setLang2] = useState('Please Select a Language...');
  const [langMap, setLangMap] = useState({});

  useEffect(() => {
    async function fetchLangs() {
      const res = await fetch('/api/languages');
      const data = await res.json();
      const map = {};
      data.forEach(lang => {
        map[lang.name] = lang.language;
      });
      setLangMap(map);
    }
    fetchLangs();
  }, []);

  async function translateString(str, LanguageFrom, translateTo) {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ str, translateTo }),
    });
    const data = await res.json();
    console.log(data);
    return data.translation;
  }

  const handleTranslate = async () => {
    if (lang2 === 'Please Select a Language...') {
      alert("Please select the language that you would like to translate to.");
      return;
    }
    const langCode = langMap[lang2] || lang2;
    const translated = await translateString(beforeText, lang1, langCode);
    setAfterText(translated);
  };

  const handleSwitch = () => {
    if(lang2 != "Please Select a Language..."){
    const tempLang = lang1;
    setLang1(lang2);
    setLang2(tempLang);

    const tempText = beforeText;
    setBeforeText(afterText);
    setAfterText(tempText);
    }

  };

  return (
    <div className="App">
      <section className='container'>
        <Nav />
        <LangSelector selectedLang={lang1} setSelectedLang={setLang1} />
        <SwitchButton onClick={handleSwitch} />
        <LangOutput selectedLang={lang2} setSelectedLang={setLang2} />
        <textarea
          className="beforeArea"
          placeholder="Please enter some text."
          value={beforeText}
          onChange={(e) => setBeforeText(e.target.value)}
        />
        <textarea
          className="afterArea"
          placeholder="Translation."
          value={afterText}
          readOnly
        />
        <button className="translateButton" onClick={handleTranslate}>Translate</button>
        <div className="footer">
          Abit Jestine, Hunny Jaglen, Matthew Richard, Odejobi Emmanuel, Ziad Essam Ziyada <br /> - 2022 -
        </div>
      </section>
    </div>
  );
}

export default Home;
