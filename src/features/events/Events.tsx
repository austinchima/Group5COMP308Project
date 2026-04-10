import React from 'react';

export default function Events() {
  return (
    <>
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">Organizer Hub</h1>
            <p className="text-on-surface-variant max-w-xl text-lg">Curate meaningful moments. Manage participants and track the pulse of your community.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-bold hover:brightness-95 transition-all">Export Report</button>
            <button className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200">Create Event</button>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Smart Timing AI Suggestion (Top Row Left) */}
        <div className="md:col-span-4 bg-surface-container-high p-8 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
              <span className="text-tertiary font-bold text-sm tracking-widest uppercase">Smart Timing AI</span>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-4 leading-tight">Optimal Window Identified</h3>
            <p className="text-on-surface-variant mb-6">Based on local engagement data, your next workshop will perform best on:</p>
            <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <p className="text-sm font-bold text-on-surface">Saturday, Oct 24th</p>
              <p className="text-2xl font-black text-primary">10:00 AM — 1:00 PM</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-on-surface/5">
            <button className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-all">
              Schedule for this time <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          {/* Abstract Texture Decor */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        {/* Active Events List & Analytics (Top Row Right) */}
        <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-on-surface/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold">Manage Active Events</h3>
            <div className="flex gap-2">
              <span className="px-4 py-1 bg-surface-container text-on-primary-container text-xs font-bold rounded-full">All Status</span>
              <span className="px-4 py-1 bg-surface-container-low text-on-surface-variant text-xs font-bold rounded-full">Workshops</span>
            </div>
          </div>
          <div className="space-y-6">
            {/* Event Row 1 */}
            <div className="group flex flex-col lg:flex-row lg:items-center gap-6 p-4 -mx-4 rounded-xl hover:bg-surface-container-low/50 transition-colors">
              <div className="w-full lg:w-32 h-24 rounded-lg overflow-hidden shrink-0">
                <img alt="Pottery Class" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBFLGeeQ8kxlNsVaxLO0nypK_VwbVtLsJm7r8DDx8pjBR_ztJTtXenIVZffoujGWMTicudcMAqMQqHLyNbLi_IDmHfmxL3fDcxFvp8oen3xVoevARlfy5MGqeukY8Q-cCr99pi08VDIfxSTdlrDLCGoEeDcLsVVr0RAf3Qlb8OdvZL6N9knbLHeIgIVRNK_siDnWp20-XVDSCpR6Be-UGf4r3_Xzk5p2GC7LBu1uzZln4d7RQvOVX0YNOw9yG7I8k2FD4AEusu39s" />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-xl mb-1">Morning Pottery & Tea</h4>
                <p className="text-sm text-on-surface-variant">Tomorrow at 9:00 AM • 18 Participants</p>
              </div>
              <div className="flex items-center gap-12 lg:ml-auto">
                <div className="text-right">
                  <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">Engagement</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[85%]"></div>
                    </div>
                    <span className="text-sm font-bold">85%</span>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            {/* Event Row 2 */}
            <div className="group flex flex-col lg:flex-row lg:items-center gap-6 p-4 -mx-4 rounded-xl hover:bg-surface-container-low/50 transition-colors">
              <div className="w-full lg:w-32 h-24 rounded-lg overflow-hidden shrink-0">
                <img alt="Urban Garden" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLjha5S3Ie3hwnXN-Woa-qI7hfQ2wQS-mXXFGZ9la11m9A4VItUKwAnYx39OWtAUsCnXLfO_DzKqV8gHXN1GYNhnzaLPo-X4a-ep4LLo8b9lRA21qQnylHaii1oP2ch6ymJMjsDChXuWbqKb6ck_OVUMFvgIjsy2gcxGKTLGE8i-dPHUxOHhfqyN85XzQvD2U615rBH-JMlZbyuYJrXXc4KlzwLOniOu23CGm7aJpUyTVYsDDAL1GCB4VgGuch7mj6hKXcgF8FAc0" />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-xl mb-1">Community Garden Planting</h4>
                <p className="text-sm text-on-surface-variant">Oct 12 at 2:00 PM • 32 Participants</p>
              </div>
              <div className="flex items-center gap-12 lg:ml-auto">
                <div className="text-right">
                  <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">Engagement</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary w-[42%]"></div>
                    </div>
                    <span className="text-sm font-bold">42%</span>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer Matching Section (Full Width Bottom) */}
        <div className="md:col-span-12 bg-surface-container-low p-8 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h3 className="font-headline text-3xl font-bold mb-2">Volunteer Matching</h3>
              <p className="text-on-surface-variant">AI-suggested participants for "Garden Planting Day" based on skillsets and history.</p>
            </div>
            <button className="flex items-center gap-2 bg-white px-6 py-2 rounded-full font-bold shadow-sm hover:shadow-md transition-all">
              <span>Send Group Invite</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Volunteer Card 1 */}
            <div className="bg-white p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img alt="Volunteer" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-SpxFlCpddSFPhxLDjHLmvbtLRh0xSP-3BmHQhWlZhoHbby9naw4UiuO0-i9tKSmHFlhousw1adDEzI3x63GOMrVqbC2WpQaJULw9om4rgm4uKAz8CN1TP25cpaM5IDYsaA6y23R06AujOmIv6_KfhSAJ5Z7yOMjINK0_S3BHVS76zmAVu8u8uwg8xLphfGbEVr5YyLAwl7rLy8dPgGUH1Hn9I6b0X_ccWofdzyOc6ewxFK3qLUhm0LISmeds3g2w5rYFuZmZCTY" />
                <div>
                  <h5 className="font-bold">Marcus T.</h5>
                  <p className="text-xs text-on-surface-variant">Top Contributor</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 bg-secondary-fixed text-[10px] font-black uppercase rounded">Horticulture</span>
                <span className="px-2 py-0.5 bg-primary-fixed text-[10px] font-black uppercase rounded">Leader</span>
              </div>
              <p className="text-sm mb-4">Past attendance in 5 gardening events. High reliability score.</p>
              <button className="w-full border border-primary text-primary py-2 rounded-full text-sm font-bold hover:bg-primary/5 transition-colors">Match Participant</button>
            </div>
            {/* Volunteer Card 2 */}
            <div className="bg-white p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img alt="Volunteer" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC55eYQ89_8n4tJeDmHCI2VqpCJ8eOB9_IeIH1t_Xp-zSTUCmK4tJonKEyhw_RuwhUra9EyyaW0YDjqxeWwi6EK1HaYPuARgqZ_UJXbp6dA-zAORkZu856YYxbUbmyxVVxcTC2HRv8505fRPXHViJc_lWy0cl6F7MRts626tfNE6p035frFTHxGQOfNQk8HPyT4O0lX1F3VIN-8tk0b0ux7nV7v1Eqmv31YRQfJpTI-r4mvNI8MccpcMN2E94AfwBGc3PyRbi7LDmY" />
                <div>
                  <h5 className="font-bold">Elena R.</h5>
                  <p className="text-xs text-on-surface-variant">Highly Active</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 bg-secondary-fixed text-[10px] font-black uppercase rounded">Logistics</span>
                <span className="px-2 py-0.5 bg-primary-fixed text-[10px] font-black uppercase rounded">Events</span>
              </div>
              <p className="text-sm mb-4">Attended 12 workshops this year. Great for organization tasks.</p>
              <button className="w-full border border-primary text-primary py-2 rounded-full text-sm font-bold hover:bg-primary/5 transition-colors">Match Participant</button>
            </div>
            {/* Volunteer Card 3 */}
            <div className="bg-white p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img alt="Volunteer" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh_SzH8NxhFJkPBAG1NHQVvmH8DbWwYGeeCAVVj-s5iUOzuT0cnDD1ktftTFI6nHEIHYtymKKHaLVX_yrCCjEuc7PI8KURM7FWh1APZ1BBxW5eo0SQZl8ZHzBYczknmVtkgksHX6fjEBAh6RRrARxeI9KZc8rxOV76o2xsws8JYy2cReAZbd8jZamj2zCN8zGb15O_H4sESes4VTJC-Kg2rCVlKJQIuIFCfBDkoXuZwhghTkBh0fvkxe_0BYvWOvo-Up7gmn8zFjA" />
                <div>
                  <h5 className="font-bold">Jordan K.</h5>
                  <p className="text-xs text-on-surface-variant">New Enthusiast</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 bg-secondary-fixed text-[10px] font-black uppercase rounded">Photography</span>
              </div>
              <p className="text-sm mb-4">Interested in event coverage. Perfect for capturing memories.</p>
              <button className="w-full border border-primary text-primary py-2 rounded-full text-sm font-bold hover:bg-primary/5 transition-colors">Match Participant</button>
            </div>
            {/* Volunteer Card 4 */}
            <div className="bg-white p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img alt="Volunteer" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfr9NtiKXOy6_nmmp5pxUguS7VYydAHlxwUZbG_Mvcj8ZCVgCnjm_soy7hlml5AcAbc5dDiWs8XZl0F6KXXN3t7YIQqPPKGD3fkUQHT8C6UGrQOLKiUMeai39TCBKLPeOPimldAphtln-L0Ny_7U89_R31vc22aIxvPFZBO0ze8o482TtNkoVvLKJ8t7S3H1UkcZZxP_HT7oT9Q-iu9xrN2_Fdl-yvwCbdYqB7W0_ipFcE9QvoGaELAEShfoDXeiQxZc1cCeRObfU" />
                <div>
                  <h5 className="font-bold">Sophie L.</h5>
                  <p className="text-xs text-on-surface-variant">Regular</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 bg-secondary-fixed text-[10px] font-black uppercase rounded">Crafting</span>
                <span className="px-2 py-0.5 bg-primary-fixed text-[10px] font-black uppercase rounded">Workshop</span>
              </div>
              <p className="text-sm mb-4">Consistent attendee. Wants to move into hosting roles.</p>
              <button className="w-full border border-primary text-primary py-2 rounded-full text-sm font-bold hover:bg-primary/5 transition-colors">Match Participant</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
