import Form from "../components/ui/Form/Form";
import Button from "../components/ui/Button/Button";
import { IoAddOutline } from "react-icons/io5";
import Stepper from "../components/ui/Stepper/Stepper";

const Components = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 relative">
      <h1 className="mb-6 text-4xl font-bold ">Components Example Page</h1>
      <p className="mb-8 ">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, vitae.
      </p>

      <div id="primary" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Primary Buttons</h2>
        <div className="flex flex-wrap gap-2">
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
      </div>

      <div id="secondary" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secondary Buttons</h2>
        <div className="flex flex-wrap gap-2">
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
      </div>

      <div id="negative" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Negative Buttons</h2>
        <div className="flex flex-wrap gap-2">
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
      </div>

      <div id="ghost" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ghost Buttons</h2>
        <div className="flex flex-wrap gap-2">
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
      </div>

      <div id="link" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Links</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="link">Link</Button>
          <Button variant="link" disabled>
            Link
          </Button>
        </div>
      </div>

      <div id="form" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Form Example</h2>
        <Form />
      </div>

      <div id="form" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Stepper Example</h2>
        <Stepper step={1} minValue="1" maxValue="10" />
      </div>
    </div>
  );
};

export default Components;
