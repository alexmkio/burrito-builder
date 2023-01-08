import Form from "../Form/Form";
import Orders from "../Orders/Orders";
import "./FormAndOrders.scss";

function FormAndOrders() {
  return (
    <section className="form-and-orders-container">
      <Form />
      <Orders />
    </section>
  );
}

export default FormAndOrders;
