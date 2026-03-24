import { useState, useMemo } from 'react';

function checkAnagram(str1: string, str2: string): boolean {
    const normalize = (str: string) => 
        str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split('').sort().join('');
    
    // If both are empty after normalization, let's not call them anagrams
    const norm1 = normalize(str1);
    const norm2 = normalize(str2);
    
    if (!norm1 || !norm2) return false;
    
    return norm1 === norm2;
}

export default function StringAnagram() {
    const [word1, setWord1] = useState('listen');
    const [word2, setWord2] = useState('silent');

    const isAnagram = useMemo(() => checkAnagram(word1, word2), [word1, word2]);

    return (
        <div style={{
            maxWidth: '480px',
            margin: '0 auto',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            background: 'radial-gradient(circle at top, #1e293b, #0f172a)',
            borderRadius: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: '2.5rem',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        }}>
            <div>
                <h2 style={{
                    margin: '0 0 0.5rem',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #f472b6, #fb7185)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    Anagram Checker
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: 0 }}>
                    Enter two words or phrases to check if they use the exact same letters.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="word1" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>First Word/Phrase</label>
                    <input
                        id="word1"
                        type="text"
                        value={word1}
                        onChange={e => setWord1(e.target.value)}
                        placeholder="e.g. listen"
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.06)',
                            color: '#fff',
                            outline: 'none',
                            fontSize: '1rem',
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="word2" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>Second Word/Phrase</label>
                    <input
                        id="word2"
                        type="text"
                        value={word2}
                        onChange={e => setWord2(e.target.value)}
                        placeholder="e.g. silent"
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.06)',
                            color: '#fff',
                            outline: 'none',
                            fontSize: '1rem',
                        }}
                    />
                </div>
            </div>

            <div style={{
                marginTop: '1rem',
                padding: '1.5rem',
                borderRadius: '1.25rem',
                background: isAnagram ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${isAnagram ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
            }}>
                {isAnagram ? (
                    <>
                        <span style={{ fontSize: '1.5rem' }}>✨</span>
                        <span style={{ color: '#4ade80', fontWeight: 600, fontSize: '1.1rem' }}>They are an anagram!</span>
                    </>
                ) : (
                    <>
                        <span style={{ fontSize: '1.5rem' }}>❌</span>
                        <span style={{ color: '#f87171', fontWeight: 600, fontSize: '1.1rem' }}>Not an anagram.</span>
                    </>
                )}
            </div>
        </div>
    );
}
