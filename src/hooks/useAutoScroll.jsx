import {useRef, useEffect} from 'react';

export function useAutoScroll(dependancies) {
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependancies]);
  return chatMessagesRef;
}

