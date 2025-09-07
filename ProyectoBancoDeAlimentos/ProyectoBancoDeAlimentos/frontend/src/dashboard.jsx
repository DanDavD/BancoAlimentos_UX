import "./dashboard.css";
import Sidebar from "./sidebar";
import React, { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { Icon } from "@iconify/react";
import MiniChart from "./components/miniChart";
import MiniChart2 from "./components/miniChart2";

function Dashboard() {
  const [moveButton, setLeft] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClick = () => {
    setLeft(!moveButton);
    setShowSidebar(!showSidebar);
  };
  const inventory = [
    { producto: "Leche", stock: 2 },
    { producto: "Huevos", stock: 8 },
    { producto: "Pan", stock: 5 },
    { producto: "Cafe", stock: 4 },
    { producto: "Azúcar", stock: 10 },
    { producto: "Mantequilla", stock: 3 },
  ];
  const activeUsers = [
    { nombre: "Juan Pérez", compras: 5, gastosTotales: 1200 },
    { nombre: "María López", compras: 3, gastosTotales: 800 },
    { nombre: "Carlos Gómez", compras: 7, gastosTotales: 1950 },
    { nombre: "Ana Rodríguez", compras: 10, gastosTotales: 3200 },
    { nombre: "Luis Hernández", compras: 2, gastosTotales: 4500 },
    { nombre: "Camila Morales", compras: 8, gastosTotales: 2750 },
    { nombre: "Pedro Castillo", compras: 6, gastosTotales: 1500 },
    { nombre: "Laura Torres", compras: 4, gastosTotales: 980 },
    { nombre: "Diego Ramírez", compras: 9, gastosTotales: 800 },
    { nombre: "Fernanda Díaz", compras: 1, gastosTotales: 200 },
  ];

  const data = [
    { id: "Entregados", value: 10 },
    { id: "Pendientes", value: 4 },
    { id: "Cancelados", value: 2 },
  ];
  const data2 = [
    {
      id: "Ingresos Brutos",
      data: [
        { x: "Ene", y: 3200 },
        { x: "Feb", y: 8900 },
        { x: "Mar", y: 5000 },
        { x: "Abr", y: 4700 },
      ],
    },
    {
      id: "Ingresos Netos",
      data: [
        { x: "Ene", y: 2200 },
        { x: "Feb", y: 2500 },
        { x: "Mar", y: 2400 },
        { x: "Abr", y: 2600 },
      ],
    },
  ];
  const data3 = [
    { year: "2025", DescuentoVIP: 50 },
    { year: "2026", BlackFriday: 120 },
    { year: "2027", PromoVerano: 75 },
  ];
  return (
    <div className="w-screen bg-gray-100 px-12 h-screen">
      {showSidebar && <Sidebar />}
      <button
        onClick={handleClick}
        className={`btn_sidebar ${moveButton ? "left-[180px]" : "left-2"}`}
      >
        <span className="material-symbols-outlined text-[42px] text-white">
          menu
        </span>
      </button>
      <div
        className={`flex flex-col w-full  pt-2 px-8 transition-all duration-300   ${
          showSidebar ? "ml-44 pr-44" : "ml-0 "
        }`}
      >
        <div className="">
          <div className="text-left">
            <h1 className="font-roboto font-medium text-[#204778] text-6xl justify-center pb-1 pl-6">
              Dashboard
            </h1>
            <hr className="bg-[#204778] h-[2px]"></hr>
          </div>
          <div className="flex flex-row gap-6 px-4 justify-center">
            <div className="grid grid-cols-1 min-w-[450px] min-h-[580px] grid-rows-2 h-full gap-4 items-stretch pt-2">
              <div className="sm_grid px-16 space-y-2">
                <p className="pl-0">Inventario Critico</p>{" "}
                <MiniChart
                  title1="Producto"
                  title2="Stock"
                  data={inventory}
                  itemsPerPage={4}
                  renderRow={(item) => (
                    <>
                      <span>{item.producto}</span>
                      <span
                        className={`font-bold ${
                          item.stock <= 2
                            ? "text-red-600"
                            : item.stock <= 5
                            ? "text-orange-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </>
                  )}
                />
              </div>
              <div className="sm_grid">
                <p className="pl-4">Total de Pedidos</p>
                <ResponsivePie
                  data={data}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={1}
                  cornerRadius={3}
                  colors={{ scheme: "set2" }}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-9 min-h-[580px] gap-4 pt-2 w-full h-full items-stretch">
              <div className="lg_grid">
                <div className="flex flex-row justify-center items-center gap-2">
                  <p className="text-xl font-bold">Ventas Totales</p>{" "}
                  <Icon
                    icon="flat-color-icons:sales-performance"
                    className="text-4xl"
                  ></Icon>
                </div>
                <div className="flex flex-row gap-2 justify-center font-medium pt-2">
                  <p>Hoy: </p>
                  <p className="text-[#4CAF50]">{"ventasHoy"}</p>
                  <p>|</p>
                  <p>Esta Semana:</p>
                  <p className="text-[#4CAF50]">{"ventasSemana"}</p>
                  <p>|</p>
                  <p>Este Mes: </p>
                  <p className="text-[#4CAF50]">{"ventasMes"}</p>
                  <p>|</p> <p>Este año: </p>
                  <p className="text-[#4CAF50]">{"ventasAño"}</p>
                </div>
                <ResponsiveLine
                  data={data2}
                  margin={{ top: 30, right: 60, bottom: 90, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                  }}
                  axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                  axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
                  colors={{ scheme: "category10" }}
                  pointSize={10}
                  pointBorderWidth={2}
                  useMesh={true}
                />
              </div>
              <div className="bg-[#fee9d6] h-full row-span-4 col-span-1 py-2  rounded-xl shadow-neutral-600 shadow-sm items-center text-center">
                <p className="text-xl font-bold">Promociones mas Efectivas </p>
                <MyBar data={data3} />
              </div>
              <div className="bg-[#fee9d6] h-full row-span-4 col-span-1 py-2 flex flex-col justify-center space-y-2 rounded-xl shadow-neutral-600 shadow-sm items-center text-center">
                <p className="text-xl font-bold">Usuarios mas Activos </p>
                <MiniChart2
                  title1="Nombre"
                  title2="Compras"
                  title3="Gastos"
                  data={activeUsers}
                  itemsPerPage={3}
                  renderRow={(item) => (
                    <>
                      <span>{item.nombre}</span>
                      <span>{item.compras}</span>
                      <span>{item.gastosTotales}</span>
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const MyBar = ({ data }) => (
  <ResponsiveBar /* or Bar for fixed dimensions */
    data={data}
    keys={["BlackFriday", "DescuentoVIP", "PromoVerano"]}
    indexBy="year"
    labelSkipWidth={12}
    labelSkipHeight={12}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        translateX: 110,
        itemsSpacing: 3,
        itemWidth: 100,
        itemHeight: 16,
      },
    ]}
    axisBottom={{ legend: "year (indexBy)", legendOffset: 32 }}
    axisLeft={{ legend: "Ventas", legendOffset: -40 }}
    margin={{ top: 30, right: 110, bottom: 70, left: 60 }}
  />
);
const MyPie = ({ data /* see data tab */ }) => (
  <ResponsivePie /* or Pie for fixed dimensions */
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.6}
    cornerRadius={2}
    activeOuterRadiusOffset={8}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        symbolShape: "circle",
      },
    ]}
  />
);
export default Dashboard;
