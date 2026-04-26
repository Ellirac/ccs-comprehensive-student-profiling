// src/context/AuthContext.jsx
// ─── Firebase Auth Context (with Firestore role fallback) ─────────────────────
// FIX: If custom claims are not set (e.g. seed not run with Admin SDK), 
// roles are read from Firestore "users" collection instead — no backend needed.

import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthService } from "../services/firebase.services";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [role,        setRole]        = useState(null);
  const [linkedId,    setLinkedId]    = useState(null);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // ── Step 1: Try custom claims (set by Admin SDK / seed script) ──────
          const tokenResult = await user.getIdTokenResult(true);
          const claims      = tokenResult.claims;
          let   userRole    = claims.role     || null;
          let   userLinked  = claims.linkedId || null;

          // ── Step 2: Fallback to Firestore "users" collection ─────────────
          // This works even without Firebase Custom Claims / Cloud Functions.
          if (!userRole || !userLinked) {
            const userSnap = await getDoc(doc(db, "users", user.uid));
            if (userSnap.exists()) {
              const userData = userSnap.data();
              userRole   = userRole   || userData.role;
              userLinked = userLinked || userData.linkedId;
            }
          }

          setCurrentUser(user);
          setRole(userRole);
          setLinkedId(userLinked);

          // ── Step 3: Load linked profile (student or faculty) ──────────────
          if (userLinked && userRole) {
            const profileCol  = userRole === "student" ? "students" : "faculty";
            const profileSnap = await getDoc(doc(db, profileCol, userLinked));
            if (profileSnap.exists()) {
              setUserProfile({ id: profileSnap.id, ...profileSnap.data() });
            }
          }
        } catch (err) {
          console.error("Auth state error:", err);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setRole(null);
        setLinkedId(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const result = await AuthService.login(email, password);
    setRole(result.role);
    setLinkedId(result.linkedId);
    setUserProfile(result.profile);
    return result;
  };

  const logout = async () => {
    await AuthService.logout();
    setCurrentUser(null);
    setUserProfile(null);
    setRole(null);
    setLinkedId(null);
  };

  const updateProfile = (data) => {
    setUserProfile(prev => ({ ...prev, ...data }));
  };

  const value = {
    currentUser,
    userProfile,
    role,
    linkedId,
    loading,
    isAdmin:   role === "admin",
    isFaculty: role === "faculty" || role === "admin",
    isStudent: role === "student",
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
