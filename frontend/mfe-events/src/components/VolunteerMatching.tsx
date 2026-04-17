import React, { useState } from 'react';

interface VolunteerMatchingProps {
  eventTitle: string;
}

export default function VolunteerMatching({ eventTitle }: VolunteerMatchingProps) {
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: 'Marcus T.', role: 'Top Contributor', tags: ['Horticulture', 'Leader'], bio: 'Past attendance in 5 gardening events. High reliability score.', matched: false, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-SpxFlCpddSFPhxLDjHLmvbtLRh0xSP-3BmHQhWlZhoHbby9naw4UiuO0-i9tKSmHFlhousw1adDEzI3x63GOMrVqbC2WpQaJULw9om4rgm4uKAz8CN1TP25cpaM5IDYsaA6y23R06AujOmIv6_KfhSAJ5Z7yOMjINK0_S3BHVS76zmAVu8u8uwg8xLphfGbEVr5YyLAwl7rLy8dPgGUH1Hn9I6b0X_ccWofdzyOc6ewxFK3qLUhm0LISmeds3g2w5rYFuZmZCTY' },
    { id: 2, name: 'Elena R.', role: 'Highly Active', tags: ['Logistics', 'Events'], bio: 'Attended 12 workshops this year. Great for organization tasks.', matched: false, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC55eYQ89_8n4tJeDmHCI2VqpCJ8eOB9_IeIH1t_Xp-zSTUCmK4tJonKEyhw_RuwhUra9EyyaW0YDjqxeWwi6EK1HaYPuARgqZ_UJXbp6dA-zAORkZu856YYxbUbmyxVVxcTC2HRv8505fRPXHViJc_lWy0cl6F7MRts626tfNE6p035frFTHxGQOfNQk8HPyT4O0lX1F3VIN-8tk0b0ux7nV7v1Eqmv31YRQfJpTI-r4mvNI8MccpcMN2E94AfwBGc3PyRbi7LDmY' },
    { id: 3, name: 'Jordan K.', role: 'New Enthusiast', tags: ['Photography'], bio: 'Interested in event coverage. Perfect for capturing memories.', matched: false, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh_SzH8NxhFJkPBAG1NHQVvmH8DbWwYGeeCAVVj-s5iUOzuT0cnDD1ktftTFI6nHEIHYtymKKHaLVX_yrCCjEuc7PI8KURM7FWh1APZ1BBxW5eo0SQZl8ZHzBYczknmVtkgksHX6fjEBAh6RRrARxeI9KZc8rxOV76o2xsws8JYy2cReAZbd8jZamj2zCN8zGb15O_H4sESes4VTJC-Kg2rCVlKJQIuIFCfBDkoXuZwhghTkBh0fvkxe_0BYvWOvo-Up7gmn8zFjA' },
    { id: 4, name: 'Sophie L.', role: 'Regular', tags: ['Crafting', 'Workshop'], bio: 'Consistent attendee. Wants to move into hosting roles.', matched: false, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfr9NtiKXOy6_nmmp5pxUguS7VYydAHlxwUZbG_Mvcj8ZCVgCnjm_soy7hlml5AcAbc5dDiWs8XZl0F6KXXN3t7YIQqPPKGD3fkUQHT8C6UGrQOLKiUMeai39TCBKLPeOPimldAphtln-L0Ny_7U89_R31vc22aIxvPFZBO0ze8o482TtNkoVvLKJ8t7S3H1UkcZZxP_HT7oT9Q-iu9xrN2_Fdl-yvwCbdYqB7W0_ipFcE9QvoGaELAEShfoDXeiQxZc1cCeRObfU' },
  ]);

  const toggleMatch = (id: number) => {
    setVolunteers(volunteers.map(v => v.id === id ? { ...v, matched: !v.matched } : v));
  };

  const matchedCount = volunteers.filter(v => v.matched).length;

  return (
    <div className="md:col-span-12 bg-surface-container-low p-8 rounded-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h3 className="font-headline text-3xl font-bold mb-2">Volunteer Matching</h3>
          <p className="text-on-surface-variant">AI-suggested participants for "{eventTitle}" based on skillsets and history.</p>
        </div>
        <button 
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold shadow-sm transition-all ${
            matchedCount > 0 
              ? 'bg-primary text-on-primary hover:shadow-md' 
              : 'bg-white hover:shadow-md'
          }`}
        >
          <span>Send Group Invite {matchedCount > 0 && `(${matchedCount})`}</span>
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {volunteers.map(vol => (
          <div key={vol.id} className={`bg-white p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 ${vol.matched ? 'ring-2 ring-primary' : ''}`}>
            <div className="flex items-center gap-4 mb-4">
              <img alt={vol.name} className="w-12 h-12 rounded-full object-cover" src={vol.img} />
              <div>
                <h5 className="font-bold">{vol.name}</h5>
                <p className="text-xs text-on-surface-variant">{vol.role}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {vol.tags.map((tag, idx) => (
                <span key={idx} className={`px-2 py-0.5 text-[10px] font-black uppercase rounded ${idx === 0 ? 'bg-secondary-fixed' : 'bg-primary-fixed'}`}>{tag}</span>
              ))}
            </div>
            <p className="text-sm mb-4">{vol.bio}</p>
            <button 
              onClick={() => toggleMatch(vol.id)}
              className={`w-full py-2 rounded-full text-sm font-bold transition-colors ${
                vol.matched 
                  ? 'bg-primary text-on-primary' 
                  : 'border border-primary text-primary hover:bg-primary/5'
              }`}
            >
              {vol.matched ? '✓ Matched' : 'Match Participant'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
