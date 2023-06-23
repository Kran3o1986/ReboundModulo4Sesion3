console.log("🟢 Connected!");

const ingredientesDOM = document.querySelector("#ingredientes");
const ingredientesSeleccionados = document.querySelector(
    "#ingredientesSeleccionados"
);
const ingredientesExtrasSeleccionados = document.querySelector(
    "#ingredientesExtrasSeleccionados"
);
const extrasPrecio = document.querySelector("#extrasPrecio");

const formPropina = document.querySelector("#formPropina");
const propinaInput = document.querySelector("#propina");
const propinaPrecio = document.querySelector("#propinaPrecio");

const listadoIngredientes = [
    "Carne",
    "Pollo",
    "Tocino",
    "Mozzarella",
    "Champiñón",
    "Cebolla",
    "Piña",
    "Pimentón",
];

const resumenPedido = {
    carrito: {
        producto: "Pizza XL",
        precio: 15000,
    },
    ingredientes: [],
    ingredientesExtras: [],
    propina: 0,
    totalCompra() {
        return (
            this.carrito.precio + this.ingredientesExtras.length * 880 + this.propina
        );
    },
};

let ingredientesHTML = "";

listadoIngredientes.forEach((ingrediente) => {
    ingredientesHTML += `<li>
  <input type="checkbox" 
  name="${ingrediente.toLowerCase()}" 
  id="${ingrediente.toLowerCase()}" 
  value="${ingrediente}" 
  onclick="manejarIngrediente(${ingrediente.toLowerCase()})"/>

  <label for="${ingrediente.toLowerCase()}">${ingrediente}</label>
</li>`;
});
ingredientesDOM.innerHTML = ingredientesHTML;

const formatearCLP = (cantidad) => {
    const CLP = Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    });

    return CLP.format(cantidad);
};

const analizarIngredientes = (
    ingrediente1,
    ingrediente2,
    ingrediente3,
    ...extras
) => {
    resumenPedido.ingredientesExtras = extras;
};

const manejarIngrediente = (ingrediente) => {
    const index = resumenPedido.ingredientes.findIndex(
        (item) => item === ingrediente.value
    );

    if (index === -1) {
        resumenPedido.ingredientes.push(ingrediente.value);
    } else {
        resumenPedido.ingredientes.splice(index, 1);
    }

    analizarIngredientes(...resumenPedido.ingredientes);

    ingredientesSeleccionados.textContent = resumenPedido.ingredientes.join(", ");
    ingredientesExtrasSeleccionados.textContent =
        resumenPedido.ingredientesExtras.join(", ");

    if (resumenPedido.ingredientesExtras.length) {
        extrasPrecio.textContent = formatearCLP(
            resumenPedido.ingredientesExtras.length * 800
        );
    } else {
        extrasPrecio.textContent = "";
    }
};

//PROPINA
const obtenerPropina = (monto = 1000) => {
    resumenPedido.propina = monto;
    propinaInput.value = monto;
    propinaPrecio.textContent = formatearCLP(monto);
};

propinaInput.addEventListener("click", function (e) {
    if (!e.target.value.trim()) {
        obtenerPropina();
    } else {
        obtenerPropina(Number(e.target.value));
    }
});

propinaInput.addEventListener("change", function (e) {
    if (!e.target.value.trim()) {
        obtenerPropina();
    } else {
        obtenerPropina(Number(e.target.value));
    }
});

formPropina.addEventListener("submit", (e) => {
    e.preventDefault();

    if (resumenPedido.propina) {
        alert(
            `Su propina de ${formatearCLP(resumenPedido.propina)} ha sido enviada`
        );
    } else {
        alert(`Aún no ha definido una propina`);
        propinaInput.focus();
    }
});

