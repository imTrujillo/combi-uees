import React from "react";
import Swal from "sweetalert2";

export default function SwalFireLoading() {
  return Swal.fire({
    title: "Por favor espere...",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}
