import "./App.css";
import { useState } from "react";
import { Button } from "antd";
import { useModal, useDebounce, useThrottle } from "./hooks";
function App() {
  const showModal = useModal();
  const [count, setCount] = useState(0);
  const debounce = useDebounce(() => {
    console.log("useDebounce");
  }, 1000);
  useThrottle(
    () => {
      console.log("count", count);
    },
    1000,
    [count]
  );
  return (
    <>
      <h1>Modal</h1>
      <div className="card">
        <Button
          onClick={() =>
            showModal({
              title: "test",
              onConfirm: async () => {
                return new Promise((resolove) => {
                  setTimeout(() => {
                    console.log("asd");
                    resolove();
                  }, 2000);
                });
              },
              children: <Button>children</Button>,
              onClose: () => {},
              originProps: {
                okText: "上线",
                cancelText: "取消",
              },
            })
          }
        >
          Modal
        </Button>
        <Button onClick={debounce}>debounce</Button>
        <Button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          throttle
        </Button>
      </div>
    </>
  );
}

export default App;
