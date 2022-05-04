import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { auth } from "../firebaseConfig.js";
import { db } from "../firebaseConfig";
import router from "../router";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loadingDoc: false,
    loading: false,
  }),
  actions: {
    async getUrl(id) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
          return false;
        }
        return docSnapshot.data().name;
      } catch (error) {
        console.log(error.message);
        return false;
      } finally {
      }
    },
    async getUrls() {
      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "urls"),
          where("user", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.documents.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addUrl(name) {
      this.loading = true;
      try {
        const objetoDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };
        await setDoc(doc(db, "urls", objetoDoc.short), objetoDoc);
        this.documents.push({
          ...objetoDoc,
          id: objetoDoc.short,
        });
      } catch (error) {
        return error.code;
      } finally {
        this.loading = false;
      }
    },
    async readUrl(id) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("no existe el doc");
        }
        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertenece ese documento");
        }
        return docSnap.data().name;
      } catch (err) {
        console.log(err.message);
      } finally {
      }
    },
    async deleteUrl(id) {
      this.loading = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if (!docSnap.exists()) {
          throw new Error("no existe el doc");
        }
        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertenece ese documento");
        }

        await deleteDoc(docRef);
        this.documents = this.documents.filter((x) => x.id !== id);
      } catch (error) {
        return error.message;
      } finally {
        this.loading = false;
      }
    },
    async updateUrl(id, name) {
      this.loading = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("no existe el doc");
        }
        if (docSnap.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertenece ese documento");
        }

        await updateDoc(docRef, {
          name: name,
        });
        this.documents = this.documents.map((x) =>
          x.id === id ? { ...x, name: name } : x
        );
        router.push("/");
      } catch (error) {
        console.log(error);
        return error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
