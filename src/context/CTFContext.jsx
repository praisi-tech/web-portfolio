import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-ctf';

const defaultState = {
  flags: {
    flag1: false, // hash of: flag{curiosity_is_the_first_step}
    flag2: false, // hash of: flag{aiesec_it_tanaminahasa}
    flag3: false, // hash of: flag{future_security_consultant}
  },
  completedAt: null,
  claimedName: null,
  claimedDate: null,
};

const CTFContext = createContext();

// Cryptographically secure hashing helper for browser environments
async function hashFlag(message) {
  const msgBuffer = new TextEncoder().encode(message.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function CTFProvider({ children }) {
  const [ctfState, setCTFState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultState;
    } catch (e) {
      console.error('[SECURITY AUDIT] Failed to parse localStorage state:', e);
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ctfState));
    } catch (e) {
      console.error('[SECURITY AUDIT] Failed to write state to localStorage:', e);
    }
  }, [ctfState]);

  const submitFlag = async (flagKey, value) => {
    const hashed = await hashFlag(value);
    
    const validHashes = {
      flag1: '2d889b3a4a1033050821f5632761289a64d401e80cb8ccc4b7731d42e8783767',
      flag2: '3711b2d8f1c2b85ead139b1b9c9e365e64f8a4e07ec1cca45ad76feda160334b',
      flag3: '7dfbbd9f881d2c49ab0405b1e0df5064b3b63edba65c23f86463c34872e3b58e',
    };

    if (validHashes[flagKey] === hashed) {
      console.warn(`[SECURITY AUDIT] Flag "${flagKey}" successfully captured and verified at ${new Date().toISOString()}`);
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
    
    console.error(`[SECURITY AUDIT] Invalid flag submission attempt for key "${flagKey}" at ${new Date().toISOString()}`);
    return false;
  };

  const claimCertificate = (name) => {
    if (ctfState.claimedName) return false;
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    setCTFState(prev => ({
      ...prev,
      claimedName: name,
      claimedDate: date,
    }));
    return { name, date };
  };

  const isComplete = Object.values(ctfState.flags).every(Boolean);
  const flagCount = Object.values(ctfState.flags).filter(Boolean).length;

  const reset = () => {
    console.warn(`[SECURITY AUDIT] CTF session state reset by user at ${new Date().toISOString()}`);
    setCTFState(defaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('[SECURITY AUDIT] Failed to clear localStorage during reset:', e);
    }
  };

  return (
    <CTFContext.Provider value={{ ctfState, submitFlag, isComplete, flagCount, claimCertificate, reset }}>
      {children}
    </CTFContext.Provider>
  );
}

export const useCTF = () => useContext(CTFContext);

