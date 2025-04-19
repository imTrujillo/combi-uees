import React, { PureComponent, useState } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const Gráficas = ({
  propBusesTotales,
  propBusesDisponibles,
  listaBusesUbicación,
  propRutaNombre,
}) => {
  const data01 = [
    { name: "Buses Disponibles", value: propBusesDisponibles },
    { name: "Buses Totales", value: propBusesTotales },
  ];
  const data02 = [
    { name: "UEES", value: listaBusesUbicación.motoristasUEES },
    {
      name: propRutaNombre,
      value: listaBusesUbicación.motoristasRuta,
    },
  ];
  return (
    <>
      <section className="d-flex flex-column flex-sm-column flex-md-row justify-content-center align-items-center ">
        <div style={{ width: 200, height: 250 }}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data01}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#bf7b6b"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ width: 200, height: 250 }}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data02}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#ad4018"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
};

export default Gráficas;
