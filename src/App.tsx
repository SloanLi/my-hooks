import "./App.css";
import { Button } from "antd";
import useModal from "./hooks/useModal";
function App() {
  const showModal = useModal();

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
          modal
        </Button>
      </div>
    </>
  );
}

export default App;
