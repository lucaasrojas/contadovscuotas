import { Formik } from "formik";
import { useState, useEffect } from "react";

const options = [
	"1",
	"3",
	"4",
	"6",
	"9",
	"10",
	"12",
	"18",
	"24",
	"30",
	"32",
	"36",
	"48",
];

function Calculadora({ porcentajeInflacion = 9 }) {
	const [opcionConveniente, setOpcionConveniente] = useState("");

	useEffect(() => {}, [porcentajeInflacion]);

	return (
		<div className="p-8 shadow rounded" style={{}}>
			<Formik
				initialValues={{
					precioContado: 191250,
					precioCuotas: 229500,
					cuotas: 1,
					inflacion: porcentajeInflacion,
				}}
				validate={(values) => {
					const errors: {
						precioContado?: string;
						precioCuotas?: string;
						cuotas?: string;
					} = {};
					if (!values.precioContado) {
						errors.precioContado = "Required";
					}
					if (!values.precioCuotas) {
						errors.precioCuotas = "Required";
					}
					if (!values.cuotas) {
						errors.cuotas = "Required";
					}

					return errors;
				}}
				onSubmit={(values) => {
					const inflacionSeleccionada = values.inflacion;

					const precioContadoAjustado =
						Number(values.precioContado) *
						Math.pow(1 + inflacionSeleccionada / 100, Number(values.cuotas));
					const precioTotalCuotas = Number(values.precioCuotas);

					if (precioContadoAjustado < precioTotalCuotas) {
						setOpcionConveniente("Contado");
					} else {
						setOpcionConveniente("Cuotas");
					}
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleSubmit,
					/* and other goodies */
				}) => (
					<form onSubmit={handleSubmit}>
						<div className="space-y-12">
							<div className="border-b pb-12 text-white">
								<h2 className="text-base font-semibold leading-7 text-white">
									Calculadora
								</h2>
								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="col-span-full">
										<label
											className="block text-sm font-medium leading-6"
											htmlFor="validationContado"
										>
											Ingresá el precio de contado
										</label>
										<div className="mt-2">
											<div className="flex">
												<span className="">$</span>
												<input
													type="number"
													className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
													value={values.precioContado}
													id="validationContado"
													pattern="[0-9]*"
													name="precioContado"
													required
													onChange={handleChange}
												/>
												<span className="">.00</span>
											</div>
											<div className="">
												{errors.precioContado &&
													touched.precioContado &&
													errors.precioContado}
											</div>
										</div>

										<div className={`col-span-2`}>
											<label
												className="block text-sm font-medium leading-6"
												htmlFor="validationCuotas"
											>
												Ingresá el precio total en cuotas
											</label>
											<div className="mt-2 flex">
												<span className="">$</span>
												<input
													type="number"
													className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
													id="validationCuotas"
													name="precioCuotas"
													pattern="[0-9]*"
													value={values.precioCuotas}
													required
													onChange={handleChange}
												/>
												<span className="">.00</span>
											</div>
											<div className="">
												{errors.precioCuotas &&
													touched.precioCuotas &&
													errors.precioCuotas}
											</div>
										</div>

										<div className={`col-span-full`}>
											<label
												className="block text-sm font-medium leading-6"
												htmlFor="cuotas"
											>
												Cantidad de cuotas
											</label>
											<div className="mt-2 flex">
												<select
													selected={Number(values.cuotas)}
													id="cuotas"
													name=""
													className=""
													onChange={handleChange}
												>
													{options.map((o) => (
														<option key={o} value={o}>
															{o}
														</option>
													))}
												</select>
											</div>
										</div>

										<div className={`col-span-full`}>
											<label
												className="block text-sm font-medium leading-6"
												htmlFor="validationCuotas"
											>
												Inflación INDEC ({values.inflacion}%)
											</label>
											<div className="mt-2 flex">
												<span className="">%</span>
												<input
													type="number"
													className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
													name="inflacion"
													onChange={handleChange}
													placeholder={values.inflacion.toString()}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<button type="submit">Calcular</button>
					</form>
				)}
			</Formik>

			{opcionConveniente && (
				<div className="resultado">
					<span>
						Te conviene pagar en:{" "}
						<strong className="span-strong">{opcionConveniente}</strong>
					</span>
				</div>
			)}
		</div>
	);
}

export default Calculadora;
