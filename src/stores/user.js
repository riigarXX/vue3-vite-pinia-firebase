import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import router from "../router";
import { useDatabaseStore } from "./database";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    async updateUser(displayName, photoURL) {
      this.loadingUser = true;
      try {
        if (photoURL) {
          const storageRef = ref(storage, `perfiles/${this.userData.uid}`);
          await uploadBytes(storageRef, photoURL);
          const url = await getDownloadURL(storageRef);
          await updateProfile(auth.currentUser, {
            photoURL: url,
          });
          this.setUser(auth.currentUser);
        }
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        this.setUser(auth.currentUser);
      } catch (error) {
        console.log(error);
        return error.code;
      } finally {
        this.loadingUser = false;
      }
    },
    async setUser(user) {
      try {
        const docRef = doc(db, "users", user.uid);

        this.userData = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
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
                photoURL: user.photoURL,
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
