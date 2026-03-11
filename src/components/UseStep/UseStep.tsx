import { useState, useCallback, useMemo } from 'react';

interface UseStepOptions {
    initialStep?: number;
}

export interface UseStepReturn {
    currentStep: number;
    totalSteps: number;
    isFirst: boolean;
    isLast: boolean;
    next: () => void;
    prev: () => void;
    goTo: (step: number) => void;
    reset: () => void;
}

export function useStep(totalSteps: number, options: UseStepOptions = {}): UseStepReturn {
    const maxStep = totalSteps - 1;

    const clamp = (n: number) => Math.min(Math.max(n, 0), maxStep);

    const resolvedInitial = useMemo(
        () => clamp(options.initialStep ?? 0),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const [currentStep, setCurrentStep] = useState(resolvedInitial);

    const next  = useCallback(() => setCurrentStep(s => Math.min(s + 1, maxStep)), [maxStep]);
    const prev  = useCallback(() => setCurrentStep(s => Math.max(s - 1, 0)), []);
    const goTo  = useCallback((step: number) => setCurrentStep(clamp(step)), [maxStep]); // eslint-disable-line react-hooks/exhaustive-deps
    const reset = useCallback(() => setCurrentStep(resolvedInitial), [resolvedInitial]);

    return {
        currentStep,
        totalSteps,
        isFirst: currentStep === 0,
        isLast:  currentStep === maxStep,
        next,
        prev,
        goTo,
        reset,
    };
}

// ─── Demo ────────────────────────────────────────────────────────────────────

const STEPS = [
    { title: 'Personal Info',   icon: '👤', description: 'Tell us a bit about yourself — name, email and date of birth.' },
    { title: 'Account Setup',   icon: '🔐', description: 'Choose a secure password and set up two-factor authentication.' },
    { title: 'Preferences',     icon: '⚙️',  description: 'Pick your notification settings and preferred language.' },
    { title: 'Review & Submit', icon: '✅', description: 'Double-check your details before we create your account.' },
];

export default function UseStepDemo() {
    const { currentStep, totalSteps, isFirst, isLast, next, prev, goTo, reset } = useStep(STEPS.length);
    const step = STEPS[currentStep];

    return (
        <div style={{
            maxWidth: '560px',
            margin: '0 auto',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            background: 'radial-gradient(circle at top left, #1e293b, #0f172a)',
            borderRadius: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: '2.5rem',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
        }}>

            {/* Progress bar */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>
                    <span>Step {currentStep + 1} of {totalSteps}</span>
                    <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '99px', height: '6px', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%',
                        width: `${((currentStep + 1) / totalSteps) * 100}%`,
                        background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                        borderRadius: '99px',
                        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }} />
                </div>
            </div>

            {/* Step dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                {STEPS.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        title={s.title}
                        style={{
                            width: i === currentStep ? '2rem' : '0.6rem',
                            height: '0.6rem',
                            borderRadius: '99px',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            background: i === currentStep
                                ? 'linear-gradient(90deg, #6366f1, #a855f7)'
                                : i < currentStep
                                    ? 'rgba(99,102,241,0.5)'
                                    : 'rgba(255,255,255,0.15)',
                        }}
                    />
                ))}
            </div>

            {/* Step card */}
            <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.25rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                minHeight: '130px',
            }}>
                <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{step.icon}</div>
                <h2 style={{
                    margin: 0,
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>{step.title}</h2>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {step.description}
                </p>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                    onClick={prev}
                    disabled={isFirst}
                    style={{
                        flex: 1,
                        padding: '0.75rem 1.25rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.06)',
                        color: isFirst ? 'rgba(255,255,255,0.2)' : '#fff',
                        cursor: isFirst ? 'not-allowed' : 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'all 0.2s',
                    }}
                >← Back</button>

                <button
                    onClick={reset}
                    style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.06)',
                        color: 'rgba(255,255,255,0.55)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        transition: 'all 0.2s',
                    }}
                >↺</button>

                <button
                    onClick={next}
                    disabled={isLast}
                    style={{
                        flex: 1,
                        padding: '0.75rem 1.25rem',
                        borderRadius: '0.75rem',
                        border: 'none',
                        background: isLast
                            ? 'rgba(99,102,241,0.3)'
                            : 'linear-gradient(135deg, #6366f1, #a855f7)',
                        color: isLast ? 'rgba(255,255,255,0.3)' : '#fff',
                        cursor: isLast ? 'not-allowed' : 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        boxShadow: isLast ? 'none' : '0 4px 15px rgba(99,102,241,0.4)',
                        transition: 'all 0.2s',
                    }}
                >{isLast ? 'Finish ✓' : 'Next →'}</button>
            </div>

        </div>
    );
}
