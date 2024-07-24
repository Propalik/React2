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

      <div id="primary" className="mb-2 flex align-center">
        <Button variant="primary">Primary</Button>
        <Button variant="primary" disabled>
          Primary
        </Button>
        <Button variant="primary" leftIcon={<IoAddOutline />}>
          Primary
        </Button>
        <Button variant="primary" rightIcon={<IoAddOutline />}>
          Primary
        </Button>
        <Button variant="primary" isLoading loadingText="Submitting">
          Primary
        </Button>
        <Button variant="primary" icon={<IoAddOutline />}></Button>
        <Button variant="primary" icon={<IoAddOutline />} disabled></Button>
      </div>

      <div id="secondary" className="mb-2 flex align-center">
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="secondary" leftIcon={<IoAddOutline />}>
          Secondary
        </Button>
        <Button variant="secondary" rightIcon={<IoAddOutline />}>
          Secondary
        </Button>
        <Button variant="secondary" isLoading loadingText="Submitting">
          Secondary
        </Button>
        <Button variant="secondary" icon={<IoAddOutline />}></Button>
        <Button variant="secondary" icon={<IoAddOutline />} disabled></Button>
      </div>

      <div id="negative" className="mb-2 flex align-center">
        <Button variant="negative">Negative</Button>
        <Button variant="negative" disabled>
          Negative
        </Button>
        <Button variant="negative" leftIcon={<IoAddOutline />}>
          Negative
        </Button>
        <Button variant="negative" rightIcon={<IoAddOutline />}>
          Negative
        </Button>
        <Button variant="negative" isLoading loadingText="Submitting">
          Negative
        </Button>
        <Button variant="negative" icon={<IoAddOutline />}></Button>
        <Button variant="negative" icon={<IoAddOutline />} disabled></Button>
      </div>

      <div id="ghost" className="mb-2 flex align-center">
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost" disabled>
          Ghost
        </Button>
        <Button variant="ghost" leftIcon={<IoAddOutline />}>
          Ghost
        </Button>
        <Button variant="ghost" rightIcon={<IoAddOutline />}>
          Ghost
        </Button>
        <Button variant="ghost" isLoading loadingText="Submitting">
          Ghost
        </Button>
        <Button variant="ghost" icon={<IoAddOutline />}></Button>
        <Button variant="ghost" icon={<IoAddOutline />} disabled></Button>
      </div>

      <div id="link" className="mb-2 flex align-center">
        <Button variant="link">Link</Button>
        <Button variant="link" disabled>
          Link
        </Button>
      </div>

      <Form />
    </div>
  );
};

export default Home;
