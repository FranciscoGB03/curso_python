import { tss } from "tss-react";
/**
 *  funcion para generar estilos
 * @returns estilos
 */
export const getModalStyle=()=> {
    const top = 0;
    const left = 0;
  
    return {
      top: `${top}`,
      left: `${top}`,
      transform: `translate(-${top}%, -${left})`,
    };
  }
  
export const useStyles = tss.create({
    root: {
      top: "35%",
      left: "30%",
    },
    body: {
      backgroundColor: "#ffffee",
      width: 500,
      border: "2px solid #000",
      padding: 4,
      boxShadow: "15px 5px 10px #48529944",
    },
  });
  