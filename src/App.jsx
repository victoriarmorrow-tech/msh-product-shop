import React, { useState, useMemo } from 'react';
import { ShoppingCart, DollarSign, Check, AlertCircle, Trash2, Info, Lock, Eye, EyeOff, BarChart3 } from 'lucide-react';

const INITIAL_BUDGET = 1000;

const ITEMS = [
  { id: 1, title: '1TG tasks UI update', price: 250, globalCount: 45, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.' },
  { id: 2, title: 'My Day calendar', price: 175, globalCount: 82, description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 3, title: 'Updated check-in form', price: 300, globalCount: 33, description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { id: 4, title: 'Clearer check-in prioritization', price: 150, globalCount: 95, description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  { id: 5, title: 'Expanded "See My Numbers"', price: 200, globalCount: 60, description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.' },
  { id: 6, title: 'Improved clinical profiles + upload option', price: 350, globalCount: 28, description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.' },
  { id: 7, title: 'Updated member details page', price: 225, globalCount: 51, description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.' },
  { id: 8, title: 'Clearer timeline of activity', price: 180, globalCount: 74, description: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.' },
  { id: 9, title: 'Consolidated workflows', price: 325, globalCount: 40, description: 'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto.' },
  { id: 10, title: 'Improved program/service info', price: 125, globalCount: 88, description: 'Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.' },
  { id: 11, title: 'Technical debt fixes (physicians, contacts, "hellbox")', price: 100, globalCount: 92, description: 'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.' },
];

export default function FeatureShop() {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showUniversalStats, setShowUniversalStats] = useState(false);

  // Derived state
  const totalSpent = useMemo(() => cart.reduce((sum, itemId) => {
    const item = ITEMS.find(i => i.id === itemId);
    return sum + (item ? item.price : 0);
  }, 0), [cart]);

  const remainingBudget = INITIAL_BUDGET - totalSpent;
  const progressPercentage = (totalSpent / INITIAL_BUDGET) * 100;

  const toggleItem = (itemId, price) => {
    const isInCart = cart.includes(itemId);

    if (isInCart) {
      // Remove item (Refund)
      setCart(prev => prev.filter(id => id !== itemId));
    } else {
      // Attempt to add item (Buy Once)
      if (remainingBudget >= price) {
        setCart(prev => [...prev, itemId]);
        showNotification("Item added to prioritization list");
      } else {
        showNotification("Insufficient budget for this item", "error");
      }
    }
  };

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 flex flex-col font-sans"
      style={{ fontFamily: '"Century Gothic", CenturyGothic, AppleGothic, sans-serif' }}
    >
      
      {/* Header / Bank Display */}
      <header className="sticky top-0 z-30 shadow-lg" style={{ backgroundColor: '#154734' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-white">
                MSH Feature Market
              </h1>
              <p className="text-sm opacity-80 text-white mt-1">Select features within your budget</p>
            </div>

            {/* Budget Meter */}
            <div className="w-full md:w-auto bg-[#0d2e21] rounded-xl p-4 border border-[#D6A461]/30 shadow-inner flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-[#D6A461] mb-1">Remaining Budget</span>
                <span className={`text-3xl font-bold transition-colors duration-500 ${remainingBudget < 100 ? 'text-red-400' : 'text-white'}`}>
                  ${remainingBudget}
                </span>
              </div>
              
              <div className="flex-1 min-w-[150px] md:min-w-[200px]">
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden relative">
                  <div 
                    className={`h-full transition-all duration-700 ease-out ${remainingBudget === 0 ? 'bg-red-500' : 'bg-[#D6A461]'}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Spent: ${totalSpent}</span>
                  <span>Limit: ${INITIAL_BUDGET}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 md:py-12 w-full">
        
        {/* Intro Text */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#154734] mb-3">Prioritize Your Updates</h2>
          <p className="text-gray-600 leading-relaxed">
            You have <span className="font-bold text-[#154734]">$1,000</span> allocated. 
            Select items to add them to your cart. You can only buy each item once.
            Once your budget is depleted, you cannot add more items.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => {
            const isSelected = cart.includes(item.id);
            const isAffordable = remainingBudget >= item.price;
            
            // Logic: Disable if NOT selected AND NOT affordable. 
            // If it IS selected, we want it enabled so we can remove it.
            const isDisabled = !isSelected && !isAffordable;

            return (
              <div 
                key={item.id}
                onClick={() => !isDisabled && toggleItem(item.id, item.price)}
                className={`
                  relative flex flex-col p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer shadow-sm group
                  ${isSelected 
                    ? 'bg-[#154734]/5 border-[#154734] shadow-md transform scale-[1.02]' 
                    : isDisabled 
                      ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed grayscale' 
                      : 'bg-white border-transparent hover:border-[#D6A461] hover:shadow-lg'
                  }
                `}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`
                    text-lg font-bold leading-tight pr-4
                    ${isSelected ? 'text-[#154734]' : 'text-gray-800'}
                  `}>
                    {item.title}
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-bold shrink-0
                    ${isSelected 
                      ? 'bg-[#154734] text-white' 
                      : 'bg-[#D6A461]/20 text-[#9e763f]'
                    }
                  `}>
                    ${item.price}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-6 flex-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Action Area */}
                <div className="mt-auto flex items-center justify-between">
                  <button
                    disabled={isDisabled}
                    className={`
                      px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors w-full justify-center
                      ${isSelected 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                        : isDisabled
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-[#D6A461] text-white hover:bg-[#c29252] shadow-md'
                      }
                    `}
                  >
                    {isSelected ? (
                      <>
                        <Trash2 size={16} /> Remove
                      </>
                    ) : isDisabled ? (
                      <>
                        <Lock size={16} /> Fund Limit Reached
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} /> Buy Item
                      </>
                    )}
                  </button>
                </div>

                {/* Selected Indicator Checkmark */}
                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-[#154734] text-white rounded-full p-1 shadow-md animate-in zoom-in duration-200">
                    <Check size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer / Universal Stats Section */}
      <footer className="bg-[#154734] text-white py-8 mt-12 transition-all duration-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <button 
            onClick={() => setShowUniversalStats(!showUniversalStats)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D6A461] hover:bg-[#c29252] text-[#154734] font-bold text-sm transition-transform active:scale-95 shadow-lg"
          >
            {showUniversalStats ? (
              <>
                <EyeOff size={18} /> Hide Group Consensus
              </>
            ) : (
              <>
                <Eye size={18} /> Reveal Universal Totals
              </>
            )}
          </button>

          {showUniversalStats && (
            <div className="mt-8 animate-in slide-in-from-bottom-4 fade-in duration-500 text-left bg-[#0d2e21] rounded-2xl p-6 md:p-8 border border-[#D6A461]/30">
              <h3 className="text-xl font-bold text-[#D6A461] mb-6 flex items-center gap-2 border-b border-[#D6A461]/20 pb-4">
                <BarChart3 size={24} /> Universal Purchase Counters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {ITEMS.sort((a, b) => b.globalCount - a.globalCount).map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className="text-[#D6A461] font-mono w-6 text-sm opacity-50">#{index + 1}</span>
                      <span className="text-sm md:text-base text-gray-200 truncate">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="h-2 w-16 md:w-24 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#D6A461]" 
                          style={{ width: `${item.globalCount}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-white w-8 text-right">{item.globalCount}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-[#D6A461]/20 text-xs text-center text-gray-400">
                * Represents aggregated data from all participating users
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center text-xs text-[#D6A461]/60 mt-8">
          &copy; 2025 MSH Feature Market.
        </div>
      </footer>

      {/* Notification Toast */}
      {notification && (
        <div className={`
          fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-3 animate-in slide-in-from-bottom-5
          ${notification.type === 'error' ? 'bg-red-600 text-white' : 'bg-white text-[#154734] border border-[#154734]'}
        `}>
          {notification.type === 'error' ? <AlertCircle size={18} /> : <Check size={18} />}
          <span className="font-medium">{notification.msg}</span>
        </div>
      )}

    </div>
  );
}
