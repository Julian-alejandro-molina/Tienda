import { doc, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '@/app/Config/firebase/credential';
import { getFirestore, deleteDoc } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export async function deleteProductFromCart(colletion, documentId) {
  try {

    await deleteDoc(doc(db, colletion, documentId));
    console.log('Se Elimino el documento con exito');
    console.log(documentId);
    

  } catch (error) {
    console.error('Erro al eliminar el documento', error);

  }
}