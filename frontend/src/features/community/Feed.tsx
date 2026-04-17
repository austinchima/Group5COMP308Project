import React, { useState } from 'react';

export default function Feed() {
  const [posts] = useState([
    {
      id: 1,
      author: 'Sarah Jenkins',
      type: 'News',
      title: 'New Community Garden Opening',
      content: 'We are thrilled to announce the opening of the new community garden on 5th street. Come join us this weekend for the opening ceremony!',
      summary: 'A new community garden is opening on 5th street this weekend.',
      time: '2 hours ago',
    },
    {
      id: 2,
      author: 'Mike Ross',
      type: 'Discussion',
      title: 'Thoughts on the new parking rules?',
      content: 'Has anyone seen the new parking rules posted downtown? I feel like they are a bit too restrictive during the weekends. What does everyone else think?',
      summary: 'Discussion about the new downtown parking rules being too restrictive on weekends.',
      time: '5 hours ago',
    }
  ]);

  return (
    <>
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">Community Feed</h1>
            <p className="text-on-surface-variant max-w-xl text-lg">Stay updated with local news and join neighborhood discussions.</p>
          </div>
          <button className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200">New Post</button>
        </div>
      </header>

      <div className="space-y-6 max-w-3xl">
        {posts.map(post => (
          <div key={post.id} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-on-surface/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{post.author}</h4>
                  <p className="text-xs text-on-surface-variant">{post.time}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-surface-container text-on-primary-container text-xs font-bold rounded-full">{post.type}</span>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2">{post.title}</h3>
            <p className="text-on-surface-variant mb-4">{post.content}</p>
            
            {post.summary && (
              <div className="bg-surface-container-low p-4 rounded-lg flex gap-3 items-start">
                <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                <div>
                  <p className="text-xs font-bold text-tertiary uppercase mb-1">AI Summary</p>
                  <p className="text-sm text-on-surface-variant">{post.summary}</p>
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-on-surface/5 flex gap-4">
              <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">thumb_up</span>
                <span className="text-sm font-bold">Like</span>
              </button>
              <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                <span className="text-sm font-bold">Comment</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
