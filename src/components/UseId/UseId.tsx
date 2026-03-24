import { useId, useState } from 'react';

export default function UseIdDemo() {
    const id = useId();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div style={{
            maxWidth: '480px',
            margin: '0 auto',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            background: 'radial-gradient(circle at top right, #1e293b, #0f172a)',
            borderRadius: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: '2.5rem',
            color: '#fff',
        }}>
            <h2 style={{
                margin: '0 0 1.5rem',
                fontSize: '1.5rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}>
                Account Linkage
            </h2>
            
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Notice how the labels are perfectly linked to the inputs using a single <code>useId()</code> base. 
                Clicking the labels will focus the corresponding input.
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={e => e.preventDefault()}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label 
                        htmlFor={`${id}-email`} 
                        style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}
                    >
                        Email Address
                    </label>
                    <input
                        id={`${id}-email`}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.06)',
                            color: '#fff',
                            outline: 'none',
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label 
                        htmlFor={`${id}-password`} 
                        style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}
                    >
                        Password
                    </label>
                    <input
                        id={`${id}-password`}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.06)',
                            color: '#fff',
                            outline: 'none',
                        }}
                    />
                </div>
                
                <p style={{ margin: '1rem 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                    Generated Base ID: <code data-testid="generated-id" style={{ color: '#818cf8' }}>{id}</code>
                </p>
            </form>
        </div>
    );
}
