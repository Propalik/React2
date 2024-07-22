import Form from "../components/ui/Form/Form";
import Button from "../components/ui/Button/Button";
import { IoAddOutline } from "react-icons/io5";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 relative">
      <h1 className="mb-4 text-4xl font-bold">Home Page</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, vitae.
      </p>

      <Button variant="primary">Primary</Button>
      <Button variant="primary">
        Primary
        <IoAddOutline />
      </Button>
      <Button variant="primary">
        <IoAddOutline />
        Primary
      </Button>
      <Button variant="primary" isLoading={true}>
        Primary
      </Button>
      <Button variant="primary">
        <IoAddOutline />
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Form />
    </div>
  );
};

export default Home;
