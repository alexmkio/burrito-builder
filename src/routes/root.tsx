import Header from "../components/Header/Header";
import Form from "../components/Form/Form";
import Orders from "../components/Orders/Orders";

function RootRoute() {
  return (
    <>
      <Header />
      <main>
        <section className="form-and-orders-container">
          <Form />
          <Orders />
        </section>
      </main>
    </>
  );
}

export default RootRoute;
