import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Printbridge from "./printbridge";

const Printer = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div>
        <Printbridge ref={componentRef} />
        <button onClick={handlePrint}>Imprimer facture</button>
      </div>
    </>
  );
};
export default Printer;
