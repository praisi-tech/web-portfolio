import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-ctf';

const defaultState = {
  flags: {
    flag1: false, // curiosity_is_the_first_step
    flag2: false, // flag{aiesec_it_tanaminahasa}
    flag3: false, // flag{future_security_consultant}
  },
  completedAt: null,
};

const CTFContext = createContext();

export function CTFProvider({ children }) {
  const [ctfState, setCTFState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ctfState));
  }, [ctfState]);

  const submitFlag = (flagKey, value) => {
    const validFlags = {
      flag1: 'curiosity_is_the_first_step',
      flag2: 'flag{aiesec_it_tanaminahasa}',
      flag3: 'flag{future_security_consultant}',
    };
    if (validFlags[flagKey] === value.trim()) {
      setCTFState(prev => {
        const newFlags = { ...prev.flags, [flagKey]: true };
        const allDone = Object.values(newFlags).every(Boolean);
        return {
          ...prev,
          flags: newFlags,
          completedAt: allDone && !prev.completedAt ? new Date().toISOString() : prev.completedAt,
        };
      });
      return true;
    }
    return false;
  };

  const isComplete = Object.values(ctfState.flags).every(Boolean);
  const flagCount = Object.values(ctfState.flags).filter(Boolean).length;

  const reset = () => {
    setCTFState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CTFContext.Provider value={{ ctfState, submitFlag, isComplete, flagCount, reset }}>
      {children}
    </CTFContext.Provider>
  );
}

export const useCTF = () => useContext(CTFContext);
