import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import router from "../router";
import { useDatabaseStore } from "./database";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/login");
      } catch (error) {
        return error.code;
      } finally {
        this.loadingUser = false;
      }
    },
    async updateUser(displayName) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        this.setUser(auth.currentUser);
      } catch (error) {
        console.log(error);
        return error.code;
      }
    },
    async setUser(user) {
      try {
        const docRef = doc(db, "users", user.uid);

        this.userData = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURl: user.photoURL,
        };
        await setDoc(docRef, this.userData);
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        await this.setUser(user);
        router.push("/");
      } catch (error) {
        return error.code;
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      const databaseStore = useDatabaseStore();
      databaseStore.$reset();
      try {
        router.push("/login");
        await signOut(auth);
        //this.userData = null;
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          async (user) => {
            console.log(user);
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoURl: user.photoURL,
              };
            } else {
              this.userData = null;
              const databaseStore = useDatabaseStore();
              databaseStore.$reset();
            }
            resolve(user);
          },
          (error) => reject(error)
        );
        unsuscribe();
      });
    },
  },
});
