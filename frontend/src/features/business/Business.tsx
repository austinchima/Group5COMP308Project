import React, { useState } from 'react';

export default function Business() {
  const [businesses] = useState([
    {
      id: 1,
      name: 'Green Thumb Nursery',
      category: 'Retail',
      description: 'Your local source for native plants and gardening supplies.',
      deals: [
        { title: 'Spring Sale', description: '20% off all indoor plants this weekend.' }
      ],
      reviews: [
        { author: 'Jane D.', rating: 5, content: 'Amazing selection and very helpful staff!', sentiment: 'POSITIVE' },
        { author: 'Mark S.', rating: 3, content: 'Good plants but a bit pricey.', sentiment: 'NEUTRAL' }
      ]
    }
  ]);

  return (
    <>
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">Local Businesses</h1>
            <p className="text-on-surface-variant max-w-xl text-lg">Support your local economy. Discover deals and engage with business owners.</p>
          </div>
          <button className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200">List Business</button>
        </div>
      </header>

      <div className="space-y-8">
        {businesses.map(bus => (
          <div key={bus.id} className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-on-surface/5">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-headline text-3xl font-bold">{bus.name}</h3>
                  <span className="px-3 py-1 bg-surface-container text-on-primary-container text-xs font-bold rounded-full">{bus.category}</span>
                </div>
                <p className="text-on-surface-variant mb-6">{bus.description}</p>
                
                {bus.deals.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary">local_offer</span>
                      Active Deals
                    </h4>
                    <div className="grid gap-4">
                      {bus.deals.map((deal, idx) => (
                        <div key={idx} className="bg-tertiary-container/10 p-4 rounded-lg border border-tertiary/20">
                          <h5 className="font-bold text-tertiary-fixed-dim">{deal.title}</h5>
                          <p className="text-sm text-on-surface-variant">{deal.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="w-full md:w-1/3 bg-surface-container-low p-6 rounded-xl">
                <h4 className="font-bold mb-4">Recent Reviews</h4>
                <div className="space-y-4">
                  {bus.reviews.map((rev, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-sm">{rev.author}</span>
                        <div className="flex text-tertiary-fixed-dim text-sm">
                          {'★'.repeat(rev.rating)}{'☆'.repeat(5-rev.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-on-surface-variant mb-3">{rev.content}</p>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs text-primary">auto_awesome</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${rev.sentiment === 'POSITIVE' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-variant text-on-surface-variant'}`}>
                          {rev.sentiment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
