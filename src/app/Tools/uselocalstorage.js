const { useState, useEffect } = require("react");
const { json } = require("react-router-dom");


export default function useLocalStorage(key, initialValue) {
    // Se Obtine el valor de localStorage en caso de que  exista, de lo contrario usar el valor inicial
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const Item = localStorage.getItem(key);
            return Item ? JSON.parse(Item) : initialValue
        } catch (error) {
            console.log(error);
            return initialValue

        }
    });

    const setValue=(value)=>{
        try {
            
            const valueToStore =value instanceof Function? value(storedValue): value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
            
        }
    }
    return[storedValue, setValue];
}