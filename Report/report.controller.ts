import repository from "./report.repository.ts";


function getReport() {
  return repository.getReport();
}

export default { getReport };
