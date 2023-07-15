export default function dataset(data, selectedContentIndex) {
  const { included } = data;

  // Extraemos el array de contenidos y eliminamos el total
  const labels = included[selectedContentIndex].attributes.content
    .filter((item) => item.attributes.composite !== true)
    .map((item) => item.type);

  // Extraemos los values y eliminamos el total
  const totales = included[selectedContentIndex].attributes.content
    .filter((item) => item.attributes.composite !== true)
    .map((item) => item.attributes.total);

  // Extraemos los colores y eliminamos el total
  const colores = included[selectedContentIndex].attributes.content
    .filter((item) => item.attributes.composite !== true)
    .map((item) => item.attributes.color);

  // Construimos el objeto de dataset
  const dataset = {
    label: "Balance eléctrico",
    data: totales,
    borderColor: colores,
    backgroundColor: colores,
  };

  // Le asignamos los datos
  const chartData = {
    labels,
    datasets: [dataset],
  };
  return chartData;
}
