import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';
import { hexToRgb } from '../utils/color.js';
import { useTranslation } from 'react-i18next';

const CSS_COLORS = [
  ['aliceblue','#f0f8ff'],['antiquewhite','#faebd7'],['aqua','#00ffff'],['aquamarine','#7fffd4'],
  ['azure','#f0ffff'],['beige','#f5f5dc'],['bisque','#ffe4c4'],['black','#000000'],
  ['blanchedalmond','#ffebcd'],['blue','#0000ff'],['blueviolet','#8a2be2'],['brown','#a52a2a'],
  ['burlywood','#deb887'],['cadetblue','#5f9ea0'],['chartreuse','#7fff00'],['chocolate','#d2691e'],
  ['coral','#ff7f50'],['cornflowerblue','#6495ed'],['cornsilk','#fff8dc'],['crimson','#dc143c'],
  ['cyan','#00ffff'],['darkblue','#00008b'],['darkcyan','#008b8b'],['darkgoldenrod','#b8860b'],
  ['darkgray','#a9a9a9'],['darkgreen','#006400'],['darkkhaki','#bdb76b'],['darkmagenta','#8b008b'],
  ['darkolivegreen','#556b2f'],['darkorange','#ff8c00'],['darkorchid','#9932cc'],['darkred','#8b0000'],
  ['darksalmon','#e9967a'],['darkseagreen','#8fbc8f'],['darkslateblue','#483d8b'],['darkslategray','#2f4f4f'],
  ['darkturquoise','#00ced1'],['darkviolet','#9400d3'],['deeppink','#ff1493'],['deepskyblue','#00bfff'],
  ['dimgray','#696969'],['dodgerblue','#1e90ff'],['firebrick','#b22222'],['floralwhite','#fffaf0'],
  ['forestgreen','#228b22'],['fuchsia','#ff00ff'],['gainsboro','#dcdcdc'],['ghostwhite','#f8f8ff'],
  ['gold','#ffd700'],['goldenrod','#daa520'],['gray','#808080'],['green','#008000'],
  ['greenyellow','#adff2f'],['honeydew','#f0fff0'],['hotpink','#ff69b4'],['indianred','#cd5c5c'],
  ['indigo','#4b0082'],['ivory','#fffff0'],['khaki','#f0e68c'],['lavender','#e6e6fa'],
  ['lavenderblush','#fff0f5'],['lawngreen','#7cfc00'],['lemonchiffon','#fffacd'],['lightblue','#add8e6'],
  ['lightcoral','#f08080'],['lightcyan','#e0ffff'],['lightgoldenrodyellow','#fafad2'],['lightgray','#d3d3d3'],
  ['lightgreen','#90ee90'],['lightpink','#ffb6c1'],['lightsalmon','#ffa07a'],['lightseagreen','#20b2aa'],
  ['lightskyblue','#87cefa'],['lightslategray','#778899'],['lightsteelblue','#b0c4de'],['lightyellow','#ffffe0'],
  ['lime','#00ff00'],['limegreen','#32cd32'],['linen','#faf0e6'],['magenta','#ff00ff'],
  ['maroon','#800000'],['mediumaquamarine','#66cdaa'],['mediumblue','#0000cd'],['mediumorchid','#ba55d3'],
  ['mediumpurple','#9370db'],['mediumseagreen','#3cb371'],['mediumslateblue','#7b68ee'],['mediumspringgreen','#00fa9a'],
  ['mediumturquoise','#48d1cc'],['mediumvioletred','#c71585'],['midnightblue','#191970'],['mintcream','#f5fffa'],
  ['mistyrose','#ffe4e1'],['moccasin','#ffe4b5'],['navajowhite','#ffdead'],['navy','#000080'],
  ['oldlace','#fdf5e6'],['olive','#808000'],['olivedrab','#6b8e23'],['orange','#ffa500'],
  ['orangered','#ff4500'],['orchid','#da70d6'],['palegoldenrod','#eee8aa'],['palegreen','#98fb98'],
  ['paleturquoise','#afeeee'],['palevioletred','#db7093'],['papayawhip','#ffefd5'],['peachpuff','#ffdab9'],
  ['peru','#cd853f'],['pink','#ffc0cb'],['plum','#dda0dd'],['powderblue','#b0e0e6'],
  ['purple','#800080'],['red','#ff0000'],['rosybrown','#bc8f8f'],['royalblue','#4169e1'],
  ['saddlebrown','#8b4513'],['salmon','#fa8072'],['sandybrown','#f4a460'],['seagreen','#2e8b57'],
  ['seashell','#fff5ee'],['sienna','#a0522d'],['silver','#c0c0c0'],['skyblue','#87ceeb'],
  ['slateblue','#6a5acd'],['slategray','#708090'],['snow','#fffafa'],['springgreen','#00ff7f'],
  ['steelblue','#4682b4'],['tan','#d2b48c'],['teal','#008080'],['thistle','#d8bfd8'],
  ['tomato','#ff6347'],['turquoise','#40e0d0'],['violet','#ee82ee'],['wheat','#f5deb3'],
  ['white','#ffffff'],['whitesmoke','#f5f5f5'],['yellow','#ffff00'],['yellowgreen','#9acd32'],
];

export default function NamedColors() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const filtered = search
    ? CSS_COLORS.filter(([name, hex]) => name.includes(search.toLowerCase()) || hex.includes(search.toLowerCase()))
    : CSS_COLORS;

  const copy = (text) => { navigator.clipboard.writeText(text); toast.success(t('common.copied')); };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{t('namedColors.title')}</h1>
        <p className="text-gray-400 text-sm">{t('namedColors.desc')}</p>
      </div>

      <div className="relative mb-8">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input className="input pl-10" placeholder={t('namedColors.search')}
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map(([name, hex]) => {
          const rgb = hexToRgb(hex);
          const brightness = rgb ? (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 : 128;
          const textColor = brightness > 140 ? '#1a1a1a' : '#ffffff';
          return (
            <button key={name} onClick={() => copy(hex)}
              className="card p-3 text-left hover:border-violet-700 transition-all group hover:-translate-y-0.5">
              <div className="w-full h-12 rounded-lg mb-2 border border-dark-600 flex items-center justify-center"
                style={{ background: hex }}>
                <span className="text-xs font-mono opacity-80" style={{ color: textColor }}>{hex}</span>
              </div>
              <p className="text-xs text-gray-300 font-medium truncate group-hover:text-violet-400 transition-colors">{name}</p>
              {rgb && <p className="text-xs text-gray-600 mt-0.5">rgb({rgb.r},{rgb.g},{rgb.b})</p>}
            </button>
          );
        })}
      </div>

      <p className="text-center text-sm text-gray-600 mt-8">
        {t('namedColors.showing', { count: filtered.length })}
      </p>
    </div>
  );
}
