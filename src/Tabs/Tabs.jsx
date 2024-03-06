import TabButton from "./TabButton";
import { useState } from "react";

const EXAMPLES = {
  components: {
    title: "Components",
    description:
      "Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.",
    code: `
function Welcome() {
  return <h1>Hello, World!</h1>;
}`,
  },
  jsx: {
    title: "JSX",
    description:
      "JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript (e.g., it may output dynamic content).",
    code: `
<div>
  <h1>Welcome {userName}</h1>
  <p>Time to learn React!</p>
</div>`,
  },
  props: {
    title: "Props",
    description:
      "Components accept arbitrary inputs called props. They are like function arguments.",
    code: `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
  },
  state: {
    title: "State",
    description:
      "State allows React components to change their output over time in response to user actions, network responses, and anything else.",
    code: `
function Counter() {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible(true);
  }

  return (
    <div>
      <button onClick={handleClick}>Show Details</button>
      {isVisible && <p>Amazing details!</p>}
    </div>
  );
}`,
  },
};

const Tabs = () => {
  const [selectTab, setSelectTab] = useState();
  const handleSelect = (selectedButton) => {
    setSelectTab(selectedButton);
  };
  let tabcontent = <p>Please select any tab</p>;
  if (selectTab) {
    tabcontent = (
      <div>
        <h3 className="text-xl font-roboto font-medium">
          {EXAMPLES[selectTab].title}
        </h3>
        <div className="flex flex-1">
          <p className="text-md font-roboto w-[800px] italic mt-3 text-teal-500 ">
            {EXAMPLES[selectTab].description}
          </p>
        </div>
        <pre>
          <div className="flex flex-wrap">
            <code className="text-md text-gray-400 ">
              {EXAMPLES[selectTab].code}
            </code>
          </div>
        </pre>
      </div>
    );
  }

  return (
    <div className="h-[100vh] bg-gradient-to-br from-[#1d0338]  to-[#3e074e] ">
      {/* Head */}
      <div className="mx-auto text-center pt-40 text-white ">
        <h1 className="font-roboto font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-br  from-[#084c74] from-[10%] via-[#8635db] to-[#03d5ff]">
          React Tab
        </h1>
      </div>
      {/* Body */}
      <div className="mt-8 flex justify-center items-center">
        <div className="flex flex-col w-[50%] px-8 py-14 border rounded-3xl border-gray-600">
          {/* menu */}
          <menu className="flex gap-2 ">
            <TabButton
              onClick={() => handleSelect("components")}
              isActive={selectTab === "components"}
            >
              Components
            </TabButton>
            <TabButton
              onClick={() => handleSelect("jsx")}
              isActive={selectTab === "jsx"}
            >
              JSX
            </TabButton>
            <TabButton
              onClick={() => handleSelect("props")}
              isActive={selectTab === "props"}
            >
              Props
            </TabButton>
            <TabButton
              onClick={() => handleSelect("state")}
              isActive={selectTab === "state"}
            >
              State
            </TabButton>
          </menu>
          {/* tabcontent */}
          <div className="border border-[#461a75] bg-[#2d0444] min-h-[300px] px-4 py-2 mt-1 rounded-md text-gray-300 font-roboto shadow-[rgba(0,_0,_0,_0.34)_0px_3px_8px]">
            {tabcontent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
