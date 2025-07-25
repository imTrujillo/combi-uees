import React, { PureComponent, useState } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const Gráficas = ({
  propBusesTotales,
  propBusesDisponibles,
  listaBusesUbicación,
  propRutaNombre,
}) => {
  // GRÁFICA DE ESTADO DE BUSES
  const data01 = [
    {
      name: "Disponibles",
      uv: 1,
      pv: propBusesDisponibles,
    },
    {
      name: "Total",
      uv: 1,
      pv: propBusesTotales,
    },
  ];
  const getIntroOfPage = (label) => {
    if (label === "Buses disponibles") {
      return "Buses en circulación.";
    }
    if (label === "Buses totales") {
      return "Buses a disposición de la ruta";
    }
    return "";
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip text-white p-3 rounded-2 text-shadow"
          style={{ backgroundColor: "#5e4a4acb" }}
        >
          <p className="logo-text m-0">{`${label} : ${payload[0].value}`}</p>
          <p className="intro m-0">{getIntroOfPage(label)}</p>
        </div>
      );
    }
    return null;
  };

  // GRÁFICA DE UBICACIÓN DE BUSES
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
        <div className="z-1" style={{ width: 250, height: 250 }}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data01}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="pv" barSize={20} fill="#bf7b6b" />
            </BarChart>
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
