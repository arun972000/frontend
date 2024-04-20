import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const SidebarVisible = () => {
  const [isChecked, setIsChecked] = useState(0);

  const handleCheckboxChange = async () => {
    const newValue = isChecked === 1 ? 0 : 1;
    setIsChecked(newValue);

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}api/pages/edit-leftbar`,
        { visibility: newValue }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/pages/leftBar`
        );
        setIsChecked(res.data[0].visibility);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVisibility();
  }, []);

  return (
    <div className="col-12">
      <div className="shadow-sm p-3 mb-5 mt-5 bg-white rounded border-0">
        <div className="row">
          <Form>
            <Form.Check
              type="checkbox"
              id="custom-checkbox"
              label="Checkbox Label"
              checked={isChecked === 1}
              onChange={handleCheckboxChange}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SidebarVisible;
