import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ExpandableText = ({ text, maxLines = 'line-clamp-2', className = '' }) => {
  const [expanded, setExpanded] = useState(false);

  // If text is short, no need for toggle
  if (!text || text.length < 90) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div className="space-y-1">
      <p className={`${className} ${expanded ? '' : `${maxLines} md:line-clamp-none`}`}>
        {text}
      </p>

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="md:hidden inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-gold-500 hover:text-gold-400 mt-1 transition-colors"
      >
        <span>{expanded ? 'Show Less' : 'Read More'}</span>
        {expanded ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />}
      </button>
    </div>
  );
};

export default ExpandableText;
