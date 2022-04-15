import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { auth } from "../firebaseConfig.js";
import { db } from "../firebaseConfig";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loadingDoc: false,
  }),
  actions: {
    async getUrls() {
      this.loadingDoc = true;
      try {
        const q = await query(
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
      try {
        const objetoDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid
        };
        const docRef = await addDoc(collection(db, "urls"), objetoDoc);
        this.documents.push({
          ...objetoDoc,
          id:docRef.id
        })
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async deleteUrl(id){
      console.log(id)
      try {
        const docRef =  doc(db,'urls',id)
        console.log(docRef)
        await deleteDoc(docRef)
        this.documents = this.documents.filter(x => x.id !== id)
        console.log(this.documents)
      } catch (error) {
        console.log(error)
      }finally{

      }
    }
  },
});
