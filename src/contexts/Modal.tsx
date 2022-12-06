import { createContext, FC, useState } from "react";

interface ModalContent {
  element: JSX.Element;
  show: boolean;
}

const init = { show: false, element: null };

export const ModalContext = createContext<{
  modal: ModalContent;
  dispatchModal: (element: JSX.Element) => void;
  toggle: () => void;
}>({
  modal: init,
  dispatchModal() {},
  toggle() {},
});

export const ModalContextProvider: FC<{ children: any }> = ({ children }) => {
  const [content, setContent] = useState<ModalContent>(init);

  function setElement(element: JSX.Element) {
    setContent({ show: true, element });
  }

  return (
    <ModalContext.Provider
      value={{
        modal: content,
        dispatchModal: setElement,
        toggle: () => setContent({ ...content, show: !content.show }),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
