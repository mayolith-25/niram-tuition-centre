const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'public', 'css');
const jsDir = path.join(__dirname, 'public', 'js');

const replacements = {
  '--navy-950: #060e1a;': '--navy-950: #020617;',
  '--navy-900: #0a1628;': '--navy-900: #0f172a;',
  '--navy-800: #0f2037;': '--navy-800: #1e293b;',
  '--navy-700: #1e3a5f;': '--navy-700: #334155;',
  '--navy-600: #1a4a7a;': '--navy-600: #475569;',
  '--navy-500: #2d5f8a;': '--navy-500: #64748b;',
  '--navy-400: #4a80a8;': '--navy-400: #94a3b8;',
  '--navy-300: #7babc8;': '--navy-300: #cbd5e1;',

  '--gold-600: #b8892e;': '--blue-600: #2563eb;',
  '--gold-500: #d4a853;': '--blue-500: #3b82f6;',
  '--gold-400: #e8c46a;': '--blue-400: #60a5fa;',
  '--gold-300: #f0d68a;': '--blue-300: #93c5fd;',
  '--gold-200: #f7e8b5;': '--blue-200: #bfdbfe;',

  '--saffron-500: #f4a100;': '--cyan-500: #0ea5e9;',
  '--saffron-400: #f7b733;': '--cyan-400: #38bdf8;',

  '--warm-50: #faf6f0;': '--slate-50: #f8fafc;',
  '--warm-100: #f0e6d4;': '--slate-100: #f1f5f9;',
  '--warm-200: #e6d5bd;': '--slate-200: #e2e8f0;',
  '--warm-300: #d4bfa0;': '--slate-300: #cbd5e1;',
  '--warm-400: #b8a080;': '--slate-400: #94a3b8;',

  '--shadow-gold: 0 4px 20px rgba(212, 168, 83, 0.3);': '--shadow-blue: 0 4px 20px rgba(59, 130, 246, 0.3);',
  
  '--gold-': '--blue-',
  '--saffron-': '--cyan-',
  '--warm-': '--slate-',
  '--shadow-gold': '--shadow-blue',

  // Specific color repacements for rgba
  'rgba(212, 168, 83,': 'rgba(59, 130, 246,', // gold-500 rgba
  'rgba(244, 161, 0,': 'rgba(14, 165, 233,',  // saffron-500 rgba
  'rgba(10, 22, 40,': 'rgba(15, 23, 42,', // navy-900 rgba

  // Globals body colors
  'background-color: var(--slate-50);': 'background-color: var(--navy-900);',
  'color: var(--gray-800);': 'color: var(--gray-300);',

  // components.css specifically
  'background: #fff;': 'background: var(--navy-800); border: 1px solid rgba(255, 255, 255, 0.08); color: var(--gray-100);',
  'color: var(--navy-700);': 'color: var(--slate-300);',
  'color: var(--navy-800);': 'color: var(--slate-200);',
  'color: var(--navy-900);': 'color: #fff;',
  'background: var(--navy-900);': 'background: var(--navy-950); border-top: 1px solid rgba(255,255,255,0.08);'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.css') || file.endsWith('.js')) {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      let modified = false;
      for (const [search, replace] of Object.entries(replacements)) {
        if (content.includes(search)) {
          content = content.split(search).join(replace);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
      }
    }
  }
}

processDir(cssDir);
processDir(jsDir);

console.log('Theme refactor complete.');
