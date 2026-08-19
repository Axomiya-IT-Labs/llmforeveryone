import { useMemo } from 'react';
import { 
  Search, 
  X, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAllModules, filterModules } from '../../utils/search';
import { PromptCard } from './PromptCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'high_school', label: 'High School / K-12' },
  { id: 'engineering', label: 'Engineering & CS' },
  { id: 'medical', label: 'Medical & Healthcare' },
  { id: 'arts_humanities', label: 'Arts & Humanities' },
  { id: 'business_commerce', label: 'Business & Commerce' },
  { id: 'phd', label: 'PhD & Research' },
  { id: 'doctor', label: 'Doctors & Clinicians' },
  { id: 'nurse', label: 'Nurses & Staff' },
  { id: 'teacher', label: 'Teachers & Educators' },
  { id: 'software_developer', label: 'Software Engineers' },
  { id: 'founder', label: 'Founders & Startups' },
  { id: 'farmer', label: 'Farmers & Agriculture' },
  { id: 'homemaker', label: 'Homemakers & Family' },
  { id: 'lawyer', label: 'Lawyers & Legal' },
  { id: 'finance', label: 'Finance & Analytics' },
  { id: 'marketing', label: 'Marketing & Growth' },
  { id: 'design', label: 'Designers & Creative' },
  { id: 'career_pivot', label: 'Career Pivoters' },
];

export function PromptExplorer() {
  const { selectedIndustry, setSelectedIndustry, searchQuery, setSearchQuery, startWizard } = useApp();

  const allModules = useMemo(() => getAllModules(), []);

  const filteredModules = useMemo(() => {
    return filterModules(allModules, selectedIndustry, searchQuery);
  }, [allModules, selectedIndustry, searchQuery]);

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="violet" size="sm">
                Production Prompt Catalog
              </Badge>
              <span className="text-xs text-slate-500 font-mono">
                {allModules.length} Production Recipes
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curated LLM Prompt Frameworks
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Search and filter context-engineered prompts across academic levels (High School to PhD) and diverse professional disciplines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="stripe"
              size="sm"
              onClick={startWizard}
              icon={<Sparkles className="w-3.5 h-3.5" />}
            >
              60s Guided Wizard
            </Button>
          </div>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="space-y-4">
          {/* Search Input Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts by keyword, role, task, or technique (e.g. 'Feynman', 'SOAP', 'Crop', 'Pantry', 'SBAR', 'Reviewer')..."
              className="w-full bg-[#111625] border border-white/[0.1] rounded-2xl pl-11 pr-10 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 shadow-lg transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CATEGORY_TABS.map((tab) => {
              const isSelected = selectedIndustry === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedIndustry(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#635BFF] text-white shadow-md shadow-[#635BFF]/30 scale-[1.02]'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Metrics */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-white">{filteredModules.length}</strong> prompts</span>
            {(selectedIndustry !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedIndustry('all');
                  setSearchQuery('');
                }}
                className="text-[#8F89FF] hover:underline font-semibold flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Prompt Cards Grid */}
        {filteredModules.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredModules.map((m) => (
              <PromptCard key={`${m.industry}-${m.id}`} module={m} />
            ))}
          </div>
        ) : (
          <div className="p-16 rounded-3xl bg-[#111625]/50 border border-white/[0.08] text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-400 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No prompts found matching your query</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              Try searching for broader terms or switch category filters.
            </p>
            <div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedIndustry('all');
                  setSearchQuery('');
                }}
              >
                Clear Search &amp; Show All
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
