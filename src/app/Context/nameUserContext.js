'use client'

import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from '@/app/Config/firebase/credential';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const DataUserContext = createContext();

export const DataUserContextProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [infousernaem, setInfoUsername] = useState([]);
    const [visitor, setVisitor] = useState();


    useEffect(() => {
        async function getData() {
            try {
                const querySnapshot = await getDocs(collection(db, "userRegister"));
                const data = querySnapshot.docs.map((doc) => doc.data());
                if (data.length === 0) {
                    alert('No hay usuarios registrados');
                }
                setInfoUsername(data);
                console.log('Documentos obtenidos correctamente');
            } catch (error) {
                console.error("Error al obtener documentos:", error);
            }
        }
        getData();
    }, []);

    const datosUser = {
        infousernaem,
        setInfoUsername,
        name,
        setName,
        visitor,
        setVisitor
    };

    return (
        <DataUserContext.Provider value={datosUser}>
            {children}
        </DataUserContext.Provider>
    );
};